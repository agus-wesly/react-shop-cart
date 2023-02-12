import useCart from "../hooks/useCart";
import CartItem from "../components/CartItem";

function CartList() {
  const { cartItem, dispatch } = useCart();

  return (
    <section className="min-h-[70vh] space-y-5">
      {cartItem.map((item) => (
        <CartItem
          key={item.sku}
          name={item.name}
          qty={item.qty}
          price={item.price}
          image={item.image}
          item={item}
          dispatch={dispatch}
        />
      ))}
    </section>
  );
}

export default CartList;
