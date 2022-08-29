import axios from "../../utils/auth"

export default async function category(req, res) {
    const data = await axios.get(`${process.env.HOST}faq/`)
    return res.status(200).json( data.data)
}