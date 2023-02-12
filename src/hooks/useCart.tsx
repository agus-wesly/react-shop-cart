import { useContext } from "react";
import { CartContext } from "../context/CartProvider";
import { CartContextType } from "../context/CartProvider";

function useCart(): CartContextType {
  return useContext(CartContext);
}

export default useCart;
