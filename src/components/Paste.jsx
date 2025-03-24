import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromPastes } from '../redux/pasteSlice';
import toast from 'react-hot-toast';

const Paste = () => {

  const [searchTerm, setSearchTerm] = useState('');
  const pastes = useSelector((state) =>
    state.paste.pastes);
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
    <div>
      <div>
        <input type="search"
          className='p-2 rounded-2xl min-w-[600px] mt-5'
          placeholder='search here'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className='flex flex-col gap-5'>

        {filteredData.length > 0 &&

          filteredData.map(
            (paste) => {
              return (
                <div className='border' key={paste?._id}>
                  <div>
                    {paste.title}
                  </div>
                  <div>
                    {paste.content}
                  </div>
                  <div className='flex flex-row gap-4 place-content-evenly'>
                    <button>
                      <a href={`/?pasteId=${paste?._id}`}>
                        Edit
                      </a>
                    </button>
                    <button>
                      <a href={`/paste/${paste?._id}`}>
                        View
                      </a>
                    </button>
                    <button onClick={() => handleDelete(paste?._id)}>
                      Delete
                    </button>
                    <button onClick={() => {
                      navigator.clipboard.writeText(paste?.content);
                      toast.success("copied to clipboard");
                    }}>
                      Copy
                    </button>
                    <button onClick={() => handleShare(paste)}>
                      Share
                    </button>
                  </div>
                  <div>
                    {paste.createdAt}
                  </div>
                </div>
              )
            }
          )

        }

      </div>
    </div>
  )
}

export default Paste
