import axios from '../../utils/auth'

export default async function departments(req, res) {
    let data
    if(req.query.summary == 'True') {
        data = await axios.get("http://localhost:5000/web-api/bench/department/?summary=True")
    } else if(![undefined, 'undefined'].includes(req.query.id )) {
        data = await axios.get(`http://localhost:5000/web-api/bench/department/${req.query.id}`)
    } else {
        data = await axios.get("http://localhost:5000/web-api/bench/department/")
    }
    
    return res.status(200).json( data.data)
}