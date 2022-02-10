import Input from '../components/input'
import formStyles from '../styles/forms.module.css'
import Link from 'next/link'
import {useReducer, useEffect} from 'react'
import {useRouter} from 'next/router'
import axios from 'axios'

const reducer = (state, action) => {
    const newState = {...state}
    newState[action.field] = action.value
    return newState
}

export default  function Login(props) {
    const [state, dispatch] = useReducer(reducer, {
        username: "",
        password: ""
    })
    const router = useRouter()

    const submit = () => {
        console.log("submit")
        axios({
            url: "/api/login",
            method: "GET",
            params: state
        }).then(res => {
            router.push('/account/')
        }).catch(err => {
            alert("Failed to authenticate user.")
        })
    }

    return (
        <div className={formStyles.container}>
            <div className={formStyles.card}>
                <h1>Sign In</h1>
                <Input 
                    label="Username"
                    name="username"
                    type="text"
                    value={state.username}
                    handler={(val) => dispatch({field: "username", value: val})}
                />
                <Input 
                    label="Password"
                    name="password"
                    type="text"
                    value={state.password}
                    handler={(val) => dispatch({field: "password", value: val})}
                />
                <p>Don't have an account? <Link href="/sign_up"><b>Sign Up</b></Link></p>
                <button
                    className={formStyles.button}
                    onClick={submit}
                >
                    Login
                </button>
            </div>
        </div>
    )
}