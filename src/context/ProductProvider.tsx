import { createContext, ReactElement, ReactNode, useState } from "react";

export type ProductType = {
  sku: number;
  name: string;
  price: number;
  image: string;
};

const initState: ProductType[] = [
  {
    sku: 9,
    name: "Awesome Soft Chicken",
    price: 280000,
    image: "https://api.lorem.space/image/fashion?w=640&h=480&r=2417",
  },
  {
    sku: 10,
    name: "Bespoke Plastic Car",
    price: 500000,
    image: "https://api.lorem.space/image/watch?w=640&h=480&r=2225",
  },
  {
    sku: 11,
    name: "Electronic Bronze Keyboard",
    price: 300000,
    image: "https://api.lorem.space/image/fashion?w=640&h=480&r=2480",
  },
  {
    sku: 12,
    name: "Granite Fish",
    price: 100000,
    image: "https://api.lorem.space/image/furniture?w=640&h=480&r=1662",
  },
];

export type ProductContextType = {
  products: ProductType[];
  setProducts: React.Dispatch<React.SetStateAction<ProductType[]>>;
};

export const ProductContext = createContext<ProductContextType>({
  products: [],
  setProducts: () => {},
});

export type Children = ReactNode | ReactNode[];

type ProductProviderProps = {
  children?: Children;
};

function ProductProvider({ children }: ProductProviderProps): ReactElement {
  const [products, setProducts] = useState(initState);

  return (
    <ProductContext.Provider value={{ products, setProducts }}>
      {children}
    </ProductContext.Provider>
  );
}

export default ProductProvider;
