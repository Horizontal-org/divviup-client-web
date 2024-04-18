import axios from "axios"


export const fetchJobs = async() => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_DIVVIUP_CLIENT}/taskjob/`)
    return res.data
  } catch (err) {
    console.log("🚀 ~ fetchTasks ~ err:", err)
  }
}
