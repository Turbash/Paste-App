import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const ViewPaste = () => {
  const { id } = useParams();
  console.log(id);
  const allPastes = useSelector((state) => state.paste.pastes);
  console.log(allPastes);
  const paste = allPastes.find((p) => p._id === id);
  console.log(paste);

  if (!paste) {
    return (
      <div className="max-w-4xl mx-auto px-4">
        <div className="card text-danger">Paste not found</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="card">
        <div className="flex flex-col gap-4">
          <input
            className="w-full p-3"
            type="text"
            value={paste.title}
            disabled
          />
          <textarea
            className="w-full p-4"
            value={paste.content}
            disabled
            rows={20}
          />
        </div>
      </div>
    </div>
  );
}

export default ViewPaste