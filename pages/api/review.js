import axios from "../../utils/auth"
import  { getCookie } from "cookies-next"

export default async function review(req, res) {
    let data
    const token = getCookie("token", {req, res})
    data = await axios({
        method: "POST",
        headers: {
            "Authorization": token
        },
        url:`${process.env.HOST}review-product/`,
        params: req.query
    })
    
    return res.status(200).json({data: "data"})
}