import { StateCreator } from "zustand"
import { TaskJob } from "../../api/domain/TaskJob"
import { fetchJobs } from "../../api/fetch/jobs"

export interface JobsSlice {
  loadingJobs: boolean,
  jobs: TaskJob[],
  fetchJobs: () => void
}

export const createJobsSlice: StateCreator<
  JobsSlice,
  [],
  [],
  JobsSlice
> = (set) => ({
  jobs: [],
  loadingJobs: false,
  fetchJobs: async() => {
    set({loadingJobs: true})
    const res = await fetchJobs()
    console.log("🚀 ~ fetchJobs:async ~ res:", res)
    set({
      loadingJobs: false,
      jobs: res
    })
  }
})
