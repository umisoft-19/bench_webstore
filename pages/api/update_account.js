import axios from "../../utils/auth"
import  { getCookie } from "cookies-next"



export default async function update_account(req, res) {
    let data
    try {
        const token = getCookie("token", {req, res})
        data = await axios({
            method: "POST",
            headers: {
                "Authorization": token
            },
            url:`${process.env.HOST}update-account/`,
            params: req.query
        })
    } catch(err) {
        return res.status(200).json({"error": "Could not authenticate"})
    }
    
    return res.status(200).json(data.data)
}