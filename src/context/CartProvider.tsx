import { createContext, ReactElement, useReducer } from "react";
import { Children } from "./ProductProvider";

export type CartItemType = {
  sku: number;
  name: string;
  price: number;
  qty: number;
  image: string;
};

export const CART_ACTION = {
  ADD: "ADD",
  REMOVE: "REMOVE",
  QUANTITY: "QUANTITY",
  SUBMIT: "SUBMIT",
};

type CartStateType = { cartItem: CartItemType[] };

const initialState: CartStateType = { cartItem: [] };

export type ActionType = {
  type: string;
  payload?: CartItemType;
};

const reducer = (state: CartStateType, action: ActionType): CartStateType => {
  const { cartItem } = state;

  switch (action.type) {
    case CART_ACTION.ADD: {
      if (!action.payload) throw new Error("Payload required !");

      const { name, price, sku, image } = action.payload;

      const filteredCart = cartItem.filter((item) => item.sku !== sku);
      let addedProduct = cartItem.find((item) => item.sku === sku);

      const quantity: number = addedProduct?.qty ? addedProduct?.qty + 1 : 1;
      return {
        ...state,
        cartItem: [...filteredCart, { name, price, sku, image, qty: quantity }],
      };
    }

    case CART_ACTION.REMOVE: {
      if (!action.payload) throw new Error("Payload required !");

      const { sku } = action.payload;
      const newCartItem = cartItem.filter((item) => item.sku !== sku);

      return {
        ...state,
        cartItem: newCartItem,
      };
    }

    case CART_ACTION.QUANTITY: {
      if (!action.payload) throw new Error("Payload required !");

      const { qty, sku } = action.payload;
      const filteredCart = cartItem.filter((item) => item.sku !== sku);
      const findItem = cartItem.find((item) => item.sku === sku);

      if (!findItem) throw new Error("Item not found !");

      findItem.qty = qty;
      return {
        ...state,
        cartItem: [...filteredCart, findItem],
      };
    }

    case CART_ACTION.SUBMIT: {
      if (!action.payload) throw new Error("Payload required !");

      return {
        ...state,
        cartItem: [],
      };
    }

    default:
      throw new Error("Invalid action type");
  }
};

function useCartContext(initialState: CartStateType) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const totalItem: number = state.cartItem.reduce((value, currentItem) => {
    return value + currentItem.qty;
  }, 0);

  const totalPrice = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(
    state.cartItem.reduce((value, currentItem) => {
      return currentItem.qty * currentItem.price + value;
    }, 0)
  );

  return {
    dispatch,
    totalItem,
    totalPrice,
    cartItem: state.cartItem,
  };
}

export type CartContextType = ReturnType<typeof useCartContext>;

export const CartContext = createContext<CartContextType>({
  dispatch: () => {},
  totalItem: 0,
  totalPrice: "0",
  cartItem: [],
});

type CartProviderType = {
  children?: Children;
};

function CartProvider({ children }: CartProviderType): ReactElement {
  return (
    <CartContext.Provider value={useCartContext(initialState)}>
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;
