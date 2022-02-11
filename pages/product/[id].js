
import {useState, useEffect, useReducer, useRef} from "react"
import { useRouter } from "next/router"
import axios from "axios"
import Card from "../../components/product"
import Carousel from "../../components/carousel"
import styles from "../../styles/product.module.css"
import Input from "../../components/input"
import DepartmentList from "../../components/departmentList"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Reviews from "../../components/reviews"
import { addToCart, addToWishList } from "../../utils/shopping"
import Context from "../../utils/context"
import Price from "../../components/price"


const reducer = (state, action) => {
    if(action.type == "increment") {
        return ({...state, count: state.count + 1} )
    }
    if(action.type == "decrement") {
        return ({...state, count: state.count > 0 ? state.count - 1: 0})
    }
    return state
}


export default  function Product(props) {
    const [state, dispatch] = useReducer(reducer, {
        count: 1
    })
    const [name, setName] = useState("")
    const [obj, setObj] = useState(null)
    const [description, setDescription] = useState("")
    const [images, setImages] = useState([])
    const router = useRouter()
    const query = router.query
    const carouselContainerRef = useRef()

    useEffect(() => {
        if(!query.id) {
            return 
        }
        axios.get("/api/product/?id=" + query.id)
            .then(res => {
                const img_list = [res.data.img]
                console.log(res.data)
                setObj(res.data)
                setName(res.data.name)
                setDescription(res.data.description)
                setImages(img_list.concat(res.data.alternate_images))
                dispatch({type:"set-index", value:res.data.alternate_images.length + 1})
            })
    }, [query]);

    return (
        <Context.Consumer>{context=>(
            <div>
            <h1>{name}</h1>
            <div className={styles.container}>
                <div className={styles.sidebar}>
                    <DepartmentList />   
                </div>
                <div className={styles.products}>
                    <div className={styles.productDetail}>
                        <div ref={carouselContainerRef}>
                            <Carousel 
                                img_list={images}
                                container={carouselContainerRef}
                                />
                        </div>
                        <div className={styles.productDescription}>
                            <h2><Price price={obj ? obj.unit_sales_price : 0}/></h2>
                            <h4>Description</h4>
                            <p>{description}</p>
                            <br />
                            {context.account 
                                ? <>
                                    <div className={styles.counter}>
                                        <button onClick={() => dispatch({type:"decrement"})}>-</button>
                                        <span>{state.count}</span>
                                        <button onClick={() => dispatch({type:"increment"})}>+</button>
                                    </div>
                                    <div className={styles.actions}>
                                        <button 
                                          onClick={() => addToCart(obj.id, context.account.id, state.count)}
                                        >
                                            ADD TO CART
                                        </button>
                                        <button 
                                            onClick={() => addToWishList(obj.id, context.account.id)}
                                        > 
                                            WISH LIST ITEM 
                                        </button>
                                    </div>
                                  </>
                                : <p>Sign in for more options.</p>}
                        </div>
                    </div>
                    <div className={styles.share}>
                        <h5>Share</h5>
                        <hr />
                        <div className={styles.shareBox}>
                            <div><FontAwesomeIcon icon={["fab", "facebook"]} size="2x"/> <span className={styles.socialText}>Facebook</span></div>
                            <div><FontAwesomeIcon icon={["fab", "instagram"]} size="2x"/> <span className={styles.socialText}>Instagram</span></div>
                            <div><FontAwesomeIcon icon={["fab", "twitter"]} size="2x" /> <span className={styles.socialText}>Twitter</span></div>
                        </div>
                        <div className={styles.comments}>
                            {obj 
                                ? <Reviews 
                                    stars={obj.stars}
                                    reviews={obj.productreview_set}
                                    product_id={obj.id}
                                  />
                                : null}
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )}</Context.Consumer>
    )
}