import Input from "../components/input"
import styles from "../styles/account.module.css"
import {useEffect, useState, useReducer} from "react"
import axios from "axios"
import { useRouter } from "next/router"
import Context from "../utils/context"
import Spinner from "../components/spinner"
import Modal from "../components/modal"


const reducer = (state, action) => {
    if(action.type === "input") {
        const newState = {...state}
        newState[action.name] = action.value
        return newState
    }
    if(action.type === "initial") {
        const newState = {...state, ...action.value}
        return newState
    }

}


const  Account = (props) => {
    const [account, setAccount] = useState(null)
    const [state, dispatch ] = useReducer(reducer, {})
    const [error, setError] = useState("")
    const [showModal, setShowModal] = useState(false)
    const router = useRouter()

    useEffect(()=> {
        axios.get("/api/account")
            .then(res => {
                if (res.data.error) {
                    router.push("/login")
                } else {
                    if(res.data.length > 0) {
                        const data = res.data[0]
                        const [first_name, last_name] = data.customer_name.split(" ")
                        dispatch({type: "initial", value: {
                            address: data.billing_address,
                            phone: data.phone_1,
                            email: data.email,
                            first_name: first_name,
                            last_name: last_name,
                            account: data.id
                        }})
                        setAccount(data)
                        props.setAccountDetails(data)
                    }
                }

            })
    }, [])

    const submit = () => {
        axios({
            url: "/api/update_account",
            method: "GET",
            params: state
        }).then(res => {
            if(res.data.error) {
                setError(res.data.error)
            } else {
                setError("Updated Account Successfully.")
            }   
            setShowModal(true)
        }).catch(err => {
            setError("Failed to update Account")
            setShowModal(true)
        })
    }

    if(!account) {
        return <Spinner />
      }

    return (
        <div>
            <Modal 
                title="Account Update"
                content={error}
                show={showModal}
                dismiss={() => {setError(""); setShowModal(false)}}
            />
            <h1>My Account</h1>
            <div className={styles.container}>
                <div className={styles.right}>
                    <button 
                        className="btn teal-button"
                        onClick={submit}
                    >
                        Update Details
                    </button>
                </div>
                <div className={styles.row}>
                    <div className={styles.card}>
                        <div className={styles.cardBody}>
                            <Input 
                                label="First Name"
                                value={state.first_name}
                                handler={val => dispatch({type: "input", name: "first_name", value: val})}
                            />
                            <Input 
                                label="Last Name"
                                value={state.last_name}
                                handler={val => dispatch({type: "input", name: "last_name", value: val})}
                            />
                            <Input 
                                label="Email"
                                value={state.email}
                                handler={val => dispatch({type: "input", name: "email", value: val})}
                            />
                            <Input 
                                label="Phone"
                                value={state.phone}
                                handler={val => dispatch({type: "input", name: "phone", value: val})}
                            />
                        </div>
                    </div>
                    <div className={styles.card}>
                        <div>
                            <Input 
                                label="Address"
                                type="textarea"
                                value={state.address}
                                handler={val => dispatch({type: "input", name: "address", value: val})}
                            />
                        </div>
                    </div>
                </div>
                <div className={styles.card}>
                    <h4>My Orders</h4>
                    <div></div>
                </div>
            </div>
        </div>
    )
}


const AccountHOC = (props) => {
    return (
        <Context.Consumer>{context =>(
            <Account {...props} setAccountDetails={context.setAccountDetails} />
        )}</Context.Consumer>
    )
}

export default AccountHOC