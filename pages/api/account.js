import axios from "../../utils/auth"
import  { getCookie } from "cookies-next"



export default async function login(req, res) {
    let data
    try {
        const token = getCookie("token", {req, res})
        
        data = await axios({
            method: "GET",
            headers: {
                "Authorization": token
            },
            url:`${process.env.HOST}account/`,
        })
    } catch(err) {
        return res.status(200).json({"error": "Could not authenticate"})
    }
    return res.status(200).json(data.data)
}