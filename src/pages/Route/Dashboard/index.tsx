import React ,{useState, useEffect, useContext} from 'react';
import { Navbar } from "@/components/Header";
import Head from "next/head";
import styles from './styles.module.scss';
import { Input } from "@/components/UI/Input";
import { useRouter } from "next/router";
import { AuthContext } from '@/contexts/AuthContext';
import { setupAPIClient } from '@/services/api';

export default function Dashboard(){

const router = useRouter();
  const [idCondutor, setDriverId] = useState('');
  const [idCliente, setClientId] = useState('');
  const [idVeiculo, setVeiculoId] = useState('');
  const [idRoute, setIdRoute] = useState('');
  const [fimDeslocamento, setFimDeslocamento ] = useState('');
  const [observacao, setObservacao ] = useState('');

  const [nome, setNome] =useState('');
  const [logradouro, setLogradouro] = useState('');
  const [numero, setNumero] = useState('');
  const [bairro, setBairro ] = useState('');
  const [cidade, setCidade ] = useState('');
  const [uf, setUf ] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const apiClient = setupAPIClient();
      const clientId = idCliente?.toString();
      
      if (clientId) {
        const response = await apiClient.get(`/Cliente/${clientId}`);
        const {
          nome,
          logradouro,
          numero,
          bairro,
          cidade,
          uf
        } = response.data;
  
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
  

  

  useEffect(() =>{
    const { idVeiculo, idCliente, idCondutor, idRoute } = router.query;
    if(idVeiculo) setVeiculoId(idVeiculo.toString())
    if(idCliente) setClientId(idCliente.toString())
    if(idCondutor) setDriverId(idCondutor.toString())
    if(idRoute) setIdRoute(idRoute.toString())
})









    return(
        <>
        <Head>
        <title>Dashboard | Controle de rotas</title>
      </Head>
      <Navbar />
      <main className={styles.mainContainer}>
        <div className={styles.navLeft}>
        <Input type="text" value={idVeiculo} disabled />
          <Input type="text" value={idCliente} disabled />
          <Input type="text" value={idCondutor} disabled />
          <Input type="text" value={nome} disabled />
          <Input type="text" value={numero} disabled />
          <Input type="text" value={logradouro} disabled />
          <Input type="text" value={bairro} disabled />
          <Input type="text" value={cidade} disabled />
          <Input type="text" value={uf} disabled />
          <Input type="datetime-local" value={fimDeslocamento}  />
          <textarea value={observacao}  />
        </div>
        <div className={styles.mapContainer}>

        </div>
      </main>
        </>
    )
}