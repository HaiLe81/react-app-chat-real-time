import {messagedStatus} from '../../constants'
import { axios } from "../../configs"

const route = '/auth' 
const loginPath = '/login'
const login = async (username, password) => {
    return new Promise((resolve, reject) => {
        axios({
            method: "post",
            url: route + loginPath,
            data: {
                username, password
            }
        }).then(res => resolve({ user: res.data.user, token: res.data.token, message: "Login Success!", status: messagedStatus.success}))
        .catch(error => {
            const message = error.response?.data?.message || error.message || 'login failed'
            reject({ message: message, status: messagedStatus.error })
        })
    })
}

export {login, route, loginPath}