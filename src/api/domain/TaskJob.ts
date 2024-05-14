export interface TaskJob {
  id: string;
  name: string;
  cron: string;
  task_name: string;
  task_type: string;
  divviup_id: string;
  task_id: number
}
