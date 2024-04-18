import { Accordion, AccordionItem } from "@nextui-org/react";
import { FunctionComponent } from "react";
import { AllItemsTable } from "../AllItemsTable";

interface Props {}

export const TablesAccordion:FunctionComponent<Props> = () => {
  return (
    <Accordion variant="bordered">
      <AccordionItem key="1" aria-label="All tasks" title="All tasks">
        <AllItemsTable />
      </AccordionItem>        
    </Accordion>
  )
}