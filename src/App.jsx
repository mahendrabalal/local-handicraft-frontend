import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/Home';
import IsAnon from './components/IsAnon';
import DashboardPage from './pages/DashboardPage';
import DashboardHome from './components/DashboardHome';
import UserProfile from './components/UserProfile';
import Settings from './components/Setting';
import IsPrivate from './components/IsPrivate';
import ConnectionStatus from './components/ConnectionStatus';
import Footer from './components/Footer';
import PrivacyPolicy from './pages/PrivacyPolicy';


import './App.css'

function App() {


  /*
  const [greeting, setGreeting] = useState(''); // State to hold greeting message
  const [loading, setLoading] = useState(true); // State to handle loading status
  const [error, setError] = useState(null); // State to handle errors


  useEffect(() => {
    // Fetch greeting from the backend when the component mounts
    const fetchGreeting = async () => {
      try {
        const data = await getGreeting(); // Fetch data from API
        setGreeting(data.message); // Set greeting message to state
      } catch (err) {
        setError('Failed to fetch greeting'); // Set error message
      } finally {
        setLoading(false); // Set loading to false after request
      }
    };

    fetchGreeting();
  }, []);

  if (loading) return <h1>Loading...</h1>; // Display loading message
  if (error) return <h1>{error}</h1>; // Display error message

*/
  return (
    <div className="App">
    <Navbar />
    <main className='main-content'>
    <Routes>      
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element = {<LoginPage />} />
      <Route path='/' element={<HomePage />} />
      <Route path='privacy-policy' element={<PrivacyPolicy />} />
      <Route path="/dashboard" element={<IsPrivate><DashboardPage /></IsPrivate>}>
        <Route path="home" element={<DashboardHome />} />
        <Route path="profile" element={<UserProfile />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
    </main>
    <Footer />
  
    <ConnectionStatus />
  </div>
  )
}

export default App
