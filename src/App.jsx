import { useState } from "react";
import products from "./data/products";
import ProductCard from "./components/ProductCard";

// Special labels passed to ProductCard as children (id -> label)
const labels = {
  2: "New",
  5: "Sale",
  8: "Sale",
};

function App() {
  // useState is used in App only for this lab (covered in Lab 4)
  const [itemCount, setItemCount] = useState(0);
  const [lastAdded, setLastAdded] = useState("");

  // Callback prop: the child calls this and hands back the product title
  const handleAddToCart = (title) => {
    setItemCount((count) => count + 1);
    setLastAdded(title);
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

      <main className="product-grid">
        {products.map((product) => (
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
    </div>
  );
}

export default App;
