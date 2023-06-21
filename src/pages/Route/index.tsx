import React, { useContext, FormEvent, useState } from "react";
import Head from "next/head";
import styles from "./styles.module.scss";
import { Navbar } from "@/components/Header";
import { Input } from "@/components/UI/Input";
import { useRouter } from "next/router";
import { AuthContext } from "@/contexts/AuthContext";
import { toast } from "react-toastify";
import { Button } from "@/components/UI/Button/Index";

export default function Route() {
  const { Start } = useContext(AuthContext);
  const router = useRouter();
  const driverId =
    typeof window !== "undefined" ? localStorage.getItem("driverId") : null;

  const clientId =
    typeof window !== "undefined" ? localStorage.getItem("clientId") : null;

  const carId =
    typeof window !== "undefined" ? localStorage.getItem("carId") : null;

  const [kmInicial, setKm] = useState("");
  const [inicioDeslocamento, setData] = useState("");
  const [checkList, setCheckList] = useState("");
  const [motivo, setMotivo] = useState("");
  const [observacao, setObservacao] = useState("");
  const [idCondutor, setDriverId] = useState(driverId);
  const [idCliente, setClientId] = useState(clientId);
  const [idVeiculo, setVeiculoID] = useState(carId);

  async function handleStart(event: FormEvent) {
    event.preventDefault();
    if (
      kmInicial === "" ||
      inicioDeslocamento === "" ||
      checkList === "" ||
      motivo === "" ||
      observacao === ""
    ) {
      toast.error("Preencha todos os campos");
      return;
    }

    let data = {
      kmInicial: parseInt(kmInicial),
      inicioDeslocamento,
      checkList,
      motivo,
      observacao,
      idCondutor: parseInt(idCondutor),
      idVeiculo: parseInt(idVeiculo),
      idCliente: parseInt(idCliente),
    };
    console.log(data);
    await Start(data);
  }

  return (
    <>
      <Head>
        <title>Informações da Rota</title>
      </Head>
      <Navbar />
      <div className={styles.container}>
        <form onSubmit={handleStart}>
          <div className={styles.containerInputs}>
            <Input
              className={styles.inputItems}
              placeholder="Digite os Km inicais do veiculo"
              type="number"
              value={kmInicial}
              onChange={(e) => setKm(e.target.value)}
            />
            <Input
              className={styles.inputItems}
              type="datetime-local"
              value={inicioDeslocamento}
              onChange={(e) => setData(e.target.value)}
            />
          </div>
          <div className={styles.containerInputs}>
            <Input
              className={styles.inputItems}
              type="text"
              placeholder="Digite o checkList"
              value={checkList}
              onChange={(e) => setCheckList(e.target.value)}
            />
            <Input
              className={styles.inputItems}
              type="text"
              placeholder="Digite o motivo da visita"
              value={motivo}
              onChange={(e) => setMotivo(e.target.value)}
            />
          </div>
          <div className={styles.containerInputs}>
            <Input
              className={styles.inputItems}
              type="text"
              placeholder="Observação"
              value={observacao}
              onChange={(e) => setObservacao(e.target.value)}
            />
            <Input
              className={`${styles.inputItems} ${styles.disabledInput}`}
              type="text"
              placeholder="idcondutor"
              value={idCondutor}
              disabled
            />
          </div>
          <div className={styles.containerInputs}>
            <Input
              className={`${styles.inputItems} ${styles.disabledInput}`}
              type="number"
              placeholder="idveiculo"
              value={idVeiculo}
              disabled
            />
            <Input
              className={`${styles.inputItems} ${styles.disabledInput}`}
              type="text"
              placeholder="idClient"
              value={idCliente}
              disabled
            />
          </div>
          <Button type="submit" className={styles.buttonConfirm}>Iniciar</Button>
        </form>
      </div>
    </>
  );
}
