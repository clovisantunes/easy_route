import React, { useContext, FormEvent, useState, useEffect } from "react";
import Head from "next/head";
import styles from "./styles.module.scss";
import { Navbar } from "@/components/Header";
import { Input } from "@/components/UI/Input";
import { useRouter } from "next/router";
import { AuthContext } from "@/contexts/AuthContext";
import { toast } from "react-toastify";
import { Button } from "@/components/UI/Button/Index";
import { api } from "@/services/apiClient";

export default function Route() {
  const { Start, getStart } = useContext(AuthContext);
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
  const [deslocamento, setDeslocamento] = useState<any[]>([]);
  const [selectedItem, setSelectedItem] = useState(null)

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

  useEffect(() => {
    async function fetchStarts() {
      try {
        const response = await getStart({
          kmInicial: 0,
          inicioDeslocamento: "",
          checkList: "",
          motivo: "",
          observacao: "",
          idCondutor: 0,
          idVeiculo: 0,
          idCliente: 0,
        });
        setDeslocamento(response);
      } catch (err) {
        console.log("Erro ao carregar atendimentos", err);
        toast.error("Erro ao carregar atendimentos!");
      }
    }
    fetchStarts();
  }, []);

  const updateFields = (selectedItem: any) => {
    if (selectedItem) {
      setKm(selectedItem.kmInicial.toString());
      setData(selectedItem.inicioDeslocamento);
      setCheckList(selectedItem.checkList);
      setMotivo(selectedItem.motivo);
      setObservacao(selectedItem.observacao);
      setDriverId(selectedItem.idCondutor);
      setVeiculoID(selectedItem.idVeiculo);
      setClientId(selectedItem.idCliente);
    } else {
      setKm("");
      setData("");
      setCheckList("");
      setMotivo("");
      setObservacao("");
      setDriverId("");
      setVeiculoID("");
      setClientId("");
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setSelectedItem(selectedValue);
    console.log('ID', selectedItem)
  };
  useEffect(() => {
    const selectedItemData = deslocamento.find((start) => start.checkList === selectedItem);
    updateFields(selectedItemData);
  }, [selectedItem, deslocamento]);
  

  return (
    <>
      <Head>
        <title>Informações da Rota</title>
      </Head>
      <Navbar />
      <div className={styles.container}>
        <form onSubmit={handleStart}>
          <h1>Selecione um atendimento</h1>
          <select
            value={selectedItem}
            onChange={handleChange}
            placeholder="Selecione um deslocamento ou crie um novo"
            className={styles.SelectItem}
          >
            <option value="">Selecione um deslocamento ou crie um novo</option>
            {deslocamento.map((start, index) => (
              <option key={`${start.checkList}-${index}`} value={start.checkList}>
                {start.checkList} {start.motivo} {start.observacao}
              </option>
            ))}
          </select>
          <div>
            <h2>Iniciar novo atendimento</h2>
          </div>
          <div className={styles.containerInputs}>
            <div className={styles.button}>
              <label htmlFor="kmInicial" className={styles.label}>
                Km Iniciais do Veículo:
              </label>
              <Input
                className={styles.inputItems}
                placeholder="Digite os Km inicais do veiculo"
                type="number"
                value={kmInicial}
                onChange={(e) => setKm(e.target.value)}
              />
            </div>
            <div className={styles.button}>
              <label htmlFor="inicioDeslocamento" className={styles.label}>
                Data de inicio:
              </label>
              <Input
                className={styles.inputItems}
                type="datetime-local"
                value={inicioDeslocamento}
                onChange={(e) => setData(e.target.value)}
              />
            </div>
          </div>
          <div className={styles.containerInputs}>
            <div className={styles.button}>
              <label htmlFor="checkList" className={styles.label}>
                Checklist:
              </label>
              <Input
                className={styles.inputItems}
                type="text"
                placeholder="Digite o checkList"
                value={checkList}
                onChange={(e) => setCheckList(e.target.value)}
              />
            </div>
            <div className={styles.button}>
              <label htmlFor="motivo" className={styles.label}>
                Motivo:
              </label>
              <Input
                className={styles.inputItems}
                type="text"
                placeholder="Digite o motivo da visita"
                value={motivo}
                onChange={(e) => setMotivo(e.target.value)}
              />
            </div>
          </div>
          <div className={styles.containerInputs}>
            <div className={styles.button}>
              <label htmlFor="observacao" className={styles.label}>
                Observação:
              </label>
              <Input
                className={styles.inputItems}
                type="text"
                placeholder="Observação"
                value={observacao}
                onChange={(e) => setObservacao(e.target.value)}
              />
            </div>
            <div className={styles.button}>
              <label htmlFor="idCondutor" className={styles.label}>
                Id do condutor:
              </label>
              <Input
                className={`${styles.inputItems} ${styles.disabledInput}`}
                type="text"
                placeholder="idcondutor"
                value={idCondutor}
                disabled
              />
            </div>
          </div>
          <div className={styles.containerInputs}>
            <div className={styles.button}>
              <label htmlFor="idVeiculo" className={styles.label}>
                Id do veiculo:
              </label>
              <Input
                className={`${styles.inputItems} ${styles.disabledInput}`}
                type="number"
                placeholder="idCeiculo"
                value={idVeiculo}
                disabled
              />
            </div>
            <div className={styles.button}>
              <label htmlFor="idClient" className={styles.label}>
                Id do cliente:
              </label>
              <Input
                className={`${styles.inputItems} ${styles.disabledInput}`}
                type="text"
                placeholder="idClient"
                value={idCliente}
                disabled
              />
            </div>
          </div>
          <Button type="submit" className={styles.buttonConfirm}>
            Iniciar
          </Button>
        </form>
      </div>
    </>
  );
}
