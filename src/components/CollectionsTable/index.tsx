import { FunctionComponent, Key, useCallback } from "react";
import { Button, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import { get } from "lodash";
import { TaskJob as InterfaceTaskJob } from "../../api/domain/TaskJob";
import { useStore } from "../../store";
import cronstrue from 'cronstrue'
import { enqueueSnackbar } from "notistack";
import { runManually } from "../../api/fetch/tasks";

interface Props {}


const columns = [
  {
    key: "task_name",
    label: "NAME",
  },
  {
    key: "task_type",
    label: "Type",
  },  
  {
    key: "cron",
    label: "Cron",
  },  
  {
    key: "actions",
    label: "ACTIONS",
  },
];



export const CollectionsTable:FunctionComponent<Props> = () => {
  const { jobs, loadingJobs, tasks} = useStore()

  const renderCell = useCallback((item: InterfaceTaskJob, columnKey: Key) => {
    const cellValue = get(item, columnKey + '')

    switch (columnKey) {
      case "actions":
        return (
          <Button 
            color="primary"
            variant="light"
            onPress={async() => {
              console.log(item)
              enqueueSnackbar('Running collector manually')
              await runManually(item.task_id, item.divviup_id, item.task_type)
              enqueueSnackbar('Collector runned')
            }}
          >
            Run manually
          </Button>
        )
      case "cron":
        return cronstrue.toString(item.cron)
      default:
        return cellValue
    }
  }, [])

  
  return (

    <div>
      <Table 
        hideHeader={true}
        removeWrapper={false}
      >
        <TableHeader columns={columns}>
          {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
        </TableHeader>
        <TableBody 
          items={jobs}
          emptyContent={loadingJobs ? 'Loading...' : 'No tasks to collect'}
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