import styles from '../styles/components.module.css'
import Link from 'next/link'


export default function Card(props)  {
    return (
        <div className={styles.card}>
            <div className={styles.cardImg}>
                {props.img 
                    ? <img src={props.img}/> 
                    : null}
            </div>
            <div className={styles.cardBody}>
                
                <h5><Link href={`/product/${props.id}`}>{props.name}</Link></h5>
                <p>{props.description}</p>
            </div>
        </div>
    )
}