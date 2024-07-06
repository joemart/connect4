import Register from "./components/RegisterIn";
import Layout from "./components/layout";

export default function LoginRegister() {

    return <Register />
}

LoginRegister.getLayout = function (page: React.ReactElement) {
    return <Layout>
        {page}
    </Layout>
}