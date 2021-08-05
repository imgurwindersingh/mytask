export interface ILoginResponse {
  success: boolean;
  token: string;
}

export interface IDashboardResponse {
  success: boolean;
  data: {
    open: number;
    inprocess: number;
    finsished: number;
    reviewandclosed: number;
    urgent: number;
    asap: number;
    important: number;
    taskinvolved: number;
    newtask: number;
    overduetasks: number;
    reassignedtasks: number;
    tasksremoved: number;
  };
}

export enum CurrentScreen {
  DASHBOARD = 'Dashboard',
  ALL_DOE_SCORES = 'All DOE Scores',
  CREATE_TASK = 'Create Task',
  MY_TASK = 'My Task',
  TASKS_CREATED_TODAY = 'Tasks Created Today',
  MY_OVERDUE_TASKS = 'My Overdue Tasks',
  MY_ASSIGNED_TASKS = 'My Assigned Tasks',
  TASK_DUE_IN_3_DAYS = 'Task Due in 3 days',
  SUPPORT_STAFF_TASKS = 'Support Staff Tasks',
  REPORTS = 'Reports',
}

export enum Method {
  POST = 'POST',
  GET = 'GET',
} 

export interface ITask { 
  id?: number,
  title: string,
  count: number,
  ticketid?: string,
  tasktype?: string,
  priority?: string,
  created_by?: string,
  involved?: string,
  startdate?: string,
  enddate?: string,
  status?: string,
  subtask?: number,
  completed?: number,
} 

export interface IAllDOEItem {
  name: string;
  nooftaks: number;
  totalpoints: number;
  value: number;
} 

export interface IUserPointItem {
  id: number;
  name: string;
  totalpoints: number;
  totaltasks: number;
} 

export interface IResponseAllDOEScores { 
  data: IAllDOEScoresData;
  message:string;
  success:boolean;
}

export interface IResponseUserPoints { 
  data:IUserPointItem[];
  message:string;
  success:boolean;
}

export interface IAllDOEScoresData {
  list: IAllDOEItem[];
  title: any;
}

