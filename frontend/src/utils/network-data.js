const BASE_URL = 'http://localhost:3000/v1'

function getAccessToken() {
  return localStorage.getItem('accessToken')
}

function isUserLogged() {
  return !!localStorage.getItem('accessToken')
}

function putAccessToken(accessToken) {
  return localStorage.setItem('accessToken', accessToken)
}

function putLanguage(language) {
  return localStorage.setItem('language', language)
}

function getLanguage() {
  return localStorage.getItem('language') || 'id'
}

function putTheme(theme) {
  return localStorage.setItem('theme', theme)
}

function getTheme() {
  return localStorage.getItem('theme') || 'dark'
}

async function fetchWithToken(url, options = {}) {
  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${getAccessToken()}`,
    },
  })
}

async function login({ email, password }) {
  const response = await fetch(`${BASE_URL}/users/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })

  const responseJson = await response.json()

  if (responseJson.status !== 'success') {
    alert(responseJson.message)
    return { error: true, data: null }
  }

  return { error: false, data: responseJson.data }
}

function logout() {
  return localStorage.clear()
}

async function register({ name, email, password }) {
  const response = await fetch(`${BASE_URL}/users/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, password }),
  })

  const responseJson = await response.json()

  if (responseJson.status !== 'success') {
    alert(responseJson.message)
    return { error: true }
  }

  return { error: false }
}

async function getUserLogged() {
  const response = await fetchWithToken(`${BASE_URL}/users/me`)
  const responseJson = await response.json()

  if (responseJson.status !== 'success') {
    return { error: true, data: null }
  }

  return { error: false, data: responseJson.data }
}

async function addNote({ title, body }) {
  const response = await fetchWithToken(`${BASE_URL}/notes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, body }),
  })

  const responseJson = await response.json()

  if (responseJson.status !== 'success') {
    return { error: true, data: null }
  }

  return { error: false, data: responseJson.data }
}

async function getActiveNotes() {
  const response = await fetchWithToken(`${BASE_URL}/notes`)
  const responseJson = await response.json()

  if (responseJson.status !== 'success') {
    return { error: true, data: null }
  }

  return { error: false, data: responseJson.data }
}

async function getArchivedNotes() {
  const response = await fetchWithToken(`${BASE_URL}/notes/archived`)
  const responseJson = await response.json()

  if (responseJson.status !== 'success') {
    return { error: true, data: null }
  }

  return { error: false, data: responseJson.data }
}

async function getNote(id) {
  const response = await fetchWithToken(`${BASE_URL}/notes/${id}`)
  const responseJson = await response.json()

  if (responseJson.status !== 'success') {
    return { error: true, data: null }
  }

  return { error: false, data: responseJson.data }
}

async function archiveNote(id) {
  const response = await fetchWithToken(`${BASE_URL}/notes/${id}/archive`, {
    method: 'POST',
  })

  const responseJson = await response.json()

  if (responseJson.status !== 'success') {
    return { error: true, data: null }
  }

  return { error: false, data: responseJson.data }
}

async function unarchiveNote(id) {
  const response = await fetchWithToken(`${BASE_URL}/notes/${id}/unarchive`, {
    method: 'POST',
  })

  const responseJson = await response.json()

  if (responseJson.status !== 'success') {
    return { error: true, data: null }
  }

  return { error: false, data: responseJson.data }
}

async function deleteNote(id) {
  const response = await fetchWithToken(`${BASE_URL}/notes/${id}`, {
    method: 'DELETE',
  })

  const responseJson = await response.json()

  if (responseJson.status !== 'success') {
    return { error: true, data: null }
  }

  return { error: false, data: responseJson.data }
}

export {
  getAccessToken,
  isUserLogged,
  putAccessToken,
  login,
  logout,
  register,
  getUserLogged,
  addNote,
  getActiveNotes,
  getArchivedNotes,
  getNote,
  archiveNote,
  unarchiveNote,
  deleteNote,
  getLanguage,
  putLanguage,
  getTheme,
  putTheme
}