import React from 'react';

export default function Input({ label, type = 'text', value, onChange, placeholder, name }) {
  return (
    <div className="mb-4">
      {label && <label htmlFor={name} className="block mb-1 text-sm font-medium">{label}</label>}
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-4 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring focus:border-blue-400"
      />
    </div>
  );
}
