import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './PaymentSelection.css';

interface PaymentSelectionProps {
  onSelect: (method: string, navigate: ReturnType<typeof useNavigate>) => void;
  totalAmount: number;
}

const PaymentSelection: React.FC<PaymentSelectionProps> = ({ onSelect, totalAmount }) => {
  const navigate = useNavigate();

  const handleSelect = (method: string) => {
    onSelect(method, navigate);
  };

  return (
    <motion.div
      className="payment-selection"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <button className="back-button" onClick={() => navigate(-1)}>← Назад</button>
      <h1>Выбор способа оплаты</h1>
      <div>Итоговая сумма к оплате: {totalAmount}₽</div>
      <div className="buttons">
        <button onClick={() => handleSelect('cash')}>Наличные</button>
        <button onClick={() => handleSelect('card')}>Карта</button>
      </div>
    </motion.div>
  );
};

export default PaymentSelection;
