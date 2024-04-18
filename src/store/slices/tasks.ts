import { StateCreator } from "zustand"
import { Task } from "../../api/domain/Task"
import { fetchTasks, addToCollector, removeFromCollector } from "../../api/fetch/tasks"
import { enqueueSnackbar } from "notistack"
import { fetchJobs } from "../../api/fetch/jobs"
import { TaskJob } from "../../api/domain/TaskJob"

export interface TaskSlice {
  loadingTasks: boolean,
  loadingJobs: boolean
  tasks: Task[],
  starred: Task[]
  fetchTasks: () => void
  addToCollector: (taskId: string) => void
  removeFromCollector: (taskId: string) => void
  jobs: TaskJob[],
  fetchJobs: () => void
}

export const createTasksSlice: StateCreator<
TaskSlice,
  [],
  [],
  TaskSlice
> = (set) => ({
  tasks: [],
  starred: [],
  loadingTasks: false,
  fetchTasks: async() => {
    set({loadingTasks: true})
    const res = await fetchTasks()
    set({
      loadingTasks: false,
      starred: res.filter((r: Task) => !!(r.starred)),
      tasks: res
    })
  },
  addToCollector: async(taskId) => {
    set({loadingTasks: true})
    const res = await addToCollector(taskId)
    const jobs = await fetchJobs() 
    enqueueSnackbar("Added to collector")
    set({
      loadingTasks: false,
      tasks: res,
      jobs: jobs,
      starred: res.filter((r: Task) => !!(r.starred))
    })
  },
  removeFromCollector: async(taskId) => {
    set({loadingTasks: true})
    const res = await removeFromCollector(taskId)
    const jobs = await fetchJobs() 
    enqueueSnackbar("Removed from collector")
    set({
      loadingTasks: false,
      tasks: res,
      jobs: jobs,
      starred: res.filter((r: Task) => !!(r.starred))
    })
  },
  // JOBS
  jobs: [],
  loadingJobs: true,
  fetchJobs: async() => {
    set({loadingJobs: true})
    const res = await fetchJobs()
    console.log("🚀 ~ fetchJobs:async ~ res:", res)
    set({
      jobs: res,
      loadingJobs: false
    })
  }
})
