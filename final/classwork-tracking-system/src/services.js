export function fetchAddAssignment(assignmentName, dueDate) {
    return fetch('/api/assignments', {
      method: 'POST',
      headers: new Headers({
        'content-type': 'application/json',
      }),
      body: JSON.stringify( { assignmentName, dueDate } ),
    })
    .catch( () => Promise.reject({ error: 'networkError' }) )
    .then( response => {
      if (response.ok) {
        return response.json();
      }
      return response.json().then( err => Promise.reject(err) );
    });
  }
  
  export function fetchDeleteAssignment(id) {
    return fetch(`/api/assignments/${id}`, {
      method: 'DELETE',
    })
    .catch( () => Promise.reject({ error: 'networkError' }) )
    .then( response => {
      if (response.ok) {
        return response.json();
      }
      return response.json().then( err => Promise.reject(err) );
    });
  }
  
  export function fetchUpdateAssignment( id, assignmentUpdates ) {
    return fetch(`/api/assignments/${id}`, {
      method: 'PATCH',
      headers: new Headers({
        'content-type': 'application/json',
      }),
      body: JSON.stringify( assignmentUpdates ),
    })
    .catch( () => Promise.reject({ error: 'networkError' }) )
    .then( response => {
      if (response.ok) {
        return response.json();
      }
      return response.json().then( err => Promise.reject(err) );
    });
  }
  
  export function fetchAssignments() {
    return fetch('/api/assignments', {
        method: 'GET',
    })
    .catch( () => Promise.reject({ error: 'networkError' }) )
    .then( response => {
      if (response.ok) {
        return response.json();
      }
      return response.json().then( err => Promise.reject(err) );
    });
  }
  
  export function fetchSession() {
    return fetch('/api/session', {
      method: 'GET',
    })
    .catch( () => Promise.reject({ error: 'networkError' }) )
    .then( response => {
      if (response.ok) {
        return response.json();
      }
      return response.json().then( err => Promise.reject(err) );
    });
  }
  
  export function fetchLogout() {
    return fetch('/api/session', {
      method: 'DELETE',
    })
    .catch( () => Promise.reject({ error: 'networkError' }) )
    .then( response => {
      if (response.ok) {
        return response.json();
      }
      return response.json().then( err => Promise.reject(err) );
    });
  }
  
  export function fetchLogin(username) {
    return fetch('/api/session', {
      method: 'POST',
      headers: new Headers({
        'content-type': 'application/json'
      }),
      body: JSON.stringify({ username }),
    })
    .catch( () => Promise.reject({ error: 'networkError' }) )
    .then( response => {
      if (response.ok) {
        return response.json();
      }
      return response.json().then( err => Promise.reject(err) );
    });
  }