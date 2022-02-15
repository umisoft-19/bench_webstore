
import {useState, useEffect} from "react"
import { useRouter } from "next/router"
import axios from "axios"
import Card from "../../components/product"
import styles from "../../styles/department.module.css"
import Input from "../../components/input"
import Filters from "../../components/filters"
import Spinner from "../../components/spinner"



export default  function Category(props) {
    const [products, setProducts] = useState([])
    const [img, setImg ] = useState(null)
    const [description, setDescription ] = useState("")
    const [name, setName ] = useState("")
    const router = useRouter()
    const query = router.query
    useEffect(() => {
        if(!query.id) {
            return
        }
        axios.get("/api/category/?id=" + query.id)
            .then(res => {
                console.log(res)
                setProducts(res.data.products || [])
                setName(res.data.name)
                setDescription(res.data.description)
                setImg(res.data.image)
            })
    }, [query]);

    if(products.length == 0) {
        return <Spinner />
      }
    

    return (
        <div>
            <h1>{name}</h1>
            <div className={styles.container}>
                <div className={styles.sidebar}>
                    <img src={img}/>
                    <hr />
                    <p>{description}</p>
                    <hr />
                    <Filters setProducts={setProducts}/>
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