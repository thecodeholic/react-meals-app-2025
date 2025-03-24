function SearchForm({ search, setSearch, handleSearch }) {
  return (
    <form onSubmit={handleSearch} className="mt-4 flex justify-center">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="p-2 rounded bg-gray-700 text-white"
        placeholder="Search for a meal..."
      />
      <button type="submit" className="ml-2 p-2 rounded bg-indigo-600 hover:bg-indigo-700">
        Search
      </button>
    </form>
  );
}

export default SearchForm;
