import styles from "../styles/components.module.css"
import Link from "next/link"

export default function Card(props)  {
    console.log(props)
    return (
        <div className={styles.card} style={{height: "fit-content"}}>
            {props.image 
                ? <img src={props.image}/> 
                : null}
            <div className={styles.cardBody} >
                
                <h4><Link href={"/department/" + props.id}>{props.name}</Link></h4>
                <ul>
                    {props.categories.map(cat => (
                        <li key={cat.id}><Link href={`/category/${cat.id}/`}>{cat.name}</Link></li>
                    ))}
                </ul>
            </div>
        </div>
    )
}