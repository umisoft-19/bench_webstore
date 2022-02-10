import styles from '../styles/about.module.css'
import {useState, useEffect} from 'react'
import axios from 'axios'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import ReactMarkdown from 'react-markdown'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


export default  function About(props) {
    const [data, setData] = useState(null)
    const [location, setLocation] = useState([-17.8216, 31.0492])
    const Map = dynamic(
        () => import('../components/map'), 
        { ssr: false } 
    )
    useEffect(() => {
        axios.get("/api/about/")
            .then(res => {
                console.log(data)
                setData(res.data)
                if(res.data.business_gps) {
                    const split = res.data.business_gps.split(",")
                    if(split.length == 2) {
                        setLocation(split)
                    }
                }
            })
    }, [])

    if(!data) {
        return <p>Loading...</p>
    }
    return (
        <div>
            <Head>
            <link 
              rel="stylesheet" 
              href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
              integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
              crossorigin=""
            />
            </Head>
            <h1>About Us</h1>
            <div className={styles.container}>
                <div>
                    <h2 className='text-center'>{data.company.name}</h2>
                    <hr />
                    {data.about_page_image ? <img src={data.about_page_image} /> :null}
                    <ReactMarkdown>{data.about_page_text}</ReactMarkdown>
                </div>
                <div>
                    <h3><FontAwesomeIcon icon="home"/> Address</h3>
                    <Map long={location[0]} lat={location[1]}/>
                    <p style={{whiteSpace:'pre'}}>{data.company.address}</p>
                    <h3>Contact</h3>
                    <h5><FontAwesomeIcon icon="at"/> Email</h5>
                    <span>{data.company.email}</span>
                    <h5><FontAwesomeIcon icon="phone"/> Phone</h5>
                    <span>{data.company.telephone}</span>
                </div>
            </div>
        </div>
    )
}