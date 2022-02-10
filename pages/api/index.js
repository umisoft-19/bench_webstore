import axios from '../../utils/auth'

export default async function index(req, res) {
    const data = await axios.get(`http://localhost:5000/web-api/bench/index/`)
    return res.status(200).json( data.data)
}