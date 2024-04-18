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



export const StarredTable:FunctionComponent<Props> = () => {
  const { starred, loadingTasks } = useStore()
  console.log("🚀 ~ starred:", starred)

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
      <Table 
        removeWrapper={true}
      >
        <TableHeader columns={columns}>
          {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
        </TableHeader>
        <TableBody items={starred}>
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