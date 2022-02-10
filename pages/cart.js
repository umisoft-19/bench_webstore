import Context from '../utils/context'
import styles from '../styles/cart.module.css'
import Price from '../components/price'

export default  function Cart(props) {
    return (
        <Context.Consumer>{context =>(
            <div>
                <h1>My Shopping Cart</h1>
                {context.account
                    ? <div>
                        {context.account.cart.length > 0 
                            ? context.account.cart[0].items.map(line => (
                                <div className={styles.cartItem}>
                                    <div><img src={line.item.img} /></div>
                                    <div className={styles.flexOne}>
                                        <h4>{line.item.name}</h4>
                                        <p>{line.item.description}</p>
                                    </div>
                                    <div>
                                        <div>
                                            <span>{line.quantity} x</span>
                                            <h3><Price price={line.unit_price} /></h3>
                                        </div>
                                    </div>
                                </div>
                            ))
                            : <h3>No items in cart. Go shopping!</h3>}
                        
                        <div className={styles.cartTotals}>
                            <div>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td><h4>Number of Items </h4></td>
                                            <td><h4></h4></td>
                                        </tr>
                                        <tr>
                                            <td><h4>SubtTotal</h4></td>
                                            <td>
                                                <h4></h4>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td><h3>Total</h3></td>
                                            <td><h3></h3></td>
                                        </tr>
                                    </tbody>
                                </table>
                                <button className="btn teal-button">Check Out</button>
                            </div>
                        </div>
                    </div>
                    : <h2>Sign In to view the shopping cart</h2> }
            </div>
        )}</Context.Consumer>
    )
}