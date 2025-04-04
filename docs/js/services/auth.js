import { API_URL } from "./apiConfig"

const login = async (username, password) => {
    const url = `${API_URL}/auth/login`
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
              },
            body: JSON.stringify({
                username: username,
                password: password
            })
            
        })
        const data = await response.json()
        return data
    } catch (error) {
        console.log(error)
    }
}

export{login}