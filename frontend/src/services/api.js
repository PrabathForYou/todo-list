import axios from "axios"

const apiClient = axios.create({
    baseURL: "http://localhost:3000",
    headers: {
        'Content-Type' : 'application/json',
        'Accept' : 'application/json'
    },
    timeout: 10000
})


////uncomment this when backend authentication is done
// apiClient.interceptors.request.use(
//   config => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       config.headers['Authorization'] = `Bearer ${token}`;
//     }
//     return config;
//   },
//   error => Promise.reject(error)
// );

// appClient.interceptors.response.use()

apiClient.interceptors.response.use(
  response => response,
  error => {
    // Handle common errors (401, 403, etc.)
    if (error.response && error.response.status === 401) {
      // Handle unauthorized
      // router.push('/login');
    }
    return Promise.reject(error);
  }
);

export default {
  getTasks() {
    return apiClient.get('/tasks');
  },
  
  getTask(id) {
    return apiClient.get(`/tasks/${id}`);
  },
  
  storeTask(task) {
    return apiClient.post('/tasks', task);
  },
  
  updateTask(id, task) {
    return apiClient.put(`/tasks/${id}`, task);
  },
  
  deleteTask(id) {
    return apiClient.delete(`/tasks/${id}`);
  },

  updateStatus(id,status) {
    return apiClient.put(`/tasks/update-status/${id}`, status);
  }
}
