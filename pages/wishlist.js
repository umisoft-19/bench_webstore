import Context from "../utils/context"
import styles from "../styles/wishlist.module.css"
import ProductCard from "../components/product"



export default  function Wishlist(props) {
    return (
        <Context.Consumer>{context =>(
            <div>
                <h1>My Wishlist</h1>
                {context.account
                    ? <div className={styles.container}>
                        {context.account.cart.length > 0 
                            ? context.account.wishlist.map((line, i) => (
                                <ProductCard 
                                    {...line.item} 
                                    noWishListButton
                                    key={i}
                                />
                            ))
                            : <h3>No items in the wish list. Go shopping!</h3>}
                    </div>
                    : <h2>Sign In to view the wish list</h2> }
            </div>
        )}</Context.Consumer>
    )
}