import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './CashPayment.css';
import emulator from '../../emulator';

interface CashPaymentProps {
  onSuccess: (navigate: ReturnType<typeof useNavigate>) => void;
  amount: number;
}

const CashPayment: React.FC<CashPaymentProps> = ({ onSuccess, amount }) => {
  const [receivedAmount, setReceivedAmount] = useState(0);
  const [change, setChange] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const stopCashin = emulator.StartCashin((receivedAmount: number) => {
      console.log(`Received cash amount: ${receivedAmount}₽`);
      setReceivedAmount((prevAmount) => prevAmount + receivedAmount);
    });

    return () => {
      stopCashin();
    };
  }, []);

  const handlePayment = () => {
    if (receivedAmount >= amount) {
      const changeAmount = receivedAmount - amount;
      setChange(changeAmount);
      console.log(`Payment successful with amount: ${receivedAmount}₽. Change: ${changeAmount}₽`);
      onSuccess(navigate);
    } else {
      console.log(`Insufficient amount: ${receivedAmount}₽`);
    }
  };

  return (
    <motion.div
      className="cash-payment"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <button className="back-button" onClick={() => navigate(-1)}>← Назад</button>
      <h1>Оплата наличными</h1>
      <div>Внесенная сумма: {receivedAmount}₽</div>
      <div>Необходимо оплатить: {amount}₽</div>
      {change > 0 && <div>Сдача: {change}₽</div>}
      <button onClick={handlePayment}>Подтвердить оплату</button>
    </motion.div>
  );
};

export default CashPayment;
