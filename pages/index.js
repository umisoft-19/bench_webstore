import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Index.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {useState, useEffect} from 'react'
import DepartmentCard from '../components/department_card'
import axios from 'axios'


export default function Home() {
  const [departments, setDepartments] = useState([])
  useEffect(() => {
    axios.get("/api/department/?summary=True")
            .then(res => {
                setDepartments(res.data)
            })
  }, [])

  return (
    <div >
      <Head>
        <title>Webstore</title>
        <meta name="description" content="This is your webstore" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className={styles.section}>
        <div className={styles.hero}>
          <h1>Welcome To <br /> Your store</h1>
          <p>Here's a slogan</p>
          <div className={styles.search}>
            <FontAwesomeIcon icon="search" />
            <input type="text" name="" id="" placeholder='Search store...'/>
          </div>
        </div>
        <h2>Departments</h2>
        <div className={styles.departmentCards}>
          {departments.map(dept => <DepartmentCard key={dept.id} {...dept} />)}
        </div>
      </section>
      <section className={styles.section}>
        <h2>Featured Items</h2>
        
      </section>
      
      

      
    </div>
  )
}
