
const local = 'http://localhost:3000'
const production = 'https://pineapp-the-budget-app.onrender.com'
const API_URL = window.location.hostname === 'localhost' ? local : production

export { API_URL };