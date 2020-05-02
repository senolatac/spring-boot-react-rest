import React from 'react';

class NotFound extends React.Component{

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="page-wrap d-flex flex-row align-items-center">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-12 text-center">
                            <span className="display-1 d-block">404</span>
                            <div className="mb-4 lead">
                                Oops! The page you are looking for was not found.
                            </div>
                            <a href="/login" className="btn btn-link">Back to Home</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export { NotFound };
