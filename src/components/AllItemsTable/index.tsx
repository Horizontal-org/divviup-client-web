import { FunctionComponent, Key, useCallback } from "react";
import { Button, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import { get } from "lodash";
import { Task as InterfaceTask, Task } from "../../api/domain/Task";
import { useStore } from "../../store";


interface Props {
  onSelect: (task: Task) => void
}


const columns = [
  {
    key: "name",
    label: "NAME",
  },
  {
    key: "DivviUpId",
    label: "ID",
  },
  {
    key: "vdaf.type",
    label: "TYPE",
  },
  {
    key: "actions",
    label: "ACTIONS",
  },
];



export const AllItemsTable:FunctionComponent<Props> = ({onSelect}) => {
  const { tasks, fetchTasks, loadingTasks, addToCollector, removeFromCollector } = useStore()


  const renderCell = useCallback((item: InterfaceTask, columnKey: Key) => {
    const cellValue = get(item, columnKey + '')

    switch (columnKey) {
      case "actions":
        return (
          <div className="flex items-center">
            <div className="pr-4">
              <Button 
                color="primary"
                variant="ghost"
                onPress={() => {
                  onSelect(item)
                }}
              >
                Show data
              </Button>  
            </div>
            <Button 
              color="primary"
              variant="light"
              onPress={() => {
                if (item.starred) {
                  removeFromCollector(item.id)
                } else {
                  addToCollector(item.id)
                }
              }}
            >
              {item.starred ? "Remove from Collector" : "Add to Collector"}
            </Button>
          </div>
        )
      default:
        return cellValue
    }
  }, [])

  
  return (

    <div>
      <div className="py-4 flex items-center">
        <h1 className="text-xl pr-4">All tasks</h1>
        <div >
          <Button
            isLoading={loadingTasks} 
            color="primary"
            onPress={fetchTasks}
          >
            Re-Sync
          </Button>
        </div>
      </div>

      <Table 
      >      
        <TableHeader columns={columns}>
          {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
        </TableHeader>
        <TableBody 
          items={tasks}
          emptyContent={loadingTasks ? "Loading..." : 'No content'}
        >
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}