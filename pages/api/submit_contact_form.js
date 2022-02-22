import axios from "axios"

export default async function submit_contact(req, res) {
    
    const data = await axios({
        method: "GET",
        url: `${process.env.HOST}submit-contact-form/`,
        params: req.query,
    })
    return res.status(200).json( data.data)
}