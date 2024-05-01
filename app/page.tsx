import Header from "./_components/header";
import Search from "./_components/search";

const Home = () => {
  return (
    <>
      <Header />
      <div className="px-5 py-6">
        <Search />
      </div>
    </>
  );
};

export default Home;
