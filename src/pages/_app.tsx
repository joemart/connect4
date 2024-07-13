import "@/styles/global.scss"
import type { AppProps } from 'next/app'
import { NextPage } from 'next'
import { AuthContextProvider } from "./components/Context/AuthContext/AuthContext"

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: React.ReactElement) => React.ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page)
  return getLayout(<AuthContextProvider><Component {...pageProps} /></AuthContextProvider>)
}
