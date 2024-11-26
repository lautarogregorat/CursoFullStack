const SearchBar = ({ search, setSearch }) => (
    <div>
      <input
        type="text"
        placeholder="Search for a country..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
  
  export default SearchBar;
  