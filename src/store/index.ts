import { create } from 'zustand'
import { TaskSlice, createTasksSlice } from './slices/tasks'
import { EventsSlice, createEventsSlice } from './slices/task_events'

export const useStore = create<
  TaskSlice &
  EventsSlice
>()((...a) => ({
  ...createTasksSlice(...a),
  ...createEventsSlice(...a)
}))
