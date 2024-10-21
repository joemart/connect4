import Game from "./components/Game";
import Layout from "./components/layout";
import { useRouter } from "next/router";
import styles from "./index.module.scss"
import { useEffect, useContext } from "react";
import { AuthContext } from "./components/Context/AuthContext";

const Home = () => {

  const router = useRouter()
  const Auth = useContext(AuthContext)

  useEffect(() => {

    if (Auth && Auth.user)
      router.push("/menu")

  }, [])

  return (
    <section className={styles["section"]}>
      <div className={styles["title"]}>Connect 4</div>
      <button className={styles["register_button"]} onClick={() => router.push("/register")}>Sign in</button>
    </section>
  );
}

export default Home

Home.getLayout = <T extends React.ReactNode>(page: T) => {
  return <Layout>{page}</Layout>
}