import React, { useState } from "react";
import Head from "next/head";
import styles from "./styles.module.scss";
import { Navbar } from "@/components/Header";
import { Input } from "@/components/UI/Input";
import { Button } from "@/components/UI/Button/Index";
import Modal from "react-modal";
import { ModalClient } from "@/components/UI/ModalClient";
import ModalAddClient from "@/components/UI/ModalAddClient";
import ModalCar from "@/components/UI/ModalCar";
import ModalAddCar from "@/components/UI/ModalAddCar";

export default function SelectClient() {
  Modal.setAppElement("#__next");

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedClient, setSelectedClient] = useState<any>(null);
  const [modalAddClientVisible, setmodalAddClientVisible] = useState(false);
  const [modalCarVisible, setModalCarVisible] = useState(false);
  const [selectedCar, setSelectedCar] = useState<any>(null);
  const [modalAddCarVisible, setmodalAddCarVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
  };
  const openAddModal = () => {
    setmodalAddClientVisible(true);
  };
  const closeAddModal = () => {
    setmodalAddClientVisible(false);
  };
  const handleSelectClient = (client: any) => {
    setSelectedClient(client);
    closeModal();
  };

  const openModalCar = () => {
    setModalCarVisible(true);
  };
  const closeModalCar = () => {
    setModalCarVisible(false);
  };

  const handleSelectCar = (car: any) => {
    setSelectedCar(car);
    closeModalCar();
  };

  const openAddCarModal = () => {
    setmodalAddCarVisible(true);
  };
  const closeAddCarModal = () => {
    setmodalAddCarVisible(false);
  };


  return (
    <>
      <Head>
        <title>Dashboard - Condutor </title>
      </Head>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.containerCenter}>
          <div className={styles.itens}>
            <form>
              <div className={styles.itemClient}>
                <div>
                  <Input
                    type="text"
                    placeholder="Selecione um cliente"
                    value={selectedClient ? selectedClient.nome : ""}
                    onClick={openModal}
                  />
                  <Button
                    type="button"
                    className={styles.buttonAddItem}
                    onClick={openAddModal}
                  >
                    +
                  </Button>
                </div>
                {selectedClient && (
                  <div>
                    <Input
                      type="text"
                      placeholder="Selecione um veiculo"
                      value={selectedCar ? selectedCar.marcaModelo: ""}
                      onClick={openModalCar}
                    />

                    <Button 
                    type="button" 
                    className={styles.buttonAddItem}
                    onClick={openAddCarModal}
                    >
                      +
                    </Button>
                  </div>
                )}
              </div>
              <Button type="submit">Confirmar</Button>
            </form>
          </div>
        </div>
        {modalVisible && (
          <ModalClient
            isOpen={modalVisible}
            onRequestClose={closeModal}
            onSelectClient={handleSelectClient}
          />
        )}
        {modalAddClientVisible && (
          <ModalAddClient
            isOpen={modalAddClientVisible}
            onRequestClose={closeAddModal}
          />
        )}

        {modalCarVisible && (
          <ModalCar
            isOpen={modalCarVisible}
            onRequestClose={closeModalCar}
            onSelectCar={handleSelectCar}
          />
        )}
        {modalAddCarVisible &&(
          <ModalAddCar 
          isOpen={modalAddCarVisible}
          onRequestClose={closeAddCarModal}
          />
        )}


      </div>
    </>
  );
}
