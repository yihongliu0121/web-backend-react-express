export function fetchSessionGet() {
    return fetch("/api/v1/session", {
    method: "GET",
    })
    .catch(() => Promise.reject({ error: "networkError" }))
    .then((response) => {
        if (response.ok) {
            return response.json();
        }
        return response.json().then((err) => Promise.reject(err));
    });
}

export function fetchSessionPost(username) {
    return fetch("/api/v1/session", {
        method: "POST",
        headers: new Headers({
          "content-type": "application/json",
        }),
        body: JSON.stringify({ username }),
      })
        .catch(() => Promise.reject({ error: "networkError" }))
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          return response.json().then((err) => Promise.reject(err));
        });
}

export function fetchSessionDelete() {
    return fetch("/api/v1/session", {
        method: "DELETE",
      })
        .catch(() => Promise.reject({ error: "networkError" }))
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          return response.json().then((err) => Promise.reject(err));
        });
}

export function fetchWordGet() {
    return fetch("/api/v1/word", {
        method: "GET",
      })
        .catch(() => Promise.reject({ error: "networkError" }))
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          return response.json().then((err) => Promise.reject(err));
        });
}

export function fetchWordPost(word) {
    return fetch("/api/v1/word", {
        method: "POST",
        headers: new Headers({
          "content-type": "application/json",
        }),
        body: JSON.stringify({ word }),
      })
        .catch(() => Promise.reject({ error: "networkError" }))
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          return response.json().then((err) => Promise.reject(err));
        });
}