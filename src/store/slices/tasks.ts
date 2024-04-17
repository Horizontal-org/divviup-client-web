import { StateCreator } from "zustand"
import { Task } from "../../api/domain/Task"
import { fetchTasks } from "../../api/fetch/tasks"

export interface TaskSlice {
  loadingTasks: boolean,
  tasks: Task[],
  fetchTasks: () => void
}

export const createTasksSlice: StateCreator<
TaskSlice,
  [],
  [],
  TaskSlice
> = (set) => ({
  tasks: [],
  loadingTasks: false,
  fetchTasks: async() => {
    set({loadingTasks: true})
    const res = await fetchTasks()
    set({
      loadingTasks: false,
      tasks: res
    })
  }
})
