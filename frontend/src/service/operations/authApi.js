
import { apiConnector } from "../apiConnector";
import { chat, endpoints} from '../apis'
import {toast} from 'react-hot-toast'

const {LOGIN_API,SIGNUP_API,VERIFY_TOKEN} = endpoints
const {CHAT_API,ALL_CHAT} = chat

export async function loginApi(email,password){

    try{
        const response  = await apiConnector("POST",LOGIN_API,{
            email,
            password
        } )
        console.log("LOGIN Api response-------> ",response)
        return response;
    }
    catch (error) {
        console.log("LOGIN API ERROR............", error)
      }
}

export async function signupApi(name,email,password){

    try{
        const response  = await apiConnector("POST",SIGNUP_API,{
            name,
            email,
            password
        } )
        console.log("LOGIN Api response-------> ",response)
        return response;
    }
    catch (error) {
        console.log("LOGIN API ERROR............", error)
      }
}

export async function check_auth_Status(){
    try{
        const response  = await apiConnector("GET",VERIFY_TOKEN)
        if(response.data.status !== true){
            return "Unable to verify token"
        }
        return response;
    }
    catch (error) {
        console.log("verify API ERROR............", error)
        toast.error("verification Failed")
      }
}

export async function sendChatRequest(message) {
    try {
        console.log('Sending message:', message);
        const {data} = await apiConnector('POST', CHAT_API, { message });

        if(data.success === false){
            return "Unable to fetch chat"
        }
        return data;
    } catch (error) {
        console.log("sendChatRequest API ERROR: ", error);
        toast.error("Send Chat Request Failed");
    }
}
export async function allChat() {
    try {
        const {data} = await apiConnector('GET', ALL_CHAT);

        if(data.success === false){
            return "Unable to fetch chat"
        }
        return data;
    } catch (error) {
        console.log("AllChat API ERROR: ", error);
        toast.error("Request Failed");
    }
}
