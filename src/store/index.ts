import { create } from 'zustand'
import { TaskSlice, createTasksSlice } from './slices/tasks'

export const useStore = create<
  TaskSlice 
>()((...a) => ({
  ...createTasksSlice(...a),
}))
