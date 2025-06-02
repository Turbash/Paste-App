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
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <input
          type="search"
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 bg-white text-gray-900"
          placeholder="Search pastes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="space-y-6">
        {filteredData.length > 0 ? (
          filteredData.map((paste) => (
            <div key={paste._id} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <h2 className="text-xl font-semibold mb-4 text-gray-900">{paste.title}</h2>
              <div className="bg-gray-50 rounded p-4 mb-4 text-gray-800 overflow-auto max-h-40">
                {paste.content}
              </div>
              
              <div className="flex flex-wrap gap-3 justify-start mb-4">
                <a
                  href={`/?pasteId=${paste._id}`}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200"
                >
                  Edit
                </a>
                <a
                  href={`/pastes/${paste._id}`}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition duration-200"
                >
                  View
                </a>
                <button
                  onClick={() => handleDelete(paste._id)}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition duration-200"
                >
                  Delete
                </button>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(paste.content);
                    toast.success("Copied to clipboard");
                  }}
                  className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition duration-200"
                >
                  Copy
                </button>
                <button
                  onClick={() => handleShare(paste)}
                  className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition duration-200"
                >
                  Share
                </button>
              </div>
              
              <div className="text-sm text-gray-500">
                Created: {new Date(paste.createdAt).toLocaleString()}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 py-8">
            No pastes found
          </div>
        )}
      </div>
    </div>
  )
}

export default Paste