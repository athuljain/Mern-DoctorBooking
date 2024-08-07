import { useNavigate } from "react-router-dom"

export default function AdminDashBoard(){
    const nav=useNavigate()

    function UserBtn(){
        nav('/users')
    }
    function BookingBtn(){
        nav("/bookings")
    }
    return(
        <div>
            <h1>Admin Dashboard</h1>
            <button onClick={UserBtn}>Users</button>
            <button onClick={BookingBtn}>Bookings</button>
        </div>
    )
}