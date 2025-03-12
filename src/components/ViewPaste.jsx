import React from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'


const ViewPaste = () => {

    const {id}=useParams();
    const allPastes=useSelector((state)=>state.paste.pastes);
    const paste=allPastes.filter((p)=>p._id === id)[0];


  return (
    <div>
      <div className='flex flex-row gap-7 place-content-between'>
        <input
          className='p-1 rounded-2xl mt-2 w-[66%] pl-4'
          type="text"
          placeholder='enter title here'
          disabled
          value={paste.title}
          onChange={(e) =>
            setTitle(e.target.value)
          } />

        {/* <button
          onClick={createPaste}
          className='p-2 rounded-2xl mt-2'>
          {pasteId ?"Update My Paste" :
          "Create My Paste"}
        </button> */}

      </div>
      <div className='mt-8'>
        <textarea className='rounded-2xl
        mt-4 min-w-[500px] p-4'
          value={paste.content}
          placeholder='enter content here'
          disabled
          onChange={(e) =>
            setValue(e.target.value)
          }
          rows={20} />
      </div>
    </div>
  )
}

export default ViewPaste