import React, { useContext, useState, FormEvent } from "react";
import Modal from "react-modal";
import styles from "./styles.module.scss";
import { toast } from "react-toastify";
import { AuthContext } from "@/contexts/AuthContext";
import { Input } from "../Input";

interface ModalAddClientProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export default function ModalAddCar({
  isOpen,
  onRequestClose,
}: ModalAddClientProps) {
  const [placa, setPlaca] = useState("");
  const [marcaModelo, setMarcaModelo] = useState("");
  const [anoFabricacao, setAnoFabricacao] = useState("");
  const [kmAtual, setKmAtual] = useState("");
  const [loading, setLoading] = useState(false);

  const customStyles = {
    content: {
      top: "25%",
      bottom: "auto",
      left: "25%",
      right: "auto",
      width: "50%",
      height: "55vh",
      padding: "0",
      border: "none",
      background: "none",
    },
  };

  const { CreateCar } = useContext(AuthContext);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (
      placa === "" ||
      marcaModelo === "" ||
      anoFabricacao === "" ||
      kmAtual === ""
    ) {
      toast.error("Preencha todos os campos");
      return;
    }

    setLoading(true);

    let data = {
      placa,
      marcaModelo,
      anoFabricacao: parseInt(anoFabricacao),
      kmAtual: parseFloat(kmAtual),
    };

    await CreateCar(data);

    setLoading(false);
    onRequestClose();
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={customStyles}>
      <div className={styles.container}>
        <div className={styles.registerContainer}>
          <div className={styles.title}>
            <h1>Cadastrar novo veiculo</h1>
          </div>
          <form onSubmit={handleSubmit}>
            <div className={styles.inputWrapper}>
              <Input
                placeholder="Digite a placa do veiculo"
                type="text"
                value={placa}
                onChange={(e) => setPlaca(e.target.value)}
              />
              <Input
                placeholder="Digite o modelo do veiculo"
                type="text"
                value={marcaModelo}
                onChange={(e) => setMarcaModelo(e.target.value)}
              />
            </div>

            <div className={styles.inputWrapper}>
              <Input
                placeholder="Digite o ano de fabricação"
                type="text"
                value={anoFabricacao}
                onChange={(e) => setAnoFabricacao(e.target.value)}
              />
              <Input
                placeholder="Digite os Km atuais"
                type="text"
                value={kmAtual}
                onChange={(e) => setKmAtual(e.target.value)}
              />
            </div>

            <button type="submit">Cadastrar</button>
          </form>
        </div>
      </div>
    </Modal>
  );
}
