import Head from "next/head";
import Header from "./Header";
import Footer from "./Footer";

const MainLayout = ({ children }) => {
  return (
    <div className="bg-[#1d1160] min-h-screen relative flex flex-col">
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
      </Head>
      <Header />
      <div className="pt-16 flex-1 min-h-screen">{children}</div>
      <Footer />
    </div>
  );
};

export default MainLayout;
