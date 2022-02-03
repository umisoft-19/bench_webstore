import axios from '../../utils/auth'

export default async function product(req, res) {
    const data = await axios.get(`http://localhost:5000/web-api/bench/product/${req.query.id}`)
    return res.status(200).json( data.data)
}