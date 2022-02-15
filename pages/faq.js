import {useState, useEffect} from "react"
import axios from "axios"
import styles from "../styles/faq.module.css"

const Question = (props) => {
    const [show, setShow] = useState(false)
    return (
        <li 
            className={show ? styles.answerVisible : styles.question}
            onClick={() => setShow(!show)}
        >
            <h4> <span className={styles.q}>Q</span> {props.question}</h4>
            <div> <span className={styles.a} >A</span> {props.answer}</div>
        </li>
    )
}


export default  function FAQ(props) {
    const [faqs, setFaqs]  = useState([])
    useEffect(() => {
        axios.get("/api/faq/")
            .then(res => {
                console.log(res)
                setFaqs(res.data)
            })
    }, [])
    return (
        <div>
            <h1>Frequently Asked Questions</h1>
            <div>
                {faqs.map(cat =>(
                    <div key={cat.name} className={styles.category}>
                        <h3>{cat.name}</h3>
                        <p>{cat.description}</p>
                        <ul>
                            {cat.faqitem_set.map((q, i)=> (
                                <Question {...q} key={i} />
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    )
}