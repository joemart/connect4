import Main from "./components/Main";
import Layout from "./components/layout";

const Home = () => {


  return (
    <>

      Connect 4
      <Main></Main>
    </>
  );
}

Home.getLayout = function (page: React.ReactElement) {
  return <Layout>
    {page}
  </Layout>
}

export default Home