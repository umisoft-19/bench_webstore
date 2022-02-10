import {useEffect, useState} from "react"
import axios from "axios"
import Link from "next/link"
import styles from "../styles/components.module.css"


export default function DepartmentList (props) {
    const [departments, setDepartments] = useState([])
        useEffect(() => {
            axios.get("/api/department/?summary=True")
                    .then(res => {
                        setDepartments(res.data)
                    })
    }, [])
    
    return (<div>
        <ul className={styles.departmentList}>
           {departments.map(dept => (
               <li key={dept.name}>
                   <Link href={"/department/" + dept.id}>{dept.name}</Link>
                   <ul className={styles.categoryList}>
                       {dept.categories.map(cat => (
                           <li key={cat.name}><Link href={`/category/${cat.id}/`}>{cat.name}</Link></li>
                       ))}
                   </ul>
               </li>
           ))}
        </ul>
    </div>)
}