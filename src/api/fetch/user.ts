import axios from 'axios'

export const checkAuth = async() => {
  try {
    const token = localStorage.getItem('access_token')
    let res = null 
    if (token) {
      res = await axios.get(`${import.meta.env.VITE_DIVVIUP_CLIENT}/user/check`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      if (res.status === 200) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}` 
        return true
      }
      return false
    }
    return false
  } catch (err) {
    console.log("🚀 ~ fetchTasks ~ err:", err)
  }
}

export const login = async(username: string, password: string) => {
  try {
    const res = await axios.post(`${import.meta.env.VITE_DIVVIUP_CLIENT}/user/login`, {
      username,
      password
    })
    axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}` 
    localStorage.setItem('access_token', res.data.token)
    return true
  } catch (err) {
    console.log("🚀 ~ login ~ err:", err)
    return false
  }
}