import axios from 'axios'


const authAxiosInstance = axios.create({})


authAxiosInstance.interceptors.request.use(async config =>{
    let token = 'Token ' 
    // TODO reduce requests using local storage cache and cache invalidation
    const resp = await (await axios.get('http://localhost:5000/base/current-user-token')).data.token
    config.headers.Authorization = token + resp
    return config
})

authAxiosInstance.interceptors.response.use( resp =>{
    return resp
}, err =>{
    console.log('There was an error processing your request.')
    console.error(err)
    throw err
})

authAxiosInstance.defaults.xsrfCookieName = "csrftoken";
authAxiosInstance.defaults.xsrfHeaderName = "X-CSRFTOKEN";


export default authAxiosInstance