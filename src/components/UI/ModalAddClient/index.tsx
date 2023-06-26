import React, { useContext, useState, FormEvent } from "react";
import Modal from "react-modal";
import { AuthContext } from "@/contexts/AuthContext";
import styles from "./styles.module.scss";
import { toast } from "react-toastify";
import { Input } from "../Input";

interface ModalAddClientProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export default function ModalAddClient({
  isOpen,
  onRequestClose,
}: ModalAddClientProps) {
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

  const { signUp } = useContext(AuthContext);

  const [nome, setNome] = useState("");
  const [numeroDocumento, setNumeroDocumento] = useState("");
  const [tipoDocumento, setTipoDocumento] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [numero, setNumero] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [uf, setUf] = useState("");

  const [loading, setLoading] = useState(false);

  async function handleSignUp(event: FormEvent) {
    event.preventDefault();

    if (
      nome === "" ||
      numeroDocumento === "" ||
      tipoDocumento === "" ||
      logradouro === "" ||
      bairro === "" ||
      cidade === "" ||
      uf === "" ||
      numero === ""
    ) {
      toast.error("Preencha todos os campos");
      return;
    }

    setLoading(true);

    let data = {
      nome,
      numeroDocumento,
      tipoDocumento,
      logradouro,
      numero,
      bairro,
      cidade,
      uf,
    };
    await signUp(data);
    setLoading(false);
    onRequestClose();
  }

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={customStyles}>
      <div className={styles.container}>
        <div className={styles.registerContainer}>
          <div className={styles.title}>
            <h1>Cadastrar novo usuário</h1>
          </div>
          <form onSubmit={handleSignUp}>
            <div className={styles.inputWrapper}>
              <Input
                placeholder="Digite o nome do cliente"
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
              <Input
                placeholder="Número do documento"
                type="text"
                value={numeroDocumento}
                onChange={(e) => setNumeroDocumento(e.target.value)}
              />
            </div>

            <div className={styles.inputWrapper}>
              <Input
                placeholder="Tipo de documento"
                type="text"
                value={tipoDocumento}
                onChange={(e) => setTipoDocumento(e.target.value)}
              />
              <Input
                placeholder="Logradouro"
                type="text"
                value={logradouro}
                onChange={(e) => setLogradouro(e.target.value)}
              />
            </div>
            <div className={styles.inputWrapper}>
              <Input
                placeholder="Número"
                type="number"
                value={numero}
                onChange={(e) => setNumero(e.target.value)}
              ></Input>
              <Input
                placeholder="Bairro"
                type="text"
                value={bairro}
                onChange={(e) => setBairro(e.target.value)}
              />
            </div>
            <div className={styles.inputWrapper}>
              <Input
                placeholder="Cidade"
                type="text"
                value={cidade}
                onChange={(e) => setCidade(e.target.value)}
              />
              <Input
                placeholder="Estado"
                type="text"
                maxLength={2}
                value={uf}
                onChange={(e) => setUf(e.target.value)}
              />
            </div>
            <button type="submit">Cadastrar</button>
          </form>
        </div>
      </div>
    </Modal>
  );
}
