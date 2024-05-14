import axios from "axios"


export const fetchTasks = async() => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_DIVVIUP_CLIENT}/task/sync`)
    return res.data
  } catch (err) {
    console.log("🚀 ~ fetchTasks ~ err:", err)
  }
}

export const addToCollector = async(taskId: string) => {
  try {
    const res = await axios.post(`${import.meta.env.VITE_DIVVIUP_CLIENT}/taskjob/add`, {
      "task_id": taskId
    })
    return res.data
  } catch (err) {
    console.log("🚀 ~ fetchTasks ~ err:", err)
  }
}

export const removeFromCollector = async(taskId: string) => {
  try {
    const res = await axios.post(`${import.meta.env.VITE_DIVVIUP_CLIENT}/taskjob/delete`, {
      "task_id": taskId
    })
    return res.data
  } catch (err) {
    console.log("🚀 ~ fetchTasks ~ err:", err)
  }
}

export const runManually = async(taskId: number, divviupId: string, type: string) => {
  try {
    const res = await axios.post(`${import.meta.env.VITE_DIVVIUP_CLIENT}/collector/manual`, {
      "task_id": taskId,
      "divviup_id": divviupId,
      "type": type
    })
    return res.data
  } catch (err) {
    console.log("🚀 ~ runManually ~ err:", err)    
  }
}