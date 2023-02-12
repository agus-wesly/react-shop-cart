import useCart from "../hooks/useCart";
import { ProductType } from "../context/ProductProvider";
import { CART_ACTION } from "../context/CartProvider";

type PropsType = Omit<ProductType, "sku"> & {
  product: ProductType;
  isAdded: boolean;
};

function ProductCard({ name, price, image, isAdded, product }: PropsType) {
  const { dispatch } = useCart();

  const handleAdd = () => {
    dispatch({
      type: CART_ACTION.ADD,
      payload: { ...product, qty: 1 },
    });
  };

  return (
    <article className="shadow-md text-sm relative z-3">
      <img
        src={image}
        alt={`${name}-image`}
        className="rounded-tl-lg rounded-tr-lg"
      />

      <div className="p-3 py-5">
        <p className="font-bold text-lg text-neutral-800">{name} </p>

        <p className="text-neutral-600 font-semibold">
          {new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
          }).format(price)}
        </p>

        <button
          className="mt-3 rounded-full py-2 px-10 text-xs bg-green-200 text-green-800 font-bold
          disabled:bg-gray-200 disabled:text-gray-700"
          disabled={isAdded}
          onClick={handleAdd}
        >
          {isAdded ? "Added" : "Add to cart"}
        </button>
      </div>
    </article>
  );
}

export default ProductCard;
