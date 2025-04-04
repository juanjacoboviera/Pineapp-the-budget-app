const API_URL = window.location.hostname === "localhost" 
  ? "http://localhost:3000"  // Local development URL
  : "https://juanjacoboviera.github.io/Pineapp-the-budget-app";  // Production URL

export { API_URL };