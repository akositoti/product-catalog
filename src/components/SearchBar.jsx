import "./SearchBar.css";

// Controlled component: every value comes from props (App's state)
// and every change calls a setter that updates that state.
function SearchBar({
  searchText,
  onSearchChange,
  category,
  onCategoryChange,
  sortOrder,
  onSortChange,
  onClear,
}) {
  return (
    <div className="search-bar">
      <label className="search-bar__field search-bar__field--wide">
        <span>Search</span>
        <input
          type="text"
          value={searchText}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by product name"
        />
      </label>

      <label className="search-bar__field">
        <span>Category</span>
        <select value={category} onChange={(e) => onCategoryChange(e.target.value)}>
          <option value="All">All</option>
          <option value="Electronics">Electronics</option>
          <option value="Books">Books</option>
          <option value="School Supplies">School Supplies</option>
          <option value="Accessories">Accessories</option>
        </select>
      </label>

      <label className="search-bar__field">
        <span>Sort by price</span>
        <select value={sortOrder} onChange={(e) => onSortChange(e.target.value)}>
          <option value="default">Default</option>
          <option value="low-high">Price: Low to High</option>
          <option value="high-low">Price: High to Low</option>
        </select>
      </label>

      <button type="button" className="search-bar__clear" onClick={onClear}>
        Clear Filters
      </button>
    </div>
  );
}

export default SearchBar;
