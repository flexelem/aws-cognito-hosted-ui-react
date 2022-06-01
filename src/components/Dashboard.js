import React, {useEffect, useState} from 'react';
import '../App.css';
import {Auth} from 'aws-amplify';
import {Navigate} from "react-router-dom";
import axios from "axios";

function Dashboard(props) {
    const [user, setUser] = useState();
    const [apiResponse, setApiResponse] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    async function getCurrentUser() {
        try {
            const authUser = await Auth.currentAuthenticatedUser();
            console.log(JSON.stringify(authUser));
            setUser(authUser);
        } catch (e) {
            console.log('error happened', e);
            setUser(null);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getCurrentUser();
    }, []);

    async function handleCallProtectedMethod(event) {
        event.preventDefault();
        const accessToken = user['signInUserSession']['accessToken']['jwtToken'];
        const headers = {
            'Authorization': accessToken
        };

        const apiResp = await axios.get(`${process.env.REACT_APP_API_GATEWAY_BASE_URL}/awesomeapi`, { headers });
        setApiResponse(JSON.stringify(apiResp.data));
    }

    async function handleSignOut(event) {
        event.preventDefault();
        try {
            await Auth.signOut();
        } catch (error) {
            console.log('error signing out: ', error);
        }
        setUser(null);
        setIsLoading(false);
    }

    if (!user && !isLoading) {
        return <Navigate to="/" replace={true} />
    }

    return (
        <div className="container">
            <h1>Dashboard</h1>
            <button onClick={handleSignOut}>Sign Out</button>
            <button onClick={handleCallProtectedMethod}>Call Protected API</button>
            <blockquote>{apiResponse}</blockquote>
        </div>
    )
}

export default Dashboard;
