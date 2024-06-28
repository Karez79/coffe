import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Home.css';
import logo from './../assets/logo.webp';
import monitor from './../assets/monitor.webp';

interface HomeProps {
  onSelect: (mode: string, navigate: ReturnType<typeof useNavigate>) => void;
}

const Home: React.FC<HomeProps> = ({ onSelect }) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const navigate = useNavigate();

  const handleSelectMode = (mode: string) => {
    setIsZoomed(true);
    setTimeout(() => {
      onSelect(mode, navigate);
    }, 1000);
  };

  return (
    <motion.div
      className="home"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="monitor-container"
        animate={isZoomed ? { scale: 5, y: -300 } : { scale: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <img src={monitor} alt="Monitor" className="monitor-img" />
        <div className="monitor-content">
          <img src={logo} alt="Logo" className="logo" />
          <div className="buttons">
            <button onClick={() => handleSelectMode('takeaway')}>С собой</button>
            <button onClick={() => handleSelectMode('here')}>Здесь</button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Home;
