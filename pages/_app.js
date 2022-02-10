import "../styles/globals.css"
import "@fortawesome/fontawesome-svg-core/styles.css"
import { library } from "@fortawesome/fontawesome-svg-core"
import { fab } from "@fortawesome/free-brands-svg-icons"
import { faHome, faSearch, faFilter, faEllipsisV, faBars,
   faAngleLeft, faAngleRight, faShoppingCart, faHeart,
   faAt, faPhone, faQuestion, faList, faFile, faStar } from "@fortawesome/free-solid-svg-icons"
import Layout from "../components/layout"
import { useState, useEffect } from "react"
import Context from "../utils/context"
import  { getCookie } from "cookies-next"
import axios from "axios"


library.add(faHome, faSearch, faFilter, faBars, faEllipsisV, 
  fab, faAngleLeft, faAngleRight, faHeart, faShoppingCart,
  faAt, faPhone, faQuestion, faList, faFile, faStar)

function MyApp({ Component, pageProps }) {
  const [account, setAccount] = useState(null)
  useEffect(() => {
    const token = getCookie("token")
    if(!account) {
      axios.get("/api/account")
        .then(res => {
          const data = res.data[0]
          setAccount(data)
        })
    }

  }, [])

  return (
    <Context.Provider value={{
        account:account,
        setAccountDetails:setAccount
      }}>
      <Layout  >
        <Component 
          {...pageProps}
        />
      </Layout>
    </Context.Provider>
    
  )
}

export default MyApp
