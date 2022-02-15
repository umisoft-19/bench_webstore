import axios from "../../utils/auth"

export default async function departments(req, res) {
    
    const data = await axios({
        method: "GET",
        url: `${process.env.HOST}sign-up/`,
        params: req.query,
        // headers: {
        //     "X-CSRFTOKEN": resp.data.csrf
        // }
    })
     
    return res.status(200).json( data.data)
}