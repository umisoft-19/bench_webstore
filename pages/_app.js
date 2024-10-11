import "../styles/globals.css"
import "@fortawesome/fontawesome-svg-core/styles.css"
import { library } from "@fortawesome/fontawesome-svg-core"
import { fab } from "@fortawesome/free-brands-svg-icons"
import { faHome, faSearch, faFilter, faEllipsisV, faBars,
   faAngleLeft, faAngleRight, faShoppingCart, faHeart,
   faAt, faPhone, faQuestion, faList, faFile, faStar, faUser, faImage } from "@fortawesome/free-solid-svg-icons"
import Layout from "../components/layout"
import { useState, useEffect } from "react"
import Context from "../utils/context"
import  { getCookie } from "cookies-next"
import axios from "axios"
import Modal from '../components/modal'


library.add(faHome, faSearch, faFilter, faBars, faEllipsisV, 
  fab, faAngleLeft, faAngleRight, faHeart, faShoppingCart,
  faAt, faPhone, faQuestion, faList, faFile, faStar, faUser, faImage)

function MyApp({ Component, pageProps }) {
  const [account, setAccount] = useState(null)
  const [currency, setCurrency] = useState(null)
  const [currencies, setCurrencies] = useState([])
  const [departments, setDepartments] = useState([])
  const [hidePrices, setHidePrices] = useState(false)
  const [exchangeRate, setExchangeRate] = useState(1)
  const [message, setMessage] = useState("")
  const [show, setShow] = useState("")

  useEffect(() => {
    axios.get("/api/")
      .then(r => {
        setHidePrices(r.data.settings.hide_prices)
        setCurrency(r.data.settings.default_currency)
        setCurrencies(r.data.settings.available_currencies)
        setDepartments(r.data.settings.departments)

        if(!account) {
            axios.get("/api/account")
              .then(res => {
                const data = res.data[0]
                setAccount(data)
              })
          }      
      })
    
  }, [])

  const toggle = () => {
    setShow(!show)
  }

  const renderMsg = (msg) => {
    setMessage(msg)
    setShow(true)
  } 

  return (
    <Context.Provider value={{
        account:account,
        setAccountDetails:setAccount,
        toggle: toggle,
        renderMessage: renderMsg,
        currency: currency,
        currencies: currencies,
        hidePrices: hidePrices,
        exchangeRate: exchangeRate,
        departments: departments,
        updateCurrency: setCurrency,
        updateExchangeRate: val => setExchangeRate(val),
      }}>
      <Layout  >
        <Component 
          {...pageProps}
        />
        <Modal 
          title="Message"
          content={message}
          show={show}
          dismiss={() => setShow(false)}
        />
      </Layout>
    </Context.Provider>
  )
}

export default MyApp
