import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const ViewPaste = () => {
  const { id } = useParams();
  const allPastes = useSelector((state) => state.paste.pastes);
  const paste = allPastes.find((p) => p._id === id);

  if (!paste) {
    return (
      <div className="terminal-window max-w-4xl mx-auto">
        <div className="text-red-500">Paste not found</div>
      </div>
    );
  }

  return (
    <div className="terminal-window max-w-4xl mx-auto">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <span className="text-terminal-green">$</span>
          <input
            className="flex-1 p-2 rounded bg-[#1e2227] border border-[#3e4451]"
            type="text"
            value={paste.title}
            disabled
          />
        </div>
        <div className="mt-4">
          <textarea
            className="w-full rounded bg-[#1e2227] border border-[#3e4451] p-4"
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