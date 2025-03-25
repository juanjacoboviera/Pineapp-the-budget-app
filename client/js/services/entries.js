
const createEntry = async (entry, token) => {
    const url = "http://localhost:3000/entry/createEntry"
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            body: JSON.stringify({entry})
        });
        const data = await response.json()
        console.log(data)
    } catch (error) {
        throw({
            message: 'There was an error!',
            error: error
        })
    }
}

export{createEntry}