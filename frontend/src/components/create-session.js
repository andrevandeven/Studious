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
        <form onSubmit={handleSubmit}>
            <input type="text" value={className} onChange={(e) => setClassName(e.target.value)} placeholder="Class Name" />
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description"></textarea>
            <input type="text" value={sessionTime} onChange={(e) => setSessionTime(e.target.value)} placeholder="Class Name" />
            <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Class Name" />
            <button type="submit">Create Session</button>
        </form>
    );
};

export default CreateStudySession;