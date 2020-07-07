import React from 'react';

import { withAuthorization } from '../Session';

const Home = (props) => {
    
    return (
        <div>
            <h1>Home Page</h1>
            <p>Page only accessible by the user</p>
        </div>
    )
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(Home);