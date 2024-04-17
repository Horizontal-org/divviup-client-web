import { FunctionComponent, Key, useCallback, useEffect } from "react";
import Wrapper from "../components/Wrapper";
import { useStore } from "../store";
import { Button, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import { get } from 'lodash'
import { Task as InterfaceTask } from "../api/domain/Task";

interface Props {}


const columns = [
  {
    key: "name",
    label: "NAME",
  },
  {
    key: "id",
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


export const Main: FunctionComponent<Props> = () => {
  const { fetchTasks, tasks, loadingTasks } = useStore()

  useEffect(() => {


    // setInterval(async() => {
    //   if (window.divviup) {
    //     const task = new window.divviup.dap.Task({
    //       type: "count",
    //       id: "19tPTIP7gYq2mcDvyq62aUGg_PSWB17QDvaVbGb5tFI",
    //       leader: "https://dap-07-1.api.divviup.org/",
    //       helper: "https://helper-dap-09.shira.app/",
    //       timePrecisionSeconds: 60
    //     });
        
    //     await task.sendMeasurement(true);
    //     console.log('sent;')
    //   }

    // }, 1000)

    fetchTasks()  
  }, [])

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
            Collector info
          </Button>
        )
      default:
        return cellValue
    }
  }, [])

  return (
    <Wrapper>
      <div className="flex items-center">
        <h1 className="text-xl">Tasks</h1>

        <div className="p-unit-md">
          <Button
            isLoading={loadingTasks} 
            color="primary"
            onPress={fetchTasks}
          >
            Refresh
          </Button>
        </div>

      </div>

      <div>
        <Table aria-label="Example table with dynamic content">
          <TableHeader columns={columns}>
            {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
          </TableHeader>
          <TableBody items={tasks}>
            {(item) => (
              <TableRow key={item.id}>
                {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
              </TableRow>
            )}
          </TableBody>
        </Table>

      </div>

    </Wrapper>
  )
}