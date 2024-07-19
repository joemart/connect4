import Layout from "@/pages/components/layout"
import styles from "./menu.module.scss"
import Chat from "@/pages/components/Menu/chat"
import Options from "@/pages/components/Menu/options"

const Menu = () => {

    return <section className={styles["section"]}>
        <Chat></Chat>
        <Options></Options>
    </section>
}


export default Menu

Menu.getLayout = (children: React.ReactElement) => {
    return <Layout>{children}</Layout>
}