import React, { useState } from 'react';
import Button from './Button';

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) onSearch(query.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 w-full max-w-xl">
      <input
        type="text"
        placeholder="Search for movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-grow px-4 py-2 border rounded shadow-sm"
      />
      <Button type="submit">Search</Button>
    </form>
  );
}
