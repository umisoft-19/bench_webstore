import styles from "../styles/layout.module.css"
import Link from "next/link"
import {useEffect, useState} from "react"
import Context from "../utils/context"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const AccountMenu = props => {
    const [show, setShow] = useState(false)

    if(props.mobile)  {
        return (
            <Context.Consumer>{context => (
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
                    <li>
                        <label>Currency: </label><br />
                        <select onClick={e=> e.stopPropagation()}>
                            <option>USD</option>
                            <option>ZWL</option>
                        </select>
                    </li>
                </ul>
            </li>
            )}</Context.Consumer>
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
                        <li><Link href="/wishlist"><><FontAwesomeIcon icon="heart"/> Wish List</></Link></li>
                        <li><Link href="/cart"><><FontAwesomeIcon icon="shopping-cart"/> Cart</></Link></li>
                        <li><Link href="/account"><><FontAwesomeIcon icon="user"/> My Account</></Link></li>
                      </>
                    : null
                }
                <li>
                    <label>Currency: </label>
                    <select 
                        onClick={e=> e.stopPropagation()}
                        className={styles.select}
                    >
                        <option>USD</option>
                        <option>ZWL</option>
                    </select>
                </li>
            </ul>
        </li>
        )}</Context.Consumer>
    )
}


export default function Navbar(props) {
    const [show, setShow] = useState(false)
    const [mobile, setMobile] = useState(false)
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
                    <li><Link href="/">Products</Link></li>
                    <li><Link href="/blog">Blog</Link></li>
                    <li><Link href="/about">About</Link></li>
                    <li><Link href="/login">Login</Link></li>
                    <li><Link href="/sign_up">Sign Up</Link></li>
                    <AccountMenu mobile={mobile}/>
                </ul>
            </div>
        </nav>
    )
}