import Context from "../utils/context"
import styles from "../styles/cart.module.css"
import Price from "../components/price"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default  function Cart(props) {
    return (
        <Context.Consumer>{context =>(
            <div>
                <h1>My Shopping Cart</h1>
                {context.account
                    ? <div>
                        {context.account.cart.length > 0 
                            ? <>
                                <div className={styles.headings}>
                                    <div className={styles.flexOne}><h4>Description</h4></div>
                                    <div className={styles.figures}><h4>Qty</h4></div>
                                    <div className={styles.figures}><h4>Subtotal</h4></div>
                                </div>
                                {context.account.cart[0].items.map((line, i) => (
                                <div className={styles.cartItem} key={i}>
                                    <div><img src={line.item.img} /></div>
                                    <div className={styles.flexOne}>
                                        <h4>{line.item.name}</h4>
                                        <p>{line.item.description}</p>
                                    </div>
                                    <div className={styles.figures}>
                                        <h3>
                                            <span className={styles.mobile_label}>Qty: </span>
                                            <span>{line.quantity}</span>
                                        </h3>
                                        
                                    </div>
                                    <div className={styles.figures}>    
                                        <h3><span className={styles.mobile_label}>Price: </span> <Price price={line.unit_price} /></h3>                                        
                                    </div>
                                </div>
                                ))}
                                <div className={styles.cartTotals}>
                            <div>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td>Number of Items</td>
                                            <td>{context.account.cart[0].items.reduce((acc, line) => acc + parseFloat(line.quantity), 0)}</td>
                                        </tr>
                                        <tr>
                                            <td><h2>Total</h2></td>
                                            <td><h2><Price price={context.account.cart[0].items.reduce((acc, line) => acc + parseFloat(line.unit_price) * parseFloat(line.quantity), 0)} /></h2></td>
                                        </tr>
                                    </tbody>
                                </table>
                                <button className="btn teal-button"><FontAwesomeIcon icon="shopping-cart"/> Check Out</button>
                            </div>
                        </div>
                              </>
                            : <h3>No items in cart. Go shopping!</h3>}
                        
                        
                    </div>
                    : <h2>Sign In to view the shopping cart</h2> }
            </div>
        )}</Context.Consumer>
    )
}