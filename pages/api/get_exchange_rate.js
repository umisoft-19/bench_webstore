import axios from "../../utils/auth"

export default async function get_exchange_rate(req, res) {
    const data = await axios({
        url: `${process.env.HOST}get-exchange-rate/`,
        method: "GET",
        params: req.query
    })
    return res.status(200).json( data.data)
}