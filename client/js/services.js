const login = async (username, password) => {
    const url = "http://localhost:3000/auth/login"
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