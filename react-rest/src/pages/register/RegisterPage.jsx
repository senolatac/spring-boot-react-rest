import React from 'react';
import './RegisterPage.css';
import UserService from '../../services/user.service';
import { User } from '../../models/user';

class RegisterPage extends React.Component{

    constructor(props) {
        super(props);

        if (UserService.currentUserValue) {
            this.props.history.push('/profile');
        }

        this.state = {
            user: new User('', '', ''),
            submitted: false,
            loading: false,
            errorMessage: '',
        };
    }

    handleChange(e) {
        var { name, value } = e.target;
        var user = this.state.user;
        user[name] = value;
        this.setState({ user: user });
    }

    handleRegister(e) {
        e.preventDefault();
        this.setState({submitted: true });
        const { user } = this.state;

        //validate form
        if(!user.name || !user.password || !user.username) {
            return;
        }

        this.setState(({ loading: true }));
        UserService.register(user)
            .then(data => {
                this.props.history.push('/login');
            },
                error => {
                if (error && error.response && error.response.status === 409) {
                    this.setState({
                        errorMessage: 'Username is not available.',
                        loading: false,
                    });
                } else {
                    this.setState({
                        errorMessage: 'Unexpected error occurred.',
                        loading: false,
                    });
                }
                });
    }

    render() {
        const { user, submitted, loading, errorMessage } = this.state;
        return (
            <div className="register-page">
                <div className="card">
                    <div className="header-container">
                        <i className="fa fa-user"/>
                    </div>

                    {errorMessage &&
                    <div className="alert alert-danger" role="alert">
                        {errorMessage}
                    </div>
                    }

                    <form
                        name="form"
                        onSubmit={(e) => this.handleRegister(e)}
                        noValidate
                        className={submitted ? 'was-validated' : ''}>
                        <div className={'form-group'}>
                            <label htmlFor="username">Full Name: </label>
                            <input
                                type="text"
                                className="form-control"
                                name="name"
                                placeholder="Full Name"
                                required
                                value={user.name}
                                onChange={(e) => this.handleChange(e)}/>
                            <div className="invalid-feedback">
                                Full name is required.
                            </div>
                        </div>

                        <div className={'form-group'}>
                            <label htmlFor="username">Username: </label>
                            <input
                                type="text"
                                className="form-control"
                                name="username"
                                placeholder="Username"
                                required
                                value={user.username}
                                onChange={(e) => this.handleChange(e)}/>
                            <div className="invalid-feedback">
                                A valid username is required.
                            </div>
                        </div>

                        <div className={'form-group'}>
                            <label htmlFor="Password">Password: </label>
                            <input
                                type="password"
                                className="form-control"
                                name="password"
                                placeholder="Password"
                                required
                                value={user.password}
                                onChange={(e) => this.handleChange(e)}/>
                            <div className="invalid-feedback">
                                Password is required.
                            </div>
                        </div>

                        <button
                            className="btn btn-primary btn-block"
                            onClick={() => this.setState({ submitted: true })}
                            disabled={loading}>
                            Sign Up
                        </button>
                    </form>
                    <a href="/login" className="card-link">I have an Account!</a>
                </div>
            </div>
        );
    }
}

export { RegisterPage };
