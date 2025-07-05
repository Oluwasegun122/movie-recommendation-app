import React from 'react';

export default function Spinner() {
  return (
    <div className="flex justify-center items-center my-6">
      <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent border-dashed rounded-full animate-spin"></div>
    </div>
  );
}
