import { useState, useEffect } from "react";
import products from "./data/products";
import ProductCard from "./components/ProductCard";
import SearchBar from "./components/SearchBar";

// Special labels passed to ProductCard as children (id -> label)
const labels = {
  2: "New",
  5: "Sale",
  8: "Sale",
};

function App() {
  // ----- Lab 3: cart state -----
  const [itemCount, setItemCount] = useState(0);
  const [lastAdded, setLastAdded] = useState("");

  // ----- Lab 4: search and filter state -----
  const [searchText, setSearchText] = useState(""); // what the user is typing now
  const [debouncedSearch, setDebouncedSearch] = useState(""); // value used for filtering
  const [category, setCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("default");

  const handleAddToCart = (title) => {
    setItemCount((count) => count + 1);
    setLastAdded(title);
  };

  // Debounce effect: wait 300 ms after the last keystroke, then update
  // debouncedSearch. The cleanup cancels the previous timer, so only the
  // final pause in typing triggers an update.
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchText);
    }, 300);

    return () => clearTimeout(timer); // cleanup
  }, [searchText]);

  // Derived list: calculated during render from existing state (no extra state).
  // filter() already returns a new array, and [...] makes it explicit that we
  // never sort or modify the original products array.
  let filteredProducts = products.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(debouncedSearch.trim().toLowerCase());
    const matchesCategory = category === "All" || product.category === category;
    return matchesSearch && matchesCategory;
  });

  filteredProducts = [...filteredProducts];
  if (sortOrder === "low-high") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortOrder === "high-low") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  // Second effect: update the browser tab title when the result count changes.
  useEffect(() => {
    document.title = `CvSU Mini Store (${filteredProducts.length} results)`;
  }, [filteredProducts.length]);

  // Reset every filter to its default value.
  const handleClearFilters = () => {
    setSearchText("");
    setDebouncedSearch(""); // so the list resets immediately, without the 300 ms wait
    setCategory("All");
    setSortOrder("default");
  };

  return (
    <div className="app">
      <header className="app__header">
        <h1>CvSU Mini Store</h1>
        <p className="cart-message" role="status">
          {itemCount === 0
            ? "Your cart is empty."
            : `Items added to cart: ${itemCount} (Last added: ${lastAdded})`}
        </p>
      </header>

      <SearchBar
        searchText={searchText}
        onSearchChange={setSearchText}
        category={category}
        onCategoryChange={setCategory}
        sortOrder={sortOrder}
        onSortChange={setSortOrder}
        onClear={handleClearFilters}
      />

      <p className="result-count" role="status">
        Showing {filteredProducts.length} of {products.length} products
      </p>

      {filteredProducts.length === 0 ? (
        <p className="empty-state">
          No products found. Try a different keyword or category.
        </p>
      ) : (
        <main className="product-grid">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              title={product.title}
              price={product.price}
              category={product.category}
              inStock={product.inStock}
              onAddToCart={handleAddToCart}
            >
              {labels[product.id] && <span>{labels[product.id]}</span>}
            </ProductCard>
          ))}
        </main>
      )}
    </div>
  );
}

export default App;
