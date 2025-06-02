import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromPastes } from '../redux/pasteSlice';
import toast from 'react-hot-toast';
import { FaSearch, FaEdit, FaEye, FaTrash, FaCopy, FaShare } from 'react-icons/fa'

const Paste = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const pastes = useSelector((state) => state.paste.pastes);
  const dispatch = useDispatch();

  const filteredData = pastes.filter(
    (paste) => paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  function handleDelete(pasteId) {
    dispatch(removeFromPastes(pasteId));
  }

  function handleShare(paste) {
    if (navigator.share) {
      navigator.share({
        title: paste.title,
        text: paste.content,
        url: window.location.href,
      })
      .then(() => toast.success('Share successful'))
      .catch((error) => console.log('Sharing failed', error));
    } else {
      toast.error("Web Share API is not supported in your browser.");
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="flex items-center gap-4 mb-6 bg-bg-secondary p-4 rounded-lg">
        <FaSearch className="text-text-primary text-xl" />
        <input 
          type="search"
          className='flex-1 p-3'
          placeholder='Search pastes...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className='flex flex-col gap-4'>
        {filteredData.length > 0 ? (
          filteredData.map((paste) => (
            <div key={paste?._id} className='card'>
              <div className="text-xl font-semibold mb-2 text-accent-primary">
                {paste.title}
              </div>
              <div className="text-text-primary mb-4 line-clamp-3">
                {paste.content}
              </div>
              <div className='flex flex-wrap gap-2 justify-end'>
                <button className="hover:bg-accent-primary">
                  <FaEdit />
                  <a href={`/?pasteId=${paste?._id}`}>Edit</a>
                </button>
                <button className="hover:bg-accent-primary">
                  <FaEye />
                  <a href={`/pastes/${paste?._id}`}>View</a>
                </button>
                <button 
                  className="danger-button"
                  onClick={() => handleDelete(paste?._id)}>
                  <FaTrash />
                  Delete
                </button>
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(paste?.content);
                    toast.success("Copied to clipboard");
                  }}>
                  <FaCopy />
                  Copy
                </button>
                <button onClick={() => handleShare(paste)}>
                  <FaShare />
                  Share
                </button>
              </div>
              <div className="text-sm text-text-primary mt-4 opacity-60">
                {new Date(paste.createdAt).toLocaleString()}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-text-primary opacity-60 p-8 card">
            No pastes found
          </div>
        )}
      </div>
    </div>
  )
}

export default Paste