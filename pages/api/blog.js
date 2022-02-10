import axios from '../../utils/auth'

export default async function departments(req, res) {
    let data
    if(![undefined, 'undefined'].includes(req.query.id )) {
        data = await axios.get(`http://localhost:5000/web-api/bench/blog/${req.query.id}`)
    } else {
        data = await axios.get("http://localhost:5000/web-api/bench/blog/")
    }
    
    return res.status(200).json( data.data)
}