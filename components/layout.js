import Footer from './footer'
import NavBar from './nav'
import styles from '../styles/layout.module.css'

export default function Layout({children}) {
    return (
        <>
            <NavBar />
            <main className={styles.main}>
                {children}
            <Footer />
            </main>
        </>
    )
}