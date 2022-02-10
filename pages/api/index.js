import axios from '../../utils/auth'

export default async function index(req, res) {
    const data = await axios.get(`${process.env.HOST}index/`)
    return res.status(200).json( data.data)
}