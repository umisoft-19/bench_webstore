import axios from "../../utils/auth"

export default async function departments(req, res) {
    let data
    
    if(![undefined, "undefined"].includes(req.query.id )) {
        data = await axios.get(`${process.env.HOST}department/${req.query.id}`)
    } else {
        data = await axios.get(`${process.env.HOST}department/`)
    }
    
    return res.status(200).json( data.data)
}