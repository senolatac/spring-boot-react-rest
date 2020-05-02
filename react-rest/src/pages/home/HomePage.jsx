import React from 'react';
import AdminService from '../../services/admin.service';

class HomePage extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            userList: [],
            errorMessage: '',
            infoMessage: '',
        };
    }

    componentDidMount() {
        AdminService.findAllUsers().then(response => {
            this.setState({ userList: response.data });
        });
    }

    deleteUser(user, ind) {
        AdminService.delete(user.id).then(() => {
            const userList = this.state.userList;
            userList.splice(ind, 1);
            this.setState({
                userList: userList,
                infoMessage: 'Mission is completed.',
            });
        }, error => {
            this.setState({
                errorMessage: 'Unexpected error occurred.',
            });
        });
    }

    render() {
        const { userList, infoMessage, errorMessage } = this.state;
        return (
            <div style={{paddingTop: '30px'}}>
                {infoMessage &&
                <div className="alert alert-success" role="alert">
                    {infoMessage}
                </div>
                }
                {errorMessage &&
                    <div className="alert alert-danger" role="alert">
                        {errorMessage}
                    </div>
                }
                <div className="card">
                    <div className="card-header">
                        All Users
                    </div>
                    <div className="card-body">
                        <table className="table table-striped">
                            <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col">Username</th>
                                <th scope="col">Role</th>
                                <th scope="col">Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {userList.map((user, ind) =>
                                <tr key={user.id}>
                                    <th scope="row">{ind + 1}</th>
                                    <td>{user.name}</td>
                                    <td>{user.username}</td>
                                    <td>{user.role}</td>
                                    <td>
                                        <button className="btn btn-danger btn-sm"
                                        disabled={user.role === 'ROLE_ADMIN'}
                                        onClick={() => this.deleteUser(user, ind)}>
                                            &nbsp;
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            )
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

export { HomePage };
