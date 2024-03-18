import { cookies } from "next/headers";

export default function getCookie() {
    const token = cookies().get("token")
    if (token) {
        return token.value
    } else {
        return ""
    }
}