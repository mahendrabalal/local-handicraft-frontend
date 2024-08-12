import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/Home';
import DashboardPage from './pages/DashboardPage';
import UserProfile from './components/UserProfile';
import Settings from './components/Setting';
import IsPrivate from './components/IsPrivate';
import Footer from './components/Footer';
import PrivacyPolicy from './pages/PrivacyPolicy';
import ProductList from './components/ProductList';
import NotFoundPage from './pages/NotFoundPage';
import ProfilePage from './pages/ProfilePage';
import ProductDetails from './pages/ProductDetails';

import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <main className='main-content'>
        <Routes>     
          <Route path='/' element={<HomePage />} /> 
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path='/privacy-policy' element={<PrivacyPolicy />} />
          <Route path="/dashboard" element={<IsPrivate><DashboardPage /></IsPrivate>}>
            <Route path="settings" element={<Settings />} />
          </Route>
          <Route path="/profile" element={<IsPrivate><ProfilePage /></IsPrivate>} />
          <Route path='/products' element={<ProductList />} />
          <Route path='/products/:id' element={<ProductDetails />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
