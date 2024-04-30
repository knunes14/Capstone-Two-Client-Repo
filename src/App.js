import Home from './pages/Home';
import ProductList from './pages/ProductList';
import Product from './pages/Product';
import Register from './pages/Register';
import Login from './pages/Login';
import Cart from './pages/Cart';
import Success from './pages/Success';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import WetsuitSizeForm from './pages/WetsuitSizeForm.js';
import WetsuitResultPage from './pages/WetsuitResultPage.js';

const App = () => {
  const user = useSelector((state) => state.user.currentUser)

  const handleFormSubmit = (formData) => {
    console.log("Form data submitted:", formData);
    // Additional logic for form submission can be added here
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/:category" element={<ProductList />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/success" element={<Success />} />
        <Route path="/login" element={user ? <Navigate to="/" /> :<Login />} />
        <Route path="/register" element={user ? <Navigate to="/" /> :<Register />} />
        <Route path="/sizeform" element={<WetsuitSizeForm />} />
        <Route path="/results" element={<WetsuitResultPage />} />
      </Routes>
    </Router>
  );
};

export default App;


