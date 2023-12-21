import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const StudySessionList = () => {
    const [sessions, setSessions] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        let isMounted = true; 

        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        } else {
            const fetchSessions = async () => {
                try {
                    const response = await axios.get('http://127.0.0.1:8000/api/studysessions/', {
                        headers: { Authorization: `Token ${token}` }
                    });
                    if (isMounted) {
                        setSessions(response.data);
                    }
                } catch (error) {
                    console.error(error);
                    // Add error handling logic here
                }
            };

            fetchSessions();
        }

        return () => {
            isMounted = false; 
        };
    }, [navigate]);

    return (
        <div>
            {sessions.map(session => (
                <div key={session.id}>
                    <h2>{session.class_name}</h2>
                    <p>{session.description}</p>
                    <p>{`Time: ${session.session_time}`}</p>
                    <p>{`Location: ${session.location}`}</p>
                    <p>{`Attendee Count: ${session.attendee_count}`}</p>
                    <p>Attendees:</p>
                    <ul>
                        {session.attendees.map(attendee => (
                            <li key={attendee.username}>{attendee.username}</li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default StudySessionList;
