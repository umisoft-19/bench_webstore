import styles from "../styles/layout.module.css"
import Link from "next/link"
import {useEffect, useState} from "react"
import Context from "../utils/context"

const AccountMenu = props => {
    const [show, setShow] = useState(false)

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
                        <li><Link href="/wishlist">Wishlist</Link></li>
                        <li><Link href="/cart">Cart</Link></li>
                        <li><Link href="/account">My Account</Link></li>
                      </>
                    : null
                }
                <li>
                    <label>Currency: </label>
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


export default function Navbar(props) {
    return (
        <nav className={styles.nav}>
            <div>
                <Link href="/"><img src={props.config ? props.config.company.logo : "img"}/></Link>
            </div>
            <ul className={styles.navList}>
                <li><Link href="/">Products</Link></li>
                <li><Link href="/blog">Blog</Link></li>
                <li><Link href="/about">About</Link></li>
                <li><Link href="/login">Login</Link></li>
                <li><Link href="/sign_up">Sign Up</Link></li>
                <AccountMenu />
            </ul>
        </nav>
    )
}