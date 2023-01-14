const apiURL =  `http://localhost:6001`

const deliveryApi = {
    getCategories: async ()=> {
        const response = await fetch(`http://localhost:6001/categories`)
        const json = response.json()
        return json
    }
}

export default deliveryApi