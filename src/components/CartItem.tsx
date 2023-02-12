import { ChangeEvent } from "react";
import { ActionType } from "../context/CartProvider";
import { CartItemType } from "../context/CartProvider";
import { CART_ACTION } from "../context/CartProvider";

type PropsType = Omit<CartItemType, "sku"> & {
  dispatch: React.Dispatch<ActionType>;
  item: CartItemType;
};

function CartItem({ name, qty, price, image, dispatch, item }: PropsType) {
  const quantities = 20 > qty ? 20 : qty + 10;

  const options = [...Array(quantities).keys()].map((opt) => (
    <option value={opt + 1}>{opt + 1}</option>
  ));

  const totalPrice = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(price * qty);

  const handleQtyChange = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch({
      type: CART_ACTION.QUANTITY,
      payload: { ...item, qty: Number(e.target.value) },
    });
  };

  return (
    <article className="shadow-md flex h-36 space-x-5 pr-3">
      <img
        src={image}
        alt={`${image}-img`}
        className="w-[35%] object-cover rounded-tl-lg rounded-bl-lg"
      />

      <div className="self-center space-y-3">
        <p className="text-medium text-neutral-800 font-semibold">{name}</p>

        <select
          onChange={handleQtyChange}
          className="text-xs text-neutral-900"
          name="quantity"
          value={qty}
        >
          {options}
        </select>
        <p className="inline text-xs text-neutral-600">{totalPrice}</p>

        {/* .. */}
      </div>
      <button className="bg-rose-300 text-red-700 text-xs self-center font-medium px-3 py-1 rounded-full">
        Remove
      </button>
    </article>
  );
}

export default CartItem;
