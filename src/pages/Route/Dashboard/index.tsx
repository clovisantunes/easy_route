import React, { useState, useEffect, useContext } from "react";
import { Navbar } from "@/components/Header";
import Head from "next/head";
import styles from "./styles.module.scss";
import { Input } from "@/components/UI/Input";
import  Router,{ useRouter } from "next/router";
import { AuthContext } from "@/contexts/AuthContext";
import { setupAPIClient } from "@/services/api";
import { Button } from "@/components/UI/Button/Index";
import MapPage from "@/components/Map";
import { toast } from "react-toastify";

export default function Dashboard() {
  const router = useRouter();
  const [idCondutor, setDriverId] = useState("");
  const [idCliente, setClientId] = useState("");
  const [idVeiculo, setVeiculoId] = useState("");
  const [idRoute, setIdRoute] = useState("");
  const [fimDeslocamento, setFimDeslocamento] = useState("");
  const [observacao, setObservacao] = useState("");
  const [kmFinal, setKmFinal ] = useState('');

  const [nome, setNome] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [numero, setNumero] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [uf, setUf] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const apiClient = setupAPIClient();
      const clientId = idCliente?.toString();

      if (clientId) {
        const response = await apiClient.get(`/Cliente/${clientId}`);
        const { nome, logradouro, numero, bairro, cidade, uf } = response.data;

        setNome(nome);
        setLogradouro(logradouro);
        setNumero(numero);
        setBairro(bairro);
        setCidade(cidade);
        setUf(uf);
      }
    };

    fetchData();
  }, [idCliente]);

  useEffect(() => {
    const { idVeiculo, idCliente, idCondutor, idRoute } = router.query;
    if (idVeiculo) setVeiculoId(idVeiculo.toString());
    if (idCliente) setClientId(idCliente.toString());
    if (idCondutor) setDriverId(idCondutor.toString());
    if (idRoute) setIdRoute(idRoute.toString());
  });


async function handleSetRouter(id, kmFinal, fimDeslocamento, observacao){
  try{
    const apiClient = setupAPIClient();
    const RouterId = idRoute;

    const routeData = {
      id: RouterId,
      kmFinal,
      fimDeslocamento,
      observacao
    };
    const response = await apiClient.put(`/Deslocamento/${RouterId}/EncerrarDeslocamento`, routeData)
    if (response.status === 200){
      toast.success("Finalizado com sucesso")
      Router.push('/SelectClient')
    }else{
      toast.error("Erro ao finalziar.")
    }
  }catch(err){
    console.log("Erro ao finalizar", err)
  }
}

function handleClick() {
  handleSetRouter(idRoute, kmFinal, fimDeslocamento, observacao);
  
}

  return (
    <>
      <Head>
        <title>Dashboard | Controle de rotas</title>
      </Head>
      <Navbar />
      <main className={styles.mainContainer}>
        <div className={styles.navLeft}>
          <form>
          <Input type="text" value={idVeiculo} disabled />
          <Input type="text" value={idCliente} disabled />
          <Input type="text" value={idCondutor} disabled />
          <Input type="text" value={nome} disabled />
          <Input type="text" value={numero} disabled />
          <Input type="text" value={logradouro} disabled />
          <Input type="text" value={bairro} disabled />
          <Input type="text" value={cidade} disabled />
          <Input type="text" value={uf} disabled />
          <Input
            type="datetime-local"
            value={fimDeslocamento}
            onChange={(e) => setFimDeslocamento(e.target.value)}
          />
          <Input
            type="number"
            value={kmFinal}
            onChange={(e) => setKmFinal(e.target.value)}
          />
          <textarea
            value={observacao}
            onChange={(e) => setObservacao(e.target.value)}
          />
          <div>
            <Button type="button" onClick={handleClick}>Finalizar</Button>
          </div>
          </form>
        </div>
        <div className={styles.mapContainer}>
          <MapPage />
        </div>
      </main>
    </>
  );
}
