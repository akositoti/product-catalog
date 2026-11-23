import "./ProductCard.css";

// Props are destructured right in the parameter list (no props.title, etc.)
// category falls back to "General" when the parent does not pass one.
function ProductCard({
  title,
  price,
  category = "General",
  inStock,
  onAddToCart,
  children,
}) {
  // 1299 -> "1,299.00"
  const formattedPrice = price.toLocaleString("en-PH", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <article className={`product-card ${inStock ? "" : "product-card--out"}`}>
      {/* children: optional special label such as New or Sale */}
      {children && <div className="product-card__badge">{children}</div>}

      <p className="product-card__category">{category}</p>
      <h3 className="product-card__title">{title}</h3>
      <p className="product-card__price">₱{formattedPrice}</p>

      {/* conditional rendering: label depends on inStock */}
      {inStock ? (
        <p className="stock stock--in">In Stock</p>
      ) : (
        <p className="stock stock--out">Out of Stock</p>
      )}

      {/* the child calls the parent's function and passes the product title */}
      <button
        className="product-card__button"
        disabled={!inStock}
        onClick={() => onAddToCart(title)}
      >
        Add to Cart
      </button>
    </article>
  );
}

export default ProductCard;
