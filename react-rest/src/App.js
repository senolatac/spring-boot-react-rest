import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { LoginPage } from './pages/login/LoginPage';
import { RegisterPage } from './pages/register/RegisterPage';
import { ProfilePage } from './pages/profile/ProfilePage';
import { HomePage } from './pages/home/HomePage';
import { NotFound } from './pages/errors/NotFound';
import { Unauthorized } from './pages/errors/Unauthorized';

import AuthGuard from './guards/AuthGuard';
import { Role } from './models/role';

import UserService from './services/user.service';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            history: createBrowserHistory(),
            currentUser: null,
        };
    }

    componentDidMount() {
        UserService.currentUser.subscribe(data => {
            this.setState({
                currentUser: data,
            });
        });
    }

    logout() {
        UserService.logOut()
            .then(
                data => {
                    this.state.history.push('/login');
                },
                error => {
                    this.setState({
                        errorMessage: 'Unexpected error occurred.',
                    });
                },
            );
    }

    render() {
        const { currentUser, history } = this.state;
        return (
            <Router history={history}>
                <div>
                    {currentUser &&
                    <nav className="navbar navbar-expand navbar-dark bg-dark">
                        <a className="navbar-brand" href="https://reactjs.org">
                            <img src={logo} className="App-logo" alt="logo"/>
                            React
                        </a>
                        <div className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <a className="nav-link" href="/home">
                                    <span className="fa fa-home"/>
                                    Home
                                </a>
                            </li>
                        </div>
                        <div className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <a className="nav-link" href="/profile">
                                    <span className="fa fa-user"/>
                                    {currentUser.name}
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#" onClick={() => this.logout()}>
                                    <span className="fa fa-sign-out"/>
                                    LogOut
                                </a>
                            </li>
                        </div>
                    </nav>
                    }
                </div>

                <div>
                    {!currentUser &&
                    <nav className="navbar navbar-expand navbar-dark bg-dark">
                        <a className="navbar-brand" href="https://reactjs.org">
                            <img src={logo} className="App-logo" alt="logo"/>
                            React
                        </a>
                        <div className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <a className="nav-link" href="/home">
                                    <span className="fa fa-home"/>
                                    Home
                                </a>
                            </li>
                        </div>
                        <div className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <a className="nav-link" href="/register">
                                    <span className="fa fa-user-plus"/>
                                    &nbsp;
                                    Register
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/login">
                                    <span className="fa fa-sign-in"/>
                                    Login
                                </a>
                            </li>
                        </div>
                    </nav>
                    }
                </div>
                <div className="container">
                    <Switch>
                        <Route exact path="/" component={LoginPage}/>
                        <Route exact path="/login" component={LoginPage}/>
                        <Route exact path="/register" component={RegisterPage}/>
                        <AuthGuard
                            path="/profile"
                            roles={[Role.ADMIN, Role.USER]}
                            component={ProfilePage}/>
                        <AuthGuard
                            path="/home"
                            roles={[Role.ADMIN]}
                            component={HomePage}/>
                        <Route exact path="/404" component={NotFound}/>
                        <Route exact path="/401" component={Unauthorized}/>
                        <Redirect from="*" to="/404"/>
                    </Switch>
                </div>
            </Router>
        );
    }

}

export default App;
