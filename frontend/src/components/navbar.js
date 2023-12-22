import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const isLoggedIn = !!localStorage.getItem('token');

    return (
        <nav style={styles.navbar}>
            <div style={styles.brand}>
                <Link to="/" style={styles.link}>Studious</Link>
            </div>
            {/* <div style={styles.links}>
                {isLoggedIn && <Link to="/profile" style={styles.link}>Profile</Link>}
            </div> */}
        </nav>
    );
};

const styles = {
    navbar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: 'linear-gradient(to right, #0A1128, #001F54, #033563)',
        color: 'white',
        padding: '10px 20px',
    },
    brand: {
        fontSize: '30px',
    },
    links: {
        display: 'flex',
    },
    link: {
        color: 'white',
        textDecoration: 'none',
        marginLeft: '20px',
    }
};

export default Navbar;