export interface ITaskItem {
  taskid: string;
  taskname: string;
  username: string;
  points: number;
  date: string;
}



  //   // const task:ITask = props?.task;

  //   const tasks: ITask[] = [
  //     {
  //         id: 1433,
  //         title: 'Standards in ICT data infrastructure',
  //         count: 0,
  //         ticketid: '0721 DrKo1433',
  //         tasktype: 'Routine',
  //         priority: 'IMPORTANT',
  //         created_by: 'Dr Uke Kombra',
  //         involved: 'A1-Thomas Podarua',
  //         startdate: '12-07-2021',
  //         enddate: '23-07-2021',
  //         status: 'Open',
  //         subtask: 0,
  //         completed: 0
  //     },
  //     {
  //         id: 1493,
  //         title: '10 Technical colleges established',
  //         count: 0,
  //         ticketid: '0721 DrKo1493',
  //         tasktype: 'KRA',
  //         priority: 'ASAP',
  //         created_by: 'Dr Uke Kombra',
  //         involved: 'A1-Wilson Garu',
  //         startdate: '12-07-2021',
  //         enddate: '23-07-2021',
  //         status: 'Open',
  //         subtask: 1,
  //         completed: 0
  //     },
  //     {
  //         id: 1,
  //         title: 'TSS Stuents graduating with dual certificates',
  //         count: 0,
  //         ticketid: '0721 DrKo1443',
  //         tasktype: 'Routine',
  //         priority: 'URGENT',
  //         created_by: 'Dr Uke Kombra',
  //         involved: 'A1-Thomas Podarua',
  //         startdate: '12-07-2021',
  //         enddate: '23-07-2021',
  //         status: 'Open',
  //         subtask: 0,
  //         completed: 0
  //     },
  //     {
  //         id: 1434,
  //         title: 'Standards in ICT data infrastructure',
  //         count: 0,
  //         ticketid: '0721 DrKo1433',
  //         tasktype: 'Routine',
  //         priority: 'IMPORTANT',
  //         created_by: 'Dr Uke Kombra',
  //         involved: 'A1-Thomas Podarua',
  //         startdate: '12-07-2021',
  //         enddate: '23-07-2021',
  //         status: 'Open',
  //         subtask: 0,
  //         completed: 0
  //     },
  //     {
  //         id: 1495,
  //         title: '10 Technical colleges established',
  //         count: 0,
  //         ticketid: '0721 DrKo1493',
  //         tasktype: 'KRA',
  //         priority: 'ASAP',
  //         created_by: 'Dr Uke Kombra',
  //         involved: 'A1-Wilson Garu',
  //         startdate: '12-07-2021',
  //         enddate: '23-07-2021',
  //         status: 'Open',
  //         subtask: 1,
  //         completed: 0
  //     },
  //     {
  //         id: 16,
  //         title: 'TSS Stuents graduating with dual certificates',
  //         count: 0,
  //         ticketid: '0721 DrKo1443',
  //         tasktype: 'Routine',
  //         priority: 'URGENT',
  //         created_by: 'Dr Uke Kombra',
  //         involved: 'A1-Thomas Podarua',
  //         startdate: '12-07-2021',
  //         enddate: '23-07-2021',
  //         status: 'Open',
  //         subtask: 0,
  //         completed: 0
  //     },
  //     {
  //         id: 1423,
  //         title: 'Standards in ICT data infrastructure',
  //         count: 0,
  //         ticketid: '0721 DrKo1433',
  //         tasktype: 'Routine',
  //         priority: 'IMPORTANT',
  //         created_by: 'Dr Uke Kombra',
  //         involved: 'A1-Thomas Podarua',
  //         startdate: '12-07-2021',
  //         enddate: '23-07-2021',
  //         status: 'Open',
  //         subtask: 0,
  //         completed: 0
  //     },
  //     {
  //         id: 1483,
  //         title: '10 Technical colleges established',
  //         count: 0,
  //         ticketid: '0721 DrKo1493',
  //         tasktype: 'KRA',
  //         priority: 'ASAP',
  //         created_by: 'Dr Uke Kombra',
  //         involved: 'A1-Wilson Garu',
  //         startdate: '12-07-2021',
  //         enddate: '23-07-2021',
  //         status: 'Open',
  //         subtask: 1,
  //         completed: 0
  //     },
  //     {
  //         id: 1788,
  //         title: 'TSS Stuents graduating with dual certificates',
  //         count: 0,
  //         ticketid: '0721 DrKo1443',
  //         tasktype: 'Routine',
  //         priority: 'URGENT',
  //         created_by: 'Dr Uke Kombra',
  //         involved: 'A1-Thomas Podarua',
  //         startdate: '12-07-2021',
  //         enddate: '23-07-2021',
  //         status: 'Open',
  //         subtask: 0,
  //         completed: 0
  //     },
  //     {
  //         id: 1233,
  //         title: 'Standards in ICT data infrastructure',
  //         count: 0,
  //         ticketid: '0721 DrKo1433',
  //         tasktype: 'Routine',
  //         priority: 'IMPORTANT',
  //         created_by: 'Dr Uke Kombra',
  //         involved: 'A1-Thomas Podarua',
  //         startdate: '12-07-2021',
  //         enddate: '23-07-2021',
  //         status: 'Open',
  //         subtask: 0,
  //         completed: 0
  //     },
  //     {
  //         id: 3432,
  //         title: '10 Technical colleges established',
  //         count: 0,
  //         ticketid: '0721 DrKo1493',
  //         tasktype: 'KRA',
  //         priority: 'ASAP',
  //         created_by: 'Dr Uke Kombra',
  //         involved: 'A1-Wilson Garu',
  //         startdate: '12-07-2021',
  //         enddate: '23-07-2021',
  //         status: 'Open',
  //         subtask: 1,
  //         completed: 0
  //     },
  //     {
  //         id: 1123,
  //         title: 'TSS Stuents graduating with dual certificates',
  //         count: 0,
  //         ticketid: '0721 DrKo1443',
  //         tasktype: 'Routine',
  //         priority: 'URGENT',
  //         created_by: 'Dr Uke Kombra',
  //         involved: 'A1-Thomas Podarua',
  //         startdate: '12-07-2021',
  //         enddate: '23-07-2021',
  //         status: 'Open',
  //         subtask: 0,
  //         completed: 0
  //     },
  // ];