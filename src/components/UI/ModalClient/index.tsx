import React, { useState, useContext, useEffect } from 'react';
import { Button } from '../Button/Index';
import styles from './styles.module.scss';
import { AuthContext } from '@/contexts/AuthContext';
import Modal from 'react-modal';


interface ModalGetClient {
    isOpen: boolean;
    onRequestClose: () => void;
    onSelectClient: (client: any) =>void;
  }

export function ModalClient( {isOpen, onRequestClose, onSelectClient}: ModalGetClient) {
  const [clients, setClients] = useState<any[]>([]);
  const { GetClients } = useContext(AuthContext);



  
  useEffect(() => {
    async function fetchClients() {
      try {
        const response = await GetClients({
        id: 0,
        numeroDocumento: '',
        tipoDocumento: '',
        nome: '',
        logradouro: '',
        numero: '',
        bairro: '',
        cidade: '',
        uf: ''
        });
        setClients(response);
      } catch (err) {
        console.log('Erro ao carregar clientes', err);
      }
    }

    fetchClients();
  }, []);
  
  const customStyles = {
    content:{
        top: '25%',
        bottom: 'auto',
        left: '25%',
        right: 'auto',
        width: '50%',
        height: '55vh',
        padding: '0',
        border:'none',
        background: 'none',
    }
}

  return (
    <Modal
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    style={customStyles}
    >
    <div className={styles.container}>
      <div className={styles.clientContainer}>
        <span>Clientes</span>
        <div className={styles.clientList}>
          {clients.map((client) => (
            <Button key={client.id} type="submit"  onClick={() => onSelectClient(client)}>
              {client.nome} | {client.logradouro} | {client.numero} |{client.bairro} |{client.cidade}  | {client.uf }   
            </Button>
          ))}
        </div>
      </div>
      </div>
      </Modal>
  );
}
