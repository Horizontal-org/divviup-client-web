import { StateCreator } from "zustand"
import { fetchTasks } from "../../api/fetch/tasks"
import { enqueueSnackbar } from "notistack"
import { TaskEvent } from "../../api/domain/TaskEvent"
import { fetchTasksEvents } from "../../api/fetch/task_events"
import { Task } from "../../api/domain/Task"

export interface EventsSlice {
  loadingEvents: boolean
  events: TaskEvent[]
  consolidated: string
  fetchEvents: (task: Task) => void  
}


const aggregateEvents = (events: TaskEvent[], task: Task) => {
  let consolidatedNumber = ''

  if (task.vdaf.type === 'count') {
    const eventsSum = events.reduce((a, c) => {
      let aux = 0
      if (c.value && c.value.length > 0) {
        aux = parseInt(c.value)
      }
      return a + aux
    }, 0) 
    consolidatedNumber = eventsSum + ''
  }

  if (task.vdaf.type === 'sum' || task.vdaf.type === 'histogram') {
    const sortedEvents = events.sort(function(a,b){      
      return new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
    });

    sortedEvents.forEach((se) => {
      if (se.value && se.value.length > 0) {
        consolidatedNumber = se.value
      }
    })
  }
 
  return consolidatedNumber + ''
}

export const createEventsSlice: StateCreator<
  EventsSlice,
  [],
  [],
  EventsSlice
> = (set) => ({
  events: [],
  consolidated: '',
  loadingEvents: false,
  fetchEvents: async(task: Task) => {
    set({loadingEvents: true})
    const res = await fetchTasksEvents(task.id)
    set({
      consolidated: aggregateEvents(res, task),
      loadingEvents: false,
      events: res
    })
  },
})
