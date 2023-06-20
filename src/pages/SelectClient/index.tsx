import React, {useState} from 'react';
import Head from 'next/head';
import styles from './styles.module.scss';
import { Navbar } from '@/components/Header';
import { Input } from '@/components/UI/Input';
import { Button } from '@/components/UI/Button/Index';
import Modal from 'react-modal';
import { ModalClient } from '@/components/UI/ModalClient';






export default function SelectClient(){
    Modal.setAppElement('#__next');

    const [modalVisible, setModalVisible ] = useState(false);

    const openModal = () => {
        setModalVisible(true);
      };
      const closeModal = () => {
        setModalVisible(false);
      };


    return(
        <>
            
            <Head>
        <title>Dashboard - Condutor </title>
      </Head>
      <Navbar />
          <div className={styles.container}>
            <div className={styles.containerCenter}> 

                <div className={styles.itens}>
                    <form>

                    <Input 
                    type='text'
                    placeholder='Selecione um cliente...'
                    onClick={openModal}
                    />
                    <Button type='submit'>Confirmar</Button>
                    </form>
                </div>
            </div>
                { modalVisible && (
                    <ModalClient 
                    />
                )}
          </div>
        </>
    )
}