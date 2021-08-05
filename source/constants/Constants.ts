export class Constants {
  public static appVersion = '1.0.0';
  public static applicationName = 'mytask';

  public static baseURL = 'https://mytask.eonoia.com/api/';

  public static defaultEmailId = 'Uke_Kombra@education.gov.pg';
  public static defaultPassword = '123456';

  public static tokenKey = 'token';
  public static starterKey = 'starter';

  public static loginAPI = Constants.baseURL + 'auth/login';
  public static taskTypesAPI = Constants.baseURL + 'tasktypes';
  public static prioritiesAPI = Constants.baseURL + 'priorities';
  public static actionsAPI = Constants.baseURL + 'actions';
  public static statusAPI = Constants.baseURL + 'status';
  public static assignToAPI = Constants.baseURL + 'assignto';
  public static taskCreatedBymeAPI = Constants.baseURL + 'taskcreatedbyme';
  public static assignedTasksAPI = Constants.baseURL + 'assignedtasks';
  public static supportStaffTasksAPI = Constants.baseURL + 'supportstafftasks';
  public static allTasksAPI = Constants.baseURL + 'alltasks';
  public static overDueTasksAPI = Constants.baseURL + 'overduetasks';
  public static taskDuein3DaysAPI = Constants.baseURL + 'taskduein3days';
  public static allDOEScoresAPI = Constants.baseURL + 'alldoescores';
  public static checkUserPointsUnderYouAPI =
    Constants.baseURL + 'checkuserpointsunderyou';
  public static filterPointDataAPI =
    Constants.baseURL + 'filterpointdata/{type}/{value}';
  public static filterUserPointDataAPI =
    Constants.baseURL + 'filteruserpointdata/{user}';
  public static createTaskAPI = Constants.baseURL + 'createtask';
  public static dashboardAPI = Constants.baseURL + 'dashboard';

    public static deletetaskAPI = Constants.baseURL + 'deletetask/{taskid}';
    public static reassigntasktoAPI = Constants.baseURL + 'reassigntaskto';
    public static assigntasktoAPI = Constants.baseURL + 'assigntaskto';
    public static assignexecutorAPI = Constants.baseURL + 'assignexecutor';
    public static removeexecutorAPI = Constants.baseURL + 'removeexecutor/{taskid}';
    public static addsubtaskAPI = Constants.baseURL + 'addsubtask';
    public static removesubtaskAPI = Constants.baseURL + 'removesubtask/{subtaskid}';
    public static taskcompleteAPI = Constants.baseURL + 'taskcomplete';
    public static assignsubtaskAPI = Constants.baseURL + 'assignsubtask';
    public static subtaskreassignAPI = Constants.baseURL + 'subtaskreassign';
    public static closetaskAPI = Constants.baseURL + 'closetask';
    public static userAPI = Constants.baseURL + 'user';

}
