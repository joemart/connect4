import Game from "./components/Game";
import Layout from "./components/layout";
import { useRouter } from "next/router";
import styles from "./index.module.scss"


const Home = () => {

  const router = useRouter()

  return (
    <section className={styles["section"]}>
      <div className={styles["title"]}>Connect 4</div>
      <button className={styles["register_button"]} onClick={() => router.push("/register")}>Create account</button>
    </section>
  );
}

export default Home

Home.getLayout = <T extends React.ReactNode>(page: T) => {
  return <Layout>{page}</Layout>
}