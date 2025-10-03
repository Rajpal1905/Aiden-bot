const BASE_URL = "https://aiden-server.vercel.app/api/v1" 

export const endpoints = {
   LOGIN_API: BASE_URL + "/user/login",
   SIGNUP_API: BASE_URL + "/user/signup",
   VERIFY_TOKEN: BASE_URL+ "/user/check-auth"
}
export const chat = {
   CHAT_API : BASE_URL + "/chat/user-chat",
   ALL_CHAT : BASE_URL + "/chat/all-chat"

}
