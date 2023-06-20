import React, { useState, useContext, useEffect } from 'react';
import { Button } from '../Button/Index';
import styles from './styles.module.scss';
import { AuthContext } from '@/contexts/AuthContext';
import Modal from 'react-modal';

interface ModalCarProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onSelectCar: (car: any) => void; 
}

export default function ModalCar({ isOpen, onRequestClose, onSelectCar }: ModalCarProps) {
    const [cars, setCars] = useState<any[]>([]);
    const { GetCars } = useContext(AuthContext);


    useEffect(() => {
      async function fetchClients() {
        try {
          const response = await GetCars({
          id: 0,
          placa: '',
          marcaModelo: '',
          anoFabricacao: 0,
          kmAtual: 0
          });
          setCars(response);
        } catch (err) {
          console.log('Erro ao carregar clientes', err);
        }
      }
  
      fetchClients();
    }, []);
    
 
    const customStyles = {
    content: {
      top: '25%',
      bottom: 'auto',
      left: '25%',
      right: 'auto',
      width: '50%',
      height: '55vh',
      padding: '0',
      border: 'none',
      background: 'none',
    },
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={customStyles}>
      <div className={styles.container}>
        <div className={styles.carContainer}>
          <span>Carros</span>
          <div className={styles.carList}>
            {cars.map((car) => (
              <Button key={car.id} type="submit" onClick={() => onSelectCar(car)}>
               {car.marcaModelo} | {car.placa} |  {car.anoFabricacao} | {car.kmAtual}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
}
