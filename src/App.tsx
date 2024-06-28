import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Home from './components/Home/Home';
import DrinkSelection from './components/DrinkSelection/DrinkSelection';
import PaymentSelection from './components/PaymentSelection/PaymentSelection';
import CashPayment from './components/CashPayment/CashPayment';
import CardPayment from './components/CardPayment/CardPayment';
import DrinkPreparation from './components/DrinkPreparation/DrinkPreparation';
import Cart from './components/Cart/Cart';
// import './App.css';

const App: React.FC = () => {
  const [cart, setCart] = useState<{ drink: string; price: number; quantity: number }[]>([]);
  const [selectedDrinkIndex, setSelectedDrinkIndex] = useState<number | null>(null);

  const handleSelectMode = (mode: string, navigate: any) => {
    console.log('Mode selected:', mode);
    navigate('/drink-selection');
  };

  const handleDrinkSelect = (drink: string, price: number, index: number, navigate: any) => {
    console.log('Drink selected:', drink, 'Price:', price, 'Index:', index);
    setSelectedDrinkIndex(index);
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.drink === drink);
      if (existingItem) {
        return prevCart.map((item) =>
          item.drink === drink ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { drink, price, quantity: 1 }];
      }
    });
    navigate('/payment-selection');
  };

  const handlePaymentSelection = (method: string, navigate: any) => {
    console.log('Payment method selected:', method);
    navigate(method === 'cash' ? '/cash-payment' : '/card-payment');
  };

  const handlePaymentSuccess = (navigate: any) => {
    console.log('Payment successful');
    navigate('/drink-preparation');
  };

  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <Router>
      <div className="app">
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home onSelect={handleSelectMode} />} />
            <Route path="/drink-selection" element={<DrinkSelection onDrinkSelect={handleDrinkSelect} cart={cart} />} />
            <Route path="/payment-selection" element={<PaymentSelection onSelect={handlePaymentSelection} totalAmount={totalAmount} />} />
            <Route path="/cash-payment" element={<CashPayment onSuccess={handlePaymentSuccess} amount={totalAmount} />} />
            <Route path="/card-payment" element={<CardPayment onSuccess={handlePaymentSuccess} amount={totalAmount} />} />
            <Route path="/drink-preparation" element={<DrinkPreparation drinkIndex={selectedDrinkIndex} cart={cart} />} />
            <Route path="/cart" element={<Cart cart={cart} />} />
          </Routes>
        </AnimatePresence>
      </div>
    </Router>
  );
};

export default App;
