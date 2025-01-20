export const TaskStatus = {
  NOTSTARTED: 'not_started',
  DOING: 'doing',
  DONE: 'done',
}

export type TaskStatus = (typeof TaskStatus)[keyof typeof TaskStatus]
