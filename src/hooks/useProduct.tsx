import { useContext } from "react";
import { ProductContext } from "../context/ProductProvider";
import { ProductContextType } from "../context/ProductProvider";

function useProduct(): ProductContextType {
  return useContext(ProductContext);
}

export default useProduct;
