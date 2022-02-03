import styles from '../styles/layout.module.css'

export default function Footer(props) {
    return (
        <footer className={styles.footer}>
            <div>
                <h5>About</h5>
                <hr />
                <ul>
                    <li>About</li>
                    <li>FAQ</li>
                    <li>Terms of Service</li>
                </ul>
            </div>
            <div>
                <h5>Contact</h5>
                <hr />
                <ul>
                    <li>Email</li>
                    <li>Telephone</li>
                    <li>Address</li>
                </ul>
            </div>
            <div>
                <h5>Social</h5>
                <hr />
                <ul>
                    <li>Instagram</li>
                    <li>Facebook</li>
                    <li>Whatsapp</li>
                </ul>
            </div>
        </footer>
    )
} 