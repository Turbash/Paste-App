import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromPastes } from '../redux/pasteSlice';
import toast from 'react-hot-toast';
import { FaSearch, FaEdit, FaEye, FaTrash, FaCopy, FaShare } from 'react-icons/fa'
import { Link } from 'react-router-dom';

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
      <div className="card mb-8">
        <div className="flex items-center gap-4">
          <FaSearch className="text-text-primary text-xl" />
          <input 
            type="search"
            className='flex-1 p-3 text-lg'
            placeholder='Search pastes...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className='grid gap-6'>
        {filteredData.length > 0 ? (
          filteredData.map((paste) => (
            <div key={paste?._id} className='card hover:border-accent-primary'>
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-semibold text-accent-primary">
                  {paste.title}
                </h2>
                <span className="text-sm text-text-primary opacity-60">
                  {new Date(paste.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </div>

              <div className="bg-bg-primary rounded-lg p-4 mb-4 overflow-hidden">
                <pre className="text-text-primary whitespace-pre-wrap line-clamp-3">
                  {paste.content}
                </pre>
              </div>

              <div className='flex flex-wrap gap-3 items-center'>
                <Link 
                  to={`/?pasteId=${paste?._id}`}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-bg-primary hover:bg-accent-primary hover:text-white transition-colors">
                  <FaEdit />
                  Edit
                </Link>
                <Link 
                  to={`/pastes/${paste?._id}`}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-bg-primary hover:bg-accent-primary hover:text-white transition-colors">
                  <FaEye />
                  View
                </Link>
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(paste?.content);
                    toast.success("Copied to clipboard");
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-bg-primary hover:bg-accent-primary hover:text-white transition-colors">
                  <FaCopy />
                  Copy
                </button>
                <button 
                  onClick={() => handleShare(paste)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-bg-primary hover:bg-accent-primary hover:text-white transition-colors">
                  <FaShare />
                  Share
                </button>
                <button 
                  onClick={() => handleDelete(paste?._id)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-bg-primary hover:bg-danger hover:text-white transition-colors ml-auto">
                  <FaTrash />
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="card text-center py-12">
            <div className="text-4xl mb-4 opacity-30">📋</div>
            <h3 className="text-xl font-semibold text-text-primary mb-2">No pastes found</h3>
            <p className="text-text-primary opacity-60">
              {searchTerm ? 'Try a different search term' : 'Create your first paste to get started'}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Paste