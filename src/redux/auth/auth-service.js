import {messagedStatus} from '../../constants'
import { axios } from "../../configs"

const route = '/auth' 
const loginPath = '/login'
const registerPath = "/register"
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

const register = async ({username, fullname, email, phone, password}) => {
    return new Promise((resolve, reject) => {
        axios({
            method: "post",
            url: route + registerPath,
            data: {
                username, fullname, phone, email, password
            }
        })
        .then(res => resolve({ message: "Register Success!", status: messagedStatus.success }))
        .catch(error => {
            const message = error.response?.data?.message || error.message || 'Register Failed!'
            reject({ message: message, status: messagedStatus.error })
        })
    })
}

export {login, route, loginPath, register, registerPath}