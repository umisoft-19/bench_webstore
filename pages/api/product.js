import axios from '../../utils/auth'

export default async function product(req, res) {
    const data = await axios.get(`${process.env.HOST}product/${req.query.id}`)
    return res.status(200).json( data.data)
}