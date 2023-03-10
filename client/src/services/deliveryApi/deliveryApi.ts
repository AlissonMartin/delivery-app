import qs from 'qs'
const apiURL =  `http://localhost:6001`

const deliveryApi = {
    getCategories: async ()=> {
        const response = await fetch(`${apiURL}/categories`)
        const json = response.json()
        return json
    },
    getRestaurants: async (params?:{q: string,cat:string, offset:number, limit:number})=> {
        const response = await fetch(`${apiURL}/restaurants?${qs.stringify(params)}`)
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
    },
    userSignUp: async (params: {firstName: string, lastName: string, email: string, password: string, state:string, city:string, district:string, street:string, number:string})=> {
        const body = params
        console.log(body)
        const response = await fetch(`${apiURL}/user/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        const json = await response.json()
        return json
    },
    getRestaurant: async (id:string)=> {
        const response = await fetch(`${apiURL}/restaurant/${id}`)
        const json = await response.json()
        return json
    },
    userRefresh: async ()=> {
        const response = await fetch(`${apiURL}/user/refresh`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            refreshToken: localStorage.getItem('refreshToken')
          })
        })
        const json = await response.json()
          
              if (json) {
                window.sessionStorage.setItem("token", json.token)
                
              }
        },
        userInfo: async (token:string)=> {
            const response = await fetch(`${apiURL}/user/me`, {
                method: 'GET',
                headers: new Headers({
                    'Authorization' : `Bearer ${token}`
                })
            })
            const json = await response.json()
            return json
          },
        userEdit: async (body:FormData, token:string)=> {
            const response = await fetch(`${apiURL}/user/me`, {
                method: 'PUT',
                headers: new Headers({
                    'Authorization' : `Bearer ${token}`
                }),
                body
            })
        }
    }

export default deliveryApi