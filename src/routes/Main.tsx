import { FunctionComponent, Key, useCallback, useEffect } from "react";
import Wrapper from "../components/Wrapper";
import { useStore } from "../store";
import { Button } from "@nextui-org/react";
import { TablesAccordion } from "../components/TablesAccordion";
import { CollectionsTable } from "../components/CollectionsTable";
import { TaskDetails } from "../components/TaskDetails";

interface Props {}


export const Main: FunctionComponent<Props> = () => {
  const { fetchTasks, fetchJobs, loadingTasks } = useStore()

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
    fetchJobs()
  }, [])


  return (
    <Wrapper>
      <div >

        <div>
          <div className="py-4">
            <h1 className="text-xl">Tasks scheduled for collection</h1>
          </div>

          <CollectionsTable />
        </div>

        <div className="py-4">
          <TablesAccordion />
        </div>

        <div>
          <div className="py-4">
            <h1 className="text-xl">Select a task for collection details</h1>
          </div>
          <TaskDetails />
        </div>
        
      </div>



    </Wrapper>
  )
}