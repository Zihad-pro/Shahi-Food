import Discounts from "./components/layout/Discouns";
import Footer from "./components/layout/Footer";
import Hero from "./components/layout/Hero";
import Navbar from "./components/layout/Navber";
import Products from "./components/layout/Products";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="fixed top-0 left-0 w-full z-50 bg-neutral text-neutral-content shadow-md">
        <Navbar />
      </div>
      <Hero></Hero>
      <main id="meals" className=" max-w-7xl mx-auto">
        <Discounts></Discounts>
        <Products></Products>
      </main>
      <div className="bg-neutral ">
        <Footer />
      </div>
    </div>
  );
}
