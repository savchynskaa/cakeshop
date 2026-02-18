import './index.css'
import { BrowserRouter, Routes, Route } from "react-router";
import { Main } from './pages/Main';
import { Login } from './pages/Login';
import { MyOrders } from './pages/MyOrders';
import { Register } from './pages/Register';
import { Catalog } from './pages/Catalog';
import { Header } from './components/Header/Header';
import { Orders } from './pages/Orders';
import { OrderForm } from './pages/OrderForm';
import { Footer } from './components/Footer/Footer';
import { Reviews } from './pages/Reviews';

function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/my-orders" element={<MyOrders />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/order-form" element={<OrderForm />} />
        <Route path="/order-form/:id" element={<OrderForm />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reviews" element={<Reviews />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  )
}

export default App
