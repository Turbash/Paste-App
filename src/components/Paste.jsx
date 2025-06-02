import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromPastes } from '../redux/pasteSlice';
import toast from 'react-hot-toast';

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
    <div className="terminal-window max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <span className="text-terminal-green">$</span>
        <input 
          type="search"
          className='flex-1 p-2 rounded bg-[#1e2227] border border-[#3e4451] focus:border-terminal-blue'
          placeholder='search pastes...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className='flex flex-col gap-4'>
        {filteredData.length > 0 ? (
          filteredData.map((paste) => (
            <div key={paste?._id} className='border border-[#3e4451] rounded-lg p-4 bg-[#1e2227]'>
              <div className="text-terminal-purple font-semibold mb-2">
                {paste.title}
              </div>
              <div className="text-terminal-text mb-4 overflow-hidden text-ellipsis">
                {paste.content}
              </div>
              <div className='flex flex-wrap gap-2 justify-end'>
                <button className="px-3 py-1 text-sm">
                  <a href={`/?pasteId=${paste?._id}`}>Edit</a>
                </button>
                <button className="px-3 py-1 text-sm">
                  <a href={`/pastes/${paste?._id}`}>View</a>
                </button>
                <button 
                  className="px-3 py-1 text-sm"
                  onClick={() => handleDelete(paste?._id)}>
                  Delete
                </button>
                <button 
                  className="px-3 py-1 text-sm"
                  onClick={() => {
                    navigator.clipboard.writeText(paste?.content);
                    toast.success("copied to clipboard");
                  }}>
                  Copy
                </button>
                <button 
                  className="px-3 py-1 text-sm"
                  onClick={() => handleShare(paste)}>
                  Share
                </button>
              </div>
              <div className="text-xs text-terminal-text mt-2 opacity-60">
                {new Date(paste.createdAt).toLocaleString()}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-terminal-text opacity-60">
            No pastes found
          </div>
        )}
      </div>
    </div>
  )
}