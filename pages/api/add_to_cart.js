import axios from '../../utils/auth'
import  { getCookie } from 'cookies-next'

export default async function add_to_cart(req, res) {
    let data
    const token = getCookie("token", {req, res})
    try {
        data = await axios({
            method: "POST",
            headers: {
                "Authorization": token
            },
            url:`http://localhost:5000/web-api/bench/add-to-cart/`,
            params: req.query
        })
    } catch(err) {
        // console.log(err)
        return res.status(200).json({"error": "Could not authenticate"})
    }
    return res.status(200).json({data: "data"})
}