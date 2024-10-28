import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const Profile = () => {

    const navigate = useNavigate();

    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const handleLogout = () => {
        localStorage.removeItem("token"); // Remove the token from local storage
        navigate("/signin"); // Redirect to the sign-in page
      };

    // Function to fetch user profile data
    const fetchProfile = async () => {
        try {
            const token = localStorage.getItem('token'); // Fetch token from localStorage

            const response = await fetch('http://localhost:4000/data/profile', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`, // Attach token in the Authorization header
                },
            });

            const data = await response.json();
            if (response.ok) {
                setUserData(data); // Set the fetched data in state
            } else {
                setError(data.message);
            }
        } catch (error) {
            console.error('Error fetching profile:', error);
            setError("Failed to fetch profile.");
        } finally {
            setLoading(false);
        }
    };

    // Fetch profile on component mount
    useEffect(() => {
        fetchProfile();
    }, []);

    if (loading) return <p>Loading profile...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="pt-6 text-white">
       

            {userData ? (
                <div>
                    <h2 className="py-3 ">Welcome back, {userData.firstName} {userData.lastName}!</h2>
                    <p><strong>Email:</strong> {userData.email}</p>
                    <p><strong>Mobile:</strong> {userData.mobile}</p>
                    <p><strong>Gender:</strong> {userData.gender}</p>
                    <p><strong>Date of Birth:</strong> {new Date(userData.dateOfBirth).toLocaleDateString()}</p>
                    <p><strong>Address:</strong> {userData.address}, {userData.city}, {userData.state}, {userData.country}, {userData.pinCode}</p>
                </div>
            ) : (
                <p>No user data available.</p>
            )}
        </div>
    );
};

export default Profile;
