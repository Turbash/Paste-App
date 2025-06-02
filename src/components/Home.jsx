import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { addToPastes, updateToPastes } from '../redux/pasteSlice';
import { FaSave } from 'react-icons/fa'

const Home = () => {
  const [title, setTitle] = useState('');
  const [value, setValue] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const allPastes = useSelector((state) => state.paste.pastes);
  const pasteId = searchParams.get("pasteId");
  
  useEffect(() => {
    if(pasteId) {
      const paste = allPastes.find((p) => p._id === pasteId);
      setTitle(paste.title);
      setValue(paste.content);
    }
  }, [pasteId])

  function createPaste() {
    const paste = {
      title: title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    }

    if(pasteId) {
      dispatch(updateToPastes(paste));
    } else {
      dispatch(addToPastes(paste));
    }
    setTitle('');
    setValue('');
    setSearchParams({});
  }

  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className='card'>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <input
              className='flex-1 p-3'
              type="text"
              placeholder='Enter title...'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <button
              onClick={createPaste}
              className='bg-accent-primary text-white hover:bg-accent-secondary'>
              <FaSave />
              {pasteId ? "Update Paste" : "Save Paste"}
            </button>
          </div>
          <div className='mt-4'>
            <textarea 
              className='w-full p-4'
              value={value}
              placeholder='Enter your content here...'
              onChange={(e) => setValue(e.target.value)}
              rows={20}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home