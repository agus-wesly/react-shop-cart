import ProductCard from "../components/ProductCard";
import useProduct from "../hooks/useProduct";
import useCart from "../hooks/useCart";

function ProductList() {
  const { products } = useProduct();
  const { cartItem } = useCart();

  return (
    <section className="space-y-5">
      {products.map((product) => {
        const isAdded = cartItem.some((item) => item.sku === product.sku);
        return (
          <ProductCard
            key={product.sku}
            name={product.name}
            price={product.price}
            image={product.image}
            product={product}
            isAdded={isAdded}
          />
        );
      })}
    </section>
  );
}

export default ProductList;
