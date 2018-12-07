import React from 'react';
import { connect } from "react-redux";
import { fetchUserAction } from "../actions/index2";

export function Users(props) {
    return (
        <div>
            <ul>
                {props.users.map(login => 
                    <li key={login}>
                        {login}
                        <button type="button" onClick={() => props.loadUser(login)}>Load user</button>
                    </li>
                )}
            </ul>
            {props.loading && <p>Please wait!</p>}
            {props.current && <User {...props.current} />}
        </div>
    )
}

Users.defaultProps = {
    users: [
        'shakyshane',
        'sindresorhus',
        'substack'
    ],
    current: null,
    loading: false,
  };

function User(props) {
    return <div>{props.name}</div>
}

function mapState(state) {
    return state;
}

function mapDispatch(dispatch) {
    return {
        loadUser: (login) => dispatch(fetchUserAction(login))
    };
}

export default connect(mapState, mapDispatch)(Users);