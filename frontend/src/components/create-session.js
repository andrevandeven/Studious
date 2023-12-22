import React, { useState } from 'react';
import axios from 'axios';

const CreateStudySession = () => {
    const [className, setClassName] = useState('');
    const [description, setDescription] = useState('');
    const [sessionTime, setSessionTime] = useState('');
    const [location, setLocation] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post('http://127.0.0.1:8000/api/studysessions/', {
                class_name: className,
                description,
                session_time: sessionTime,
                location
            }, {
                headers: { Authorization: `Token ${localStorage.getItem('token')}` }
            });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div style={styles.container}>
            <form onSubmit={handleSubmit} style={styles.form}>
                <h2 style={styles.heading}>Create Study Session</h2>
                <input
                    type="text"
                    value={className}
                    onChange={(e) => setClassName(e.target.value)}
                    placeholder="Class Name"
                    style={styles.input}
                />
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                    style={styles.textarea}
                ></textarea>
                <input
                    type="text"
                    value={sessionTime}
                    onChange={(e) => setSessionTime(e.target.value)}
                    placeholder="Session Time"
                    style={styles.input}
                />
                <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Location"
                    style={styles.input}
                />
                <button type="submit" style={styles.button}>Create Session</button>
            </form>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(to right, #0A1128, #001F54, #033563)',
        minHeight: '100vh',
    },
    form: {
        padding: '20px',
        borderRadius: '5px',
        backgroundColor: 'white',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '80%', // Adjust as needed
        maxWidth: '600px', // Adjust as needed
    },
    heading: {
        marginBottom: '20px',
        color: '#001F54',
    },
    input: {
        margin: '10px 0',
        padding: '10px',
        borderRadius: '4px',
        border: '1px solid #ddd',
        width: '100%', // Adjust as needed
    },
    textarea: {
        margin: '10px 0',
        padding: '10px',
        borderRadius: '4px',
        border: '1px solid #ddd',
        width: '100%', // Adjust as needed
        minHeight: '100px', // Adjust as needed
        fontFamily: 'Arial, sans-serif',
        fontSize: '14px'
    },
    button: {
        background: 'white',
        color: '#033563',
        padding: '10px 15px',
        border: '1px solid #033563',
        borderRadius: '4px',
        cursor: 'pointer',
        marginTop: '10px',
    }
};
export default CreateStudySession;