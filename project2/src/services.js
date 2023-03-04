export function fetchSession() {
    return fetch('/api/v1/session', {
        method: 'GET',
    })
    .catch(() => Promise.reject({ error: 'network-error' }))
    .then((response) => {
        if (response.ok) {
            return response.json();
        }
        return response.json().then(err => Promise.reject(err));
    });
}

export function fetchLogout() {
    return fetch('/api/v1/session', {
        method: 'DELETE',
    })
    .catch(() => Promise.reject({ error: 'network-error' }))
    .then((response) => {
        if (response.ok) {
            return response.json();
        }
        return response.json().then(err => Promise.reject(err));
    });
}

export function fetchLogin(username) {
    return fetch('/api/v1/session', {
        method: 'POST',
        headers: new Headers({
            'content-type': 'application/json'
        }),
        body: JSON.stringify({ username }),
    })
    .catch(() => Promise.reject({ error: 'network-error' }))
    .then((response) => {
        if (response.ok) {
            return response.json();
        }
        return response.json().then(err => Promise.reject(err));
    });
}

export function fetchMessages() {
    return fetch('/api/v1/message', {
        method: 'GET',
    })
    .catch(() => Promise.reject({ error: 'network-error' }))
    .then((response) => {
        if (response.ok) {
            return response.json();
        }
        return response.json().then(err => Promise.reject(err));
    });
}

export function fetchSendMessage(message) {
    return fetch('/api/v1/message', {
        method: 'POST',
        headers: new Headers({
            'content-type': 'application/json',
        }),
        body: JSON.stringify({ message }),
    })
    .catch(() => Promise.reject({ error: 'network-error' }))
    .then((response) => {
        if (response.ok) {
            return response.json();
        }
        return response.json().then(err => Promise.reject(err));
    });
}

export function fetchUserData() {
    return fetch('/api/v1/user', {
        method: 'GET',
    })
    .catch(() => Promise.reject({ error: 'network-error' }))
    .then((response) => {
        if (response.ok) {
            return response.json();
        }
        return response.json().then(err => Promise.reject(err));
    });
}
