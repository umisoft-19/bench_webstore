import {useState, useEffect} from "react"
import {useRouter} from "next/router"
import axios from "axios"
import ReactMarkdown from "react-markdown"
import styles from "../../styles/blog.module.css"
import Spinner from "../../components/spinner"

export default  function Blog(props) {
    const [article, setArticle] = useState(null)
    const router = useRouter()
    const query = router.query
    useEffect(() => {
        if(!query.id) {
            return 
        }

        axios.get("/api/blog/?id=" + query.id)
            .then(res => {
                setArticle(res.data)
            })
    }, [query])
    if(!article) {
        return <Spinner />      
    }
    return (
        <div className={styles.blogContainer}>
            <img className={styles.titleImg} src={article.title_photo}/>
            <h1>{article.title}</h1>
            <div className={styles.byLine}>
                <div>
                    <img src={article.author.photo} alt="" />
                </div>
                <div>
                    <h4>{article.author.name}</h4>
                    <p>{new Date(article.modified).toDateString()}</p>
                </div>
            </div>
            <div className={styles.articleContent}>
                <ReactMarkdown>{article.content}</ReactMarkdown>
            </div>
        </div>
    )
}