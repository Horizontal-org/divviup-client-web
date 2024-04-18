import { FunctionComponent, Key, useCallback } from "react";
import { Button, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import { get } from "lodash";
import { Task as InterfaceTask } from "../../api/domain/Task";
import { useStore } from "../../store";


interface Props {}


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



export const AllItemsTable:FunctionComponent<Props> = () => {
  const { tasks, fetchTasks, loadingTasks, addToCollector, removeFromCollector } = useStore()


  const renderCell = useCallback((item: InterfaceTask, columnKey: Key) => {
    const cellValue = get(item, columnKey + '')

    switch (columnKey) {
      case "actions":
        return (
          <Button 
            color="primary"
            variant="light"
            onPress={() => {
              console.log('do something')
              if (item.starred) {
                removeFromCollector(item.id)
              } else {
                addToCollector(item.id)
              }
            }}
          >
            {item.starred ? "Remove from Collector" : "Add to Collector"}
          </Button>
        )
      default:
        return cellValue
    }
  }, [])

  
  return (

    <div>
      <div className="pb-4">
        <Button
          isLoading={loadingTasks} 
          color="primary"
          onPress={fetchTasks}
        >
          Re-Sync
        </Button>
      </div>

      <Table 
        removeWrapper={true}
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