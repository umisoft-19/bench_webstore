import styles from "../styles/layout.module.css"
import Link from "next/link"
import {useEffect, useState, useContext} from "react"
import Context from "../utils/context"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import axios from 'axios'

const CurrencyWidget = (props) => {
    const context = useContext(Context)

    const toggleCurrency = (e) => {
        e.stopPropagation()
        
        axios({
            method: "GET",
            url: "/api/get_exchange_rate/",
            params: {currency: e.target.value}
        }).then(res => {
            const currency_obj = context.currencies.filter(c => c.id == e.target.value)[0]
            context.updateCurrency(currency_obj)
            context.updateExchangeRate(res.data.rate)
        })
    }

    return (
    <li>
        <label>Currency: </label><br />
        <select 
            onClick={toggleCurrency}
            className={styles.select}
        >
            {context.currencies.map(c => (
                <option key={c.id} value={c.id}>{c.symbol}</option>
            ))}
        </select>
    </li>
)}

const AccountMenu = props => {
    const [show, setShow] = useState(false)
    const context = useContext(Context)

    

    if(props.mobile)  {
        return (
                <li>
                <span>Account</span>
                <ul>
                    {context.account
                        ? <>
                            <li><Link href="/wishlist">Wishlist</Link></li>
                            <li><Link href="/cart">Cart</Link></li>
                            <li><Link href="/account">My Account</Link></li>
                          </>
                        : null
                    }
                    <CurrencyWidget />
                </ul>
            </li>
        )
    }

    return (
        <Context.Consumer>{context => (
            <li 
          className={styles.navDropdown}
          onClick={()=> setShow(!show)}
        >
            <span>Account</span>
            <ul
              className={styles.navDropdownList}
              style={{display: show ? "block": "none"}}
            >
                {context.account
                    ? <>
                        <li><FontAwesomeIcon icon="heart"/>  <Link href="/wishlist">Wish List</Link></li>
                        <li><FontAwesomeIcon icon="shopping-cart"/> <Link href="/cart">Cart</Link></li>
                        <li><FontAwesomeIcon icon="user"/> <Link href="/account">My Account</Link></li>
                      </>
                    : null
                }
                <CurrencyWidget  />
            </ul>
        </li>
        )}</Context.Consumer>
    )
}


export default function Navbar(props) {
    const [show, setShow] = useState(false)
    const [mobile, setMobile] = useState(false)
    const context = useContext(Context)

    useEffect(() => {
        setMobile(window.screen.width < 576)
    }, [])
    return (
        <nav className={styles.nav}>
            <div>
                <Link href="/"><img src={props.config ? props.config.company.logo : "img"}/></Link>
            </div>
            <div>
                <button 
                    className={styles.mobileButton}
                    onClick={() => setShow(!show)}
                >
                    <FontAwesomeIcon icon="bars"/>
                </button>
                <ul 
                    className={styles.navList} 
                    style={{display: mobile ? show ? "flex": "none" : "flex"}}
                    onClick={() => mobile ? setShow(false) : null}
                >
                    
                    {context.departments.map(d => <li key={d.id}><Link href={`/department/${d.id}`}>{d.name}</Link></li>)}
                    <li><Link href="/blog">Blog</Link></li>
                    <li><Link href="/about">About</Link></li>
                    <li><Link href="/contact">Contact</Link></li>
                    <li><Link href="/login">Login</Link></li>
                    <li><Link href="/sign_up">Sign Up</Link></li>
                    <AccountMenu mobile={mobile}/>
                </ul>
            </div>
        </nav>
    )
}