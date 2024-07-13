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


Home.getLayout = <T extends React.ReactNode>(page: T) => {
  return <Layout>{page}</Layout>
}

export default Home