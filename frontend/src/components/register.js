import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Registration = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [school, setSchool] = useState('');
    const [major, setMajor] = useState('');
    const [year, setYear] = useState('');
    const navigate = useNavigate();


    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/register/', {
                username,
                password,
                email,
                first_name: firstName,
                last_name: lastName,
                school,
                major,
                year,
            });

            const token = response.data.token;
            localStorage.setItem('token', token);

            navigate('/sessions');
        } catch (error) {
            console.error(error);
            // Handle registration error 
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
            <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First Name" />
            <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last Name" />
            <input type="text" value={school} onChange={(e) => setSchool(e.target.value)} placeholder="School" />
            <input type="text" value={major} onChange={(e) => setMajor(e.target.value)} placeholder="Major" />
            <input type="text" value={year} onChange={(e) => setYear(e.target.value)} placeholder="Graduation Year" />
            <button type="submit">Register</button>
        </form>
    );
};

export default Registration;
