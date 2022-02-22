import Head from "next/head"
import Image from "next/image"
import styles from "../styles/Index.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {useState, useEffect} from "react"
import DepartmentCard from "../components/department_card"
import axios from "axios"
import Card from "../components/product"
import Link from "next/link"
import Spinner from "../components/spinner"


export default function Home() {
  const [departments, setDepartments] = useState([])
  const [featured, setFeatured] = useState([])
  const [results, setResults] = useState([])
  const [data, setData] = useState(null)

  useEffect(() => {
    axios.get("/api/")
            .then(res => {
              console.log(res.data)
                setDepartments(res.data.departments)
                setFeatured(res.data.featured_items)
                setData(res.data.settings)
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
        setResults(res.data)    
    })
  }


  if(departments.length == 0) {
    return <Spinner />
  }

  return (
    <div >
      <Head>
        <title>Webstore</title>
        <meta name="description" content="This is your webstore" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className={styles.section} >
        <div 
          style={{backgroundImage: `url(${data ? data.home_page_background_image : ""})`}}
          className={styles.heroContainer}
        >
        <div className={styles.hero} >
          <h1>{data ? data.home_page_title : ""}</h1>
          <p>{data ? data.home_page_slogan : ""}</p>
          <div className={styles.search}>
            <input 
              type="text"
              placeholder="Search..."
              onChange={evt => search(evt.target.value)}
            />
            <button>
              <FontAwesomeIcon icon="search" />
            </button>
            {results.length > 0
              ? <div className={styles.results}>
                  {results.map((res, i) => (
                    <div className={styles.result} key={i}>
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
