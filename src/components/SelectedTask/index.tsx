import { FunctionComponent, useEffect } from "react";
import styled from 'styled-components'
import { TaskDetails } from "../TaskDetails";
import { Task } from "../../api/domain/Task";
import { useStore } from "../../store";

interface Props {
  task: Task
  onClose: () => void
}

export const SelectedTask:FunctionComponent<Props> = ({task, onClose}) => {
  const { events, consolidated, loadingEvents } = useStore()

  console.log("🚀 ~ events:", events)
  console.log("🚀 ~ consolidated:", consolidated)

  return (
    <Wrapper>
      <div>
        <TaskDetails 
          task={task}
          loading={loadingEvents}
          events={events}
          total={consolidated}
          onClose={onClose}
        />
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: fixed;
  z-index: 2;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  overflow-x: hidden;
  background: #ececec;

  display: flex;
  justify-content: center;

  > div {
    width: 1024px;
    height: 100%;
    padding: 12px;   
  }
`