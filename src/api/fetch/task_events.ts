import axios from 'axios'

export const fetchTasksEvents = async(taskId: string) => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_DIVVIUP_CLIENT}/task/events?id=${taskId}`)
    return res.data
  } catch (err) {
    console.log("🚀 ~ fetchTasks ~ err:", err)
  }
}