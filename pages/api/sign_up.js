import axios from "axios"

export default async function sign_up(req, res) {
    
    const data = await axios({
        method: "GET",
        url: `${process.env.HOST}sign-up/`,
        params: req.query,
    })
    return res.status(200).json( data.data)
}