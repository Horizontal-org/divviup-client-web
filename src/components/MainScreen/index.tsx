import { FunctionComponent, useEffect, useState } from "react";
import { useStore } from "../../store";
import { Task as InterfaceTask } from "../../api/domain/Task";
import { SelectedTask } from "../SelectedTask";
import { CollectionsTable } from "../CollectionsTable";
import { AllItemsTable } from "../AllItemsTable";

interface Props {}

export const MainScreen:FunctionComponent<Props> = () => {
  const { fetchTasks, fetchJobs, fetchEvents } = useStore()
  const [selected, onSelect] = useState<InterfaceTask | null>(null)


  useEffect(() => {
    // COUNT
    // setInterval(async() => {
    //   const task = new Task({
    //     type: "count",
    //     id: "uRn1hMZ6ZmgiSY_2kalj-vMx7yh980B4yqnnwWQpTL0",
    //     leader: "https://dap-09-3.api.divviup.org/",
    //     helper: "https://helper-dap-09.shira.app/",
    //     timePrecisionSeconds: 300
    //   });
    //   await task.sendMeasurement(true); // your measurement here
    //   console.log('sent;')        
    // }, 1000)

    // SUM
    // setInterval(async() => {
    //   const randomNumber = Math.floor(Math.random() * (70 - 1) + 1)
    //   console.log("🚀 ~ setInterval ~ randomNumber:", randomNumber)
    //   const task = new Task({
    //     type: "sum",
    //     bits: 16,
    //     id: "YbeubXWNyvoQj1Xh5UnwNcqB2gpDaakwp1lDdIadz5w",
    //     leader: "https://dap-09-3.api.divviup.org/",
    //     helper: "https://helper-dap-09.shira.app/",
    //     timePrecisionSeconds: 300
    //   });
  
    //   await task.sendMeasurement(randomNumber); // your measurement here
    // }, 1000)

    // HISTOGRAM
    // setInterval(async() => {
    //   const task = new Task({
    //     type: "histogram",
    //     // buckets: [
    //     //   1,
    //     //   5,
    //     //   10
    //     // ],
    //     chunkLength: 2,
    //     length: 3,
    //     id: "FMIysxUN7hE97ILtENO4LjerGueMxMULOVg2d8HAdh8",
    //     leader: "https://dap-09-3.api.divviup.org/",
    //     helper: "https://helper-dap-09.shira.app/",
    //     timePrecisionSeconds: 300
    //   });
  
    //   await task.sendMeasurement(2); // your measurement here
    // }, 1000)

    fetchTasks()  
    fetchJobs()
  }, [])

  return (
    <div>
      { selected && (
        <SelectedTask 
          task={selected}
          onClose={() => {
            onSelect(null)
          }}
        />
      )}

      <div>
        <div className="py-4">
          <h1 className="text-xl">Tasks scheduled for collection</h1>
        </div>
        <CollectionsTable />
      </div>

      <div className="py-4">
        <AllItemsTable 
          onSelect={(task) => {
            fetchEvents(task)
            onSelect(task)
          }}
        />
      </div>
    </div>
  )
}
