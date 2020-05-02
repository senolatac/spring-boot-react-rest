import axios from 'axios';

const API_ADMIN_URL = 'http://localhost:8080/api/admin/';

class AdminService {

    headers() {
        const user = JSON.parse(localStorage.getItem('currentUser'));
        return {
            'authorization': 'Basic ' + btoa(user.username + ':' + user.password),
            'Content-type':'application/json',
        };
    }

    delete(userId) {
        return axios.delete(API_ADMIN_URL + userId, { headers: this.headers() });
    }

    findAllUsers() {
        return axios.get(API_ADMIN_URL + 'all', { headers : this.headers() });
    }

}
export default new AdminService();
