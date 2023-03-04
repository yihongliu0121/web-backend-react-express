export const LOGIN_STATUS = {
    PENDING: 'pending',
    NOT_LOGGED_IN: 'notLoggedIn',
    IS_LOGGED_IN: 'loggedIn',
};
  
export const SERVER = {
    AUTH_MISSING: 'auth-missing',
    AUTH_INSUFFICIENT: 'auth-insufficient',
    REQUIRED_USERNAME: 'required-username',
    USERNAME_INVALID: 'username-invalid',
    REQUIRED_ASSIGNMENT: 'required-assignment',
    TASK_MISSING: 'noSuchId', // Someone was inconsistent!
};
  
export const CLIENT = {
    NETWORK_ERROR: 'networkError',
    NO_SESSION: 'noSession',
};
  
export const MESSAGES = {
    [CLIENT.NETWORK_ERROR]: 'Trouble connecting to the network, please try again',
    [SERVER.AUTH_INSUFFICIENT]: 'Your username/password combination does not match any records, please try again.',
    [SERVER.REQUIRED_USERNAME]: 'Please enter a username',
    [SERVER.USERNAME_INVALID]: 'Please enter a valid (letters and/or numbers) username',
    [SERVER.REQUIRED_ASSIGNMENT]: 'Please enter the assignment name and due date at the same time',
    [SERVER.AUTH_MISSING]: 'Please login first',
    default: 'Something went wrong.  Please try again',
};