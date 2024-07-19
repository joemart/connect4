import GameComponent from "@/pages/components/Game"
import Layout from "./components/layout"

const Game = () => {


    return <GameComponent />
}

export default Game

Game.getLayout = (children: React.ReactElement) => {

    return <Layout>{children}</Layout>
}