import Input from '../components/input'
import formStyles from '../styles/forms.module.css'
import Link from 'next/link'
import {useReducer, useEffect} from 'react'
import axios from 'axios'

const reducer = (state, action) => {
    const newState = {...state}
    newState[action.field] = action.value
    return newState
}

export default  function SignUp(props) {
    const [state, dispatch] = useReducer(reducer, {
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        repeat_password: ""
    })

    const submit = () => {
        console.log("submit")
        axios({
            url: "/api/sign_up",
            method: "GET",
            params: state
        })
    }
    return (
        <div className={formStyles.container}>
            <div className={formStyles.card}>
                <h1>Create Account</h1>
                <Input 
                    label="First Name"
                    name="first_name"
                    type="text"
                    value={state.first_name}
                    handler={(val) => dispatch({field: "first_name", value: val})}
                />
                <Input 
                    label="Last Name"
                    name="last_name"
                    type="text"
                    value={state.last_name}
                    handler={(val) => dispatch({field: "last_name", value: val})}
                />
                <Input 
                    label="Your Email Address"
                    name="email"
                    type="text"
                    value={state.email}
                    handler={(val) => dispatch({field: "email", value: val})}
                />
                <Input 
                    label="Password"
                    name="password"
                    type="text"
                    value={state.password}
                    handler={(val) => dispatch({field: "password", value: val})}
                />
                <Input 
                    label="Repeat Password"
                    name="repeat_password"
                    type="text"
                    value={state.repeat_password}
                    handler={(val) => dispatch({field: "repeat_password", value: val})}
                />
                <p>Already have an account? <Link href="/login"><b>Login</b></Link></p>
                <button 
                    className={formStyles.button}
                    onClick={submit}
                >
                    Sign Up
                </button>
            </div>
        </div>
    )
}