import { FunctionComponent, Key, useCallback } from 'react'
import { useStore } from '../../store'
import { Accordion, AccordionItem, Button, CircularProgress, Select, SelectItem, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'
import { fill, get } from 'lodash'
import { TaskEvent } from "../../api/domain/TaskEvent";
import { Task } from '../../api/domain/Task';
import styled from 'styled-components';
import { HiXCircle, HiCheckCircle } from "react-icons/hi";

interface Props {
  task: Task
  loading: boolean
  events: TaskEvent[]
  total: string
  onClose: () => void
}


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


export const TaskDetails:FunctionComponent<Props> = ({
  task,
  events,
  loading,
  total,
  onClose
}) => {

  return (
    <Wrapper>

      <div className='flex justify-between items-center'>
        <h1 className='text-xl'>
          { task.name }
        </h1>
        <Button 
        color="primary"
        variant="ghost"
        onPress={onClose}
        >Close</Button>
      </div>
      {
        loading && (
          <div className='py-8 flex items-center'>
            <h1 className='text-xl pr-8'>
              Loading...
            </h1>
            <CircularProgress color="primary" aria-label="Loading..."/>
          </div>
        )
      }
      { !loading && events && events.length > 0 && (
         <div>
    
          <div>
            <h1 className="text-l py-4 font-bold">{`Total number: ${total}`}</h1>
          </div>

          <Accordion>
            { events.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime() ).map((e) => (
              <AccordionItem
                title={new Date(e.created_at).toLocaleString()}
                startContent={e.success ? (
                  <HiCheckCircle color="#5cb85c"/>
                ) : (
                  <HiXCircle color="#ed4337"/>
                )}
              >
                <div className='pl-8'>
                  { e.output.split(/\n/g).map((i) => (
                    <p>{i}</p>
                  )) }
                </div>
              </AccordionItem>
            ))}
          </Accordion>
       
        </div>
      )}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  border-radius: 4px;
  padding: 24px;
  background: white;
  min-height: 100%;
`