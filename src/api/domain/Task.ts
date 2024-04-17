interface Vdaf {
  type: string
}

export interface Task {
  id: string;
  name: string;
  collector_credential_id: string;
  vdaf: Vdaf
}
