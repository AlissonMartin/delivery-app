const apiURL =  `http://localhost:6001`

const deliveryApi = {
    getCategories: async ()=> {
        const response = await fetch(`${apiURL}/categories`)
        const json = response.json()
        return json
    },
    getRestaurants: async ()=> {
        const response = await fetch(`${apiURL}/restaurants`)
        const json = response.json()
        return json
    },
    userLogin: async (email:string, password:string)=> {
        const body = {email, password}
        const response = await fetch(`${apiURL}/user/signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        const json = await response.json()
        return json
    }
}

export default deliveryApi