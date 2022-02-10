import axios from "axios";


const addToCart = (item, account, qty) => {
    console.log(account)
    axios({
        url: "/api/add_to_cart/",
        method: "GET",
        params: {
            item: item,
            account:account,
            qty: qty
        }
    }).then(res => {
        // alert("Added to cart!")
        console.log("added")
    })
}

const addToWishList = (item, account) => {
    axios({
        url:"/api/add_to_wishlist/", 
        method: "GET",
        params:{
            item: item,
            account: account
        }
    }).then(res => {
        alert("Added to wishlist!")
    })
}

export {addToCart, addToWishList}