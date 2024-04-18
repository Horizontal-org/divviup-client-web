import { FunctionComponent, Key, useCallback } from 'react'
import { useStore } from '../../store'
import { Select, SelectItem, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'
import { get } from 'lodash'
import { TaskEvent as InterfaceTaskEvent } from "../../api/domain/TaskEvent";

interface Props {}


const columns = [
  {
    key: "value",
    label: "Value",
  },  
  {
    key: "error",
    label: "Error",
  },
  
  {
    key: "created_at",
    label: "Run at",
  },  
];


export const TaskDetails:FunctionComponent<Props> = () => {
  const { tasks, events, consolidated, loadingEvents, fetchEvents} = useStore()

  console.log("🚀 ~ events:", events)
  console.log("🚀 ~ consolidated:", consolidated)

  const renderCell = useCallback((item: InterfaceTaskEvent, columnKey: Key) => {
    const cellValue = get(item, columnKey + '')
    switch (columnKey) {      
      case "created_at":
        return new Date(item.created_at).toLocaleString()
      default:
        return cellValue
    }

  }, [])

  return (
    <div>
      <div className='flex items-center py-4'>
        <Select 
          variant={'bordered'}
          label="Select a task" 
          className="max-w-xs" 
          onChange={(e) => {
            const task = tasks.find(t => t.name === e.target.value)
            if (task) {
              fetchEvents(task)
            }
          }}
        >
          {tasks.map((t) => (
            <SelectItem key={t.name} value={t.name}>
              {t.name}
            </SelectItem>
          ))}
        </Select>
        
        { loadingEvents && (
          <div className='flex items-center'>
            <h1 className="text-l p-4">Loading</h1>
            <Spinner />
          </div>
        )}
      </div>
      
      
      { events && events.length > 0 && (
         <div>
    
          <div>
            <h1 className="text-l p-4">{`Total number: ${consolidated}`}</h1>
          </div>

          <Table>
            <TableHeader columns={columns}>
              {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
            </TableHeader>
            <TableBody 
              items={events}
              emptyContent={loadingEvents ? 'Loading...' : 'No tasks to collect'}
            >
              {(item) => (
                <TableRow key={item.id}>
                  {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}


