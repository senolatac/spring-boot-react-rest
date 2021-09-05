import axios from 'axios';
import { BehaviorSubject } from 'rxjs';

const API_URL = 'http://localhost:8080/api/user/';

//initial value
const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));

class UserService {

    get currentUserValue() {
        return currentUserSubject.value;
    }

    get currentUser() {
        return currentUserSubject.asObservable();
    }

    login(user) {
        //btoa: Basic64 encryption
        const headers = {
            authorization: 'Basic ' + btoa(user.username + ':' + user.password),
        };

        return axios.get(API_URL + 'login', { headers: headers})
            .then(response => {
                response.data.password = user.password; // Store pure password.
                localStorage.setItem('currentUser', JSON.stringify(response.data));
                currentUserSubject.next(response.data);
                return response.data;
            })
    }

    logOut() {
        return axios.post(API_URL + 'logout', {})
            .then(() => {
                localStorage.removeItem('currentUser');
                currentUserSubject.next(null);
            })
    }

    register(user) {
        return axios.post(API_URL , user);
    }

    changeRole(username, role) {
        return axios.put(API_URL + username + '/change/' + role, {});
    }
}

export default new UserService();
