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
import { FaTrashAlt } from 'react-icons/fa'
import { setupAPIClient } from "@/services/api";
import { toast } from "react-toastify";
import Link from "next/link";

export default function SelectClient() {
  Modal.setAppElement("#__next");

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedClient, setSelectedClient] = useState<any>(null);
  const [modalAddClientVisible, setmodalAddClientVisible] = useState(false);
  const [modalCarVisible, setModalCarVisible] = useState(false);
  const [selectedCar, setSelectedCar] = useState<any>(null);
  const [modalAddCarVisible, setmodalAddCarVisible] = useState(false);


  const saveClientIdToLocalStorage = (clientId) => {
    localStorage.setItem("clientId", clientId);
  };
  

  const saveCarIdToLocalStorage = (carId) => {
    localStorage.setItem("carId", carId);
  };
  

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
    saveClientIdToLocalStorage(client.id);
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
    saveCarIdToLocalStorage(car.id);
    closeModalCar();
  };

  const openAddCarModal = () => {
    setmodalAddCarVisible(true);
  };
  const closeAddCarModal = () => {
    setmodalAddCarVisible(false);
  };


  async function handleDeleteItem(identifier) {
    const confirmed = window.confirm("Tem certeza que deseja deletar este item?");
  
    if (confirmed) {
      try {
        let id;
        let endpoint;
  
        if (identifier === "carId") {
          id = selectedCar.id;
          endpoint = "/Veiculo";
          setSelectedCar("")
        } else if (identifier === "clientId") {
          id = selectedClient.id;
          endpoint = "/Cliente";
          setSelectedClient("")
        } else {
          throw new Error("Parâmetro 'identifier' inválido");
        }
  
        const apiClient = setupAPIClient();
  
        const response = await apiClient.delete(`${endpoint}/${id}`, {
          data: { id: id },
        });
  
        if (response.status === 200) {
          toast.success("Item deletado com sucesso!");
        } else {
          toast.error("Ocorreu um erro ao excluir o item.");
        }
      } catch (err) {
        console.log("Erro ao excluir.", err);
      }
    }
  }
  

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
                  <Button 
                  type='button' 
                  className={styles.deleteIcon}
                  onClick={() => handleDeleteItem("clientId")}
                  
                  >
                    <FaTrashAlt />
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
                    <Button 
                    type='button' 
                    className={styles.deleteIcon}
                    onClick={() => handleDeleteItem("carId")}
                    >
                      <FaTrashAlt />
                    </Button>
                  </div>
                )}
              </div>
              <Button 
              type="button">
              <Link href={`/Route?idCliente=${selectedClient?.id}&idVeiculo=${selectedCar?.id}`}>
                Confirmar
              </Link>
              </Button>
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
