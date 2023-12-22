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
        <div style={styles.container}>
            {sessions.map(session => (
                <div key={session.id} style={styles.sessionCard}>
                    <h2 style={styles.sessionTitle}>{session.class_name}</h2>
                    <p style={styles.sessionInfo}>{session.description}</p>
                    <p style={styles.sessionInfo}>{`Time: ${session.session_time}`}</p>
                    <p style={styles.sessionInfo}>{`Location: ${session.location}`}</p>
                    <p style={styles.sessionInfo}>{`Attendee Count: ${session.attendee_count}`}</p>
                    <p style={styles.sessionInfo}>Attendees:</p>
                    <ul style={styles.attendeeList}>
                        {session.attendees.map(attendee => (
                            <li key={attendee.username} style={styles.attendee}>{attendee.username}</li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

const styles = {
    container: {
        background: 'linear-gradient(to right, #0A1128, #001F54, #033563)',
        minHeight: '100vh',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    sessionCard: {
        backgroundColor: 'white',
        borderRadius: '5px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        padding: '20px',
        margin: '10px 0',
        width: '80%', // Adjust as needed
        maxWidth: '600px', // Adjust as needed
    },
    sessionTitle: {
        color: '#001F54',
        marginBottom: '10px',
    },
    sessionInfo: {
        margin: '5px 0',
    },
    attendeeList: {
        listStyleType: 'none',
        padding: 0,
    },
    attendee: {
        margin: '5px 0',
    },
};

export default StudySessionList;
