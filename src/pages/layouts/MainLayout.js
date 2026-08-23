import Head from "next/head";
import Header from "./Header";
import Footer from "./Footer";

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen relative flex flex-col bg-[rgb(11,15,23)] text-slate-100">
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
      </Head>
      <Header />
      <main className="pt-8 flex-1 min-h-screen">
        <div className="max-w-5xl mx-auto px-6 sm:px-8 w-full">{children}</div>
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
