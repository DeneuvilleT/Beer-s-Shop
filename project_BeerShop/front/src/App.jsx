import { Routes, Route } from 'react-router-dom';
import Header from './Components/UI/Header/Header';
import Home from './Container/Home/Home';
import Admin from './Container/Admin/Admin';
import Cart from './Container/Cart/Cart';
import Footer from './Components/UI/Footer/Footer';
import Profile from './Container/Profile/Profile';
import Register from './Container/Register/Register';
import PageNotFound from './Components/UI/PageNotFound/PageNotFound';
import PageValidate from './Container/PageToValidate/PageValidate';



function App() {
  return (
    <>
      <Header />

      <Routes>

        <Route path='/' element={<Home />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/register' element={<Register />} />

        <Route path='*' element={<PageNotFound />} />
        <Route path='/validate' element={<PageValidate />} />
        <Route path='/validate/:email' element={<PageValidate />} />

      </Routes>

      <Footer />
    </>
  );
}

export default App;
