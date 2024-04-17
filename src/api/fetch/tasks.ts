import axios from "axios"


export const fetchTasks = async() => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_DIVVIUP_CLIENT}/task/sync`)
    return res.data
  } catch (err) {
    console.log("🚀 ~ fetchTasks ~ err:", err)
  }
}