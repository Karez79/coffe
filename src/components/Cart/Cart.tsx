import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Cart.css';

interface CartProps {
  cart: { drink: string; price: number; quantity: number }[];
}

const Cart: React.FC<CartProps> = ({ cart }) => {
  const navigate = useNavigate();
  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="cart">
      <button className="back-button" onClick={() => navigate(-1)}>← Назад</button>
      <h1>Корзина</h1>
      <ul>
        {cart.map((item) => (
          <li key={item.drink}>
            {item.drink} - {item.quantity} шт. - {item.price * item.quantity}₽
          </li>
        ))}
      </ul>
      <div className="total-amount">Итоговая сумма: {totalAmount}₽</div>
      <button className="proceed-payment-button" onClick={() => navigate('/payment-selection')}>Перейти к оплате</button>
    </div>
  );
};

export default Cart;
