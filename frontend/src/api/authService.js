// 1️⃣ Base URL (सगळ्यात वर)
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080'

// 2️⃣ API endpoints (BASE_URL नंतर लगेच)
const LOGIN_URL = `${BASE_URL}/api/auth/login`
const REGISTER_URL = `${BASE_URL}/api/auth/register`


// 3️⃣ Common request function
async function request(url, payload) {
  let response

  try {
    response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
  } catch (err) {
    console.error('Fetch failed:', err)
    throw new Error('Unable to reach the server. Please check your connection and try again.')
  }

  const rawText = await response.text()
  let data = null

  if (rawText) {
    try {
      data = JSON.parse(rawText)
    } catch {
      data = null
    }
  }

  if (!response.ok) {
    const message =
      (data && typeof data === 'object' && (data.message || data.error)) ||
      'Something went wrong. Please try again.'
    throw new Error(message)
  }

  return data
}

// 4️⃣ Exported functions (सगळ्यात शेवटी)
export function loginApi(payload) {
  return request(LOGIN_URL, payload)
}

export function registerApi(payload) {
  return request(REGISTER_URL, {
    userName: payload.name,
    email: payload.email,
    password: payload.password,
  })
}