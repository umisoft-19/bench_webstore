
import {useState, useEffect, useReducer} from "react"
import { useRouter } from "next/router"
import axios from "axios"
import Card from "../../components/product"
import styles from "../../styles/department.module.css"
import Input from "../../components/input"
import Link from "next/link"
import Filters from "../../components/filters"



export default  function Department(props) {
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [img, setImg ] = useState(null)
    const [description, setDescription ] = useState("")
    const [name, setName ] = useState("")
    
    const router = useRouter()
    const query = router.query

    useEffect(() => {
        if(!query.id) {
            return
        }
        axios.get("/api/department/?id=" + query.id)
            .then(res => {
                console.log(res)
                setProducts(res.data.products || [])
                setName(res.data.name)
                setCategories(res.data.categories || [])
                setDescription(res.data.description)
                setImg(res.data.image)
            })
    }, [query]);
    
    

    return (
        <div>
            <h1>{name}</h1>
            <div className={styles.container}>
                <div className={styles.sidebar}>
                    <img src={img}/>
                    <hr />
                    <p>{description}</p>
                    <hr />
                    <h4>Categories</h4>
                    <ul className={styles.categoryList}>
                        {categories.map(cat => (<li key={cat.id}><Link href={`/category/${cat.id}/`}>{cat.name}</Link></li>))}
                    </ul>
                    <hr />
                    <Filters setProducts={setProducts} />
                    
                </div>
                <div className={styles.products}>
                    
                    <div className={styles.productList}>
                        {products.map(p => <Card key={p.name} {...p}/>)}
                    </div>
                </div>
            </div>
            
        </div>
    )
}