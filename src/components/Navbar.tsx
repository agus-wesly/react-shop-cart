import useCart from "../hooks/useCart";

type PropsType = {
  activePage: number;
  setActivePage: React.Dispatch<React.SetStateAction<number>>;
};

const TITLE = {
  0: "View Cart",
  1: "View Item",
};

type TitleKeyType = keyof typeof TITLE;

function Navbar({ activePage, setActivePage }: PropsType) {
  const { totalItem, totalPrice } = useCart();

  const handleBtnClick = () => {
    setActivePage((prev) => (prev === 0 ? 1 : 0));
  };

  return (
    <nav className="sticky z-[5] top-0 py-5 px-3 flex bg-[#a42ff2] items-center justify-between text-neutral-50">
      <div>
        <h1 className="text-3xl font-bold title">Shop Kuy !</h1>
        <h3 className="text-gray-100 text-sm mt-3">Find your best choice</h3>
      </div>

      <div className="text-sm text-end">
        <p>Total Item : {totalItem}</p>
        <p>Total Price: {totalPrice}</p>

        <button
          onClick={handleBtnClick}
          className="rounded-lg text-sm bg-neutral-100 px-5 py-1 text-[#a42ff2] font-semibold mt-3"
        >
          {TITLE[activePage as TitleKeyType]}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
