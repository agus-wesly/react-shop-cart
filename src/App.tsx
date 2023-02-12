import { useState, useMemo } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProductList from "./pages/ProductList";
import CartList from "./pages/CartList";

const PAGES = {
  0: <ProductList />,
  1: <CartList />,
};

type PagesKey = keyof typeof PAGES;

function App() {
  const [activePage, setActivePage] = useState(0);

  const content = PAGES[activePage as PagesKey];

  return (
    <>
      <Navbar activePage={activePage} setActivePage={setActivePage} />
      <main className="App p-5 bg-neutral-50">{content}</main>
      <Footer />
    </>
  );
}

export default App;
