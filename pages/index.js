import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Index.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {useState, useEffect} from 'react'
import DepartmentCard from '../components/department_card'
import axios from 'axios'
import Card from '../components/product'
import Link from 'next/link'

export default function Home() {
  const [departments, setDepartments] = useState([])
  const [featured, setFeatured] = useState([])
  const [results, setResults] = useState([])

  useEffect(() => {
    axios.get("/api/")
            .then(res => {
                setDepartments(res.data.departments)
                setFeatured(res.data.featured_items)
            })
  }, [])

  const search = (val) => {
    if(!val || val.length < 3) {
      setResults([])
      return
    }
    axios({
      url: "/api/search", 
      params: {name__icontains: val}
    }).then(res => {
        console.log(res)
        setResults(res.data)    
    })
  }

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
            <input 
              type="text"
              placeholder='Search...'
              onChange={evt => search(evt.target.value)}
            />
            <button>
              <FontAwesomeIcon icon="search" />
            </button>
            {results.length > 0
              ? <div className={styles.results}>
                  {results.map(res => (
                    <div className={styles.result}>
                        <div>
                          <img src={res.img} />
                        </div>
                        <div>
                          <Link href={`/product/${res.id}`}><h4>{res.name} </h4></Link>
                          <p>{res.description}</p>
                        </div>
                    </div>
                  ))}
                </div>
              : null
            }
            
          </div>
        </div>
        <h2>Departments</h2>
        <div className={styles.departmentCards}>
          {departments.map(dept => <DepartmentCard key={dept.id} {...dept} />)}
        </div>
      </section>
      <section className={styles.section}>
        <h2>Featured Items</h2>
        <div className={styles.productList}>
          {featured.map(p => <Card key={p.name} {...p}/>)}
        </div>
      </section>
      
      

      
    </div>
  )
}
