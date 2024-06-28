import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './DrinkSelection.css';
import espressoImage from './../assets/espresso_yellow_cup.webp';
import cappuccinoImage from './../assets/cappuccino_yellow_cup.webp';
import latteImage from './../assets/latte_yellow_cup.webp';

interface DrinkSelectionProps {
  onDrinkSelect: (drink: string, price: number, index: number, navigate: ReturnType<typeof useNavigate>) => void;
  cart: { drink: string; price: number; quantity: number }[];
}

const DrinkSelection: React.FC<DrinkSelectionProps> = ({ onDrinkSelect, cart }) => {
  const drinks = [
    { name: 'Эспрессо', price: 79, image: espressoImage },
    { name: 'Капучино', price: 129, image: cappuccinoImage },
    { name: 'Латте', price: 129, image: latteImage },
  ];

  const navigate = useNavigate();

  const handleSelect = (drink: string, price: number, index: number) => {
    onDrinkSelect(drink, price, index, navigate);
  };

  return (
    <motion.div
      className="drink-selection"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <header className="cart-container">
        <Link to="/cart" className="view-cart-button">
          Корзина
          <span className="cart-badge">{cart.reduce((sum, item) => sum + item.quantity, 0)}</span>
        </Link>
      </header>
      <button className="back-button" onClick={() => navigate(-1)}>← Назад</button>
      <h1>Выбор напитка</h1>
      <div className="drinks">
        {drinks.map((drink, index) => (
          <div key={drink.name} className="drink" onClick={() => handleSelect(drink.name, drink.price, index)}>
            <img src={drink.image} alt={drink.name} />
            <div>{drink.name}</div>
            <div>{drink.price}₽</div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default DrinkSelection;
