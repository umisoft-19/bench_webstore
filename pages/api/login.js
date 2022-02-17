import axios from "../../utils/auth"
import  { setCookies } from "cookies-next"

export default async function login(req, res) {
    
    const data = await axios.post( `${process.env.HOST}login/`, req.query)
    if(data.data && data.data.token) {
        setCookies("token", `Token ${data.data.token}`, { req, res, maxAge: 60 * 60});
    } else {
        return res.status(200).json({"error": "Could not get token"})
    }

    return res.status(200).json(data.data)
}