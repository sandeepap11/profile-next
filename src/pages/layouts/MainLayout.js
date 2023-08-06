import Header from "./Header";
import Footer from "./Footer";

const MainLayout = ({ children }) => {
  return (
    <div className="bg-[#1d1160] min-h-screen relative">
      <Header />
      <div className="pt-16">{children}</div>
      <Footer />
    </div>
  );
};

export default MainLayout;
