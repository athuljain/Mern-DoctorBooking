import { useNavigate } from "react-router-dom";

export default function AdminDashBoard() {
    const nav = useNavigate();

    function UserBtn() {
        nav('/users');
    }

    function BookingBtn() {
        nav("/bookings");
    }

    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>Admin Dashboard</h1>
            <div style={styles.buttonContainer}>
                <button onClick={UserBtn} style={styles.button}>Users</button>
                <button onClick={BookingBtn} style={styles.button}>Bookings</button>
            </div>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#2F4F4F', /* Dark Green */
        color: '#ADD8E6', /* Light Blue */
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    },
    heading: {
        marginBottom: '20px',
    },
    buttonContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px', /* Adds space between buttons */
    },
    button: {
        padding: '10px 20px',
        backgroundColor: '#4CAF50', /* Green */
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px',
        transition: 'background-color 0.3s',
    },
};
