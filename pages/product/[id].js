
import {useState, useEffect, useReducer, useRef} from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import Card from '../../components/product'
import Carousel from '../../components/carousel'
import styles from '../../styles/product.module.css'
import Input from '../../components/input'
import DepartmentList from '../../components/departmentList'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const reducer = (state, action) => {
    if(action.type == "increment") {
        return ({...state, count: state.count + 1} )
    }
    if(action.type == 'decrement') {
        return ({...state, count: state.count > 0 ? state.count - 1: 0})
    }
    return state
}


export default  function Product(props) {
    const [state, dispatch] = useReducer(reducer, {
        count: 1
    })
    const [name, setName] = useState("")
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
                setName(res.data.name)
                setDescription(res.data.description)
                setImages(img_list.concat(res.data.alternate_images))
                dispatch({type:'set-index', value:res.data.alternate_images.length + 1})
            })
    }, [query]);

    return (
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
                            <h5>Description</h5>
                            <br />
                            <p>{description}</p>
                            <br />
                            <div className={styles.counter}>
                                <button onClick={() => dispatch({type:"decrement"})}>-</button>
                                <span>{state.count}</span>
                                <button onClick={() => dispatch({type:"increment"})}>+</button>
                            </div>
                            <div className={styles.actions}>
                                <button><FontAwesomeIcon icon="shopping-cart"/> Add to cart</button>
                                <button><FontAwesomeIcon icon="heart"  /> Add to wishlist</button>
                            </div>
                        </div>
                    </div>
                    <div className={styles.share}>
                        <h5>Share</h5>
                        <hr />
                        <div className={styles.shareBox}>
                            <div><FontAwesomeIcon icon={["fab", "facebook"]} size="2x"/> Facebook</div>
                            <div><FontAwesomeIcon icon={["fab", "instagram"]} size="2x"/> Instagram</div>
                            <div><FontAwesomeIcon icon={["fab", "twitter"]} size="2x" /> Twitter</div>
                        </div>
                        <div className={styles.comments}>
                            <label htmlFor="">Comments</label><br />
                            <textarea name="" id="" cols="30" rows="5"></textarea>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}