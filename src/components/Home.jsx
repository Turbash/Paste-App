import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import { addToPastes, updateToPastes } from '../redux/pasteSlice';

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
    <div className="terminal-window max-w-4xl mx-auto">
      <div className='flex flex-col gap-4'>
        <div className="flex items-center gap-4">
          <span className="text-terminal-green">$</span>
          <input
            className='flex-1 p-2 rounded bg-[#1e2227] border border-[#3e4451] focus:border-terminal-blue'
            type="text"
            placeholder='enter title here'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button
            onClick={createPaste}
            className='px-4 py-2 rounded hover:bg-terminal-green hover:text-terminal-bg transition-colors'>
            {pasteId ? "Update Paste" : "Create Paste"}
          </button>
        </div>
        <div className='mt-4'>
          <textarea 
            className='w-full rounded bg-[#1e2227] border border-[#3e4451] focus:border-terminal-blue p-4'
            value={value}
            placeholder='enter content here'
            onChange={(e) => setValue(e.target.value)}
            rows={20}
          />
        </div>
      </div>
    </div>
  )
}