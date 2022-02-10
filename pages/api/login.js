import axios from '../../utils/auth'
import  { setCookies } from 'cookies-next'

export default async function login(req, res) {
    
    const data = await axios.post( `http://localhost:5000/web-api/bench/login/`, req.query)
    if(data.data && data.data.token) {
        setCookies('token', `Token ${data.data.token}`, { req, res, maxAge: 60 * 60});
    }

    return res.status(200).json(data.data)
}