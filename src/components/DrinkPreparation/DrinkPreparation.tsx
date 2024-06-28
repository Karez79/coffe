import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './DrinkPreparation.css';
import emulator from '../../emulator';

interface DrinkPreparationProps {
  drinkIndex: number | null;
  cart: { drink: string; price: number; quantity: number }[];
}

const DrinkPreparation: React.FC<DrinkPreparationProps> = ({ drinkIndex, cart }) => {
  const [status, setStatus] = useState('Приготовление напитка...');
  const navigate = useNavigate();

  useEffect(() => {
    if (drinkIndex !== null) {
      console.log(`Starting preparation for drink index: ${drinkIndex}`);
      emulator.Vend(drinkIndex, (result: boolean) => {
        setStatus(result ? 'Ваш напиток готов!' : 'Ошибка приготовления напитка');
        console.log(`Drink preparation result: ${result ? 'success' : 'failure'}`);
      });
    }
  }, [drinkIndex]);

  const handleOrderAgain = () => {
    navigate('/drink-selection');
  };

  return (
    <motion.div
      className="drink-preparation"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <button className="back-button" onClick={() => navigate(-1)}>← Назад</button>
      <h1>{status}</h1>
      {status === 'Ваш напиток готов!' && (
        <button onClick={handleOrderAgain}>Заказать еще раз?</button>
      )}
    </motion.div>
  );
};

export default DrinkPreparation;
