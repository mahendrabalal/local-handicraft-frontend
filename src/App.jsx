import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/Home';
import DashboardPage from './pages/DashboardPage';
import IsPrivate from './components/IsPrivate';
import Footer from './components/Footer';
import PrivacyPolicy from './pages/PrivacyPolicy';
import ProductList from './components/ProductList';
import NotFoundPage from './pages/NotFoundPage';
import ProfilePage from './pages/ProfilePage';
import ProductDetails from './pages/ProductDetails';
import Checkout from './pages/Checkout';
import IsAnon from './components/IsAnon';
import Contact from './pages/ContactUs';
import TermsAndConditions from './pages/TermsAndConditions';

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
          <Route path="/dashboard" element={<IsPrivate><DashboardPage /></IsPrivate>} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/profile" element={<IsPrivate><ProfilePage /></IsPrivate>} />
          <Route path='/products' element={<IsAnon><ProductList /></IsAnon>} />
          <Route path='/products/:id' element={<ProductDetails />} />
          <Route path='/checkout/:productId' element={<Checkout />} />
          <Route path='/terms-and-conditions' element={<TermsAndConditions />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
