import axios from "../../utils/auth"

export default async function search(req, res) {
    const data = await axios({
        url: `${process.env.HOST}product/`, 
        params: req.query
    })
    return res.status(200).json( data.data)
}