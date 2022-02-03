import '../styles/globals.css'
import "@fortawesome/fontawesome-svg-core/styles.css"
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faHome, faSearch, faFilter, faEllipsisV, faBars, faAngleLeft, faAngleRight, faShoppingCart, faHeart } from '@fortawesome/free-solid-svg-icons'
import Layout from '../components/layout'
library.add(faHome, faSearch, faFilter, faBars, faEllipsisV, fab, faAngleLeft, faAngleRight, faHeart, faShoppingCart)

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
