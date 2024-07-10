import axios from 'axios'  

const Axios = axios.create({ 
    baseURL: import.meta.env.DEV === true 
        ? "http://localhost:3000/" 
        : "DEPLOYMENT ADDRESS", 
        timeout: 50000

})

export default Axios