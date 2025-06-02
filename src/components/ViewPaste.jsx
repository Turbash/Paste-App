import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const ViewPaste = () => {
  const { id } = useParams();
  const allPastes = useSelector((state) => state.paste.pastes);
  const paste = allPastes.find((p) => p._id === id);

  if (!paste) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center">
        <div className="bg-red-100 text-red-700 p-4 rounded-lg">
          Paste not found
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-4 text-gray-900">{paste.title}</h1>
        <div className="bg-gray-50 rounded-lg p-6 mb-4 whitespace-pre-wrap text-gray-800">
          {paste.content}
        </div>
        <div className="text-sm text-gray-500">
          Created: {new Date(paste.createdAt).toLocaleString()}
        </div>
      </div>
    </div>
  );
};

export default ViewPaste;