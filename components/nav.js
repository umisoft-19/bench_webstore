import styles from '../styles/layout.module.css'
import Link from 'next/link'
import {useEffect, useState} from 'react'

const AccountMenu = props => {
    const [show, setShow] = useState(false)

    return (
        <li 
          className={styles.navDropdown}
          onClick={()=> setShow(!show)}
        >
            <span>Account</span>
            <ul
              className={styles.navDropdownList}
              style={{display: show ? "block": "none"}}
            >
                <li><Link href="/wishlist">Wishlist</Link></li>
                <li><Link href="/cart">Cart</Link></li>
                <li><Link href="/account">Account</Link></li>
                <li>
                    <label>Currency: </label>
                    <select onClick={e=> e.stopPropagation()}>
                        <option>USD</option>
                        <option>ZWL</option>
                    </select>
                </li>
            </ul>
        </li>
    )

}


export default function Navbar(props) {
    return (
        <nav className={styles.nav}>
            <div>
                <Link href="/">Logo</Link>
            </div>
            <ul className={styles.navList}>
                <li><Link href="/blog">Blog</Link></li>
                <li><Link href="/about">About</Link></li>
                <li><Link href="/login">Login</Link></li>
                <li><Link href="/sign_up">Sign Up</Link></li>
                <AccountMenu />
            </ul>
        </nav>
    )
}