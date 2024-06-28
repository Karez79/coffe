import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './CardPayment.css';
import emulator from '../../emulator';

interface CardPaymentProps {
  onSuccess: (navigate: ReturnType<typeof useNavigate>) => void;
  amount: number;
}

const CardPayment: React.FC<CardPaymentProps> = ({ onSuccess, amount }) => {
  const [status, setStatus] = useState('Приложите карту');
  const [isComplete, setIsComplete] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handleCancel = () => {
      setStatus('Операция отменена');
      console.log('Card payment operation canceled');
    };
    window.addEventListener('cancel', handleCancel);

    return () => {
      window.removeEventListener('cancel', handleCancel);
    };
  }, []);

  const handlePayment = () => {
    emulator.BankCardPurchase(amount, (result: boolean) => {
      if (result) {
        setStatus('Оплата прошла успешно');
        console.log('Card payment successful');
        setTimeout(() => onSuccess(navigate), 2000);
      } else {
        setStatus('Ошибка оплаты');
        console.log('Card payment failed');
      }
      setIsComplete(true);
    }, (msg: string) => {
      setStatus(msg);
      if (msg === 'Связь с банком') {
        setMessage('Press "s" for success or "f" for failure');
      } else {
        setMessage('');
      }
    });
  };

  return (
    <motion.div
      className="card-payment"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <button className="back-button" onClick={() => navigate(-1)}>← Назад</button>
      <h1>Оплата картой</h1>
      <div>{status}</div>
      {!isComplete && <button onClick={handlePayment}>Оплатить {amount}₽</button>}
      {message && <div className="message">{message}</div>}
    </motion.div>
  );
};

export default CardPayment;
