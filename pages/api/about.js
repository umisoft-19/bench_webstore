import axios from '../../utils/auth'

export default async function about(req, res) {
    const data = await axios.get(`http://localhost:5000/web-api/bench/settings/1/`)
    return res.status(200).json( data.data)
}