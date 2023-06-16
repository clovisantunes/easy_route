import { useContext, FormEvent, useState } from "react";
import { Input } from "@/components/UI/Input";
import styles from "./styles.module.scss";
import Head from "next/head";
import { BsGeoAltFill } from "react-icons/bs";
import { Button } from "@/components/UI/Button/Index";
import { Navbar } from "@/components/Header";
import { AuthContext } from "@/contexts/AuthContext";

export default function ClientRegister() {
  const { signUp } = useContext(AuthContext);

  const [nome, setnome] = useState("");
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

   if(nome === '' ||numeroDocumento === '' || tipoDocumento === '' || logradouro === '' ||bairro === '' ||cidade === '' ||uf === ''|| numero ===''){
    alert('Preencha todos os campos')
    return;
   }

   setLoading(true);

   let data= {
    nome,
    numeroDocumento,
    tipoDocumento,
    logradouro,
    numero,
    bairro,
    cidade,
    uf
   }
   await signUp(data)
   }



  return (
    <>
      <Head>
        <title>Easy Route - Cadastro de cliente</title>
      </Head>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.registerContainer}>
          <div className={styles.containerLeft}></div>
          <div className={styles.logo}>
            <BsGeoAltFill />
            <h1>Cadastre-se como usuario</h1>
          </div>
          <form onSubmit={handleSignUp}>
            <Input
              placeholder="Digite o nome do cliente"
              type="text"
              value={nome}
              onChange={(e) => setnome(e.target.value)}
            />
            <Input
              placeholder="Numero do documento"
              type="text"
              value={numeroDocumento}
              onChange={(e) => setNumeroDocumento(e.target.value)}
            />
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
            <Input 
            placeholder="Numero" 
            type="number"
            value={numero}
            onChange={(e) => setNumero(e.target.value)}
            />
            <Input 
            placeholder="Bairro" 
            type="text" 
            value={bairro}
            onChange={(e) => setBairro(e.target.value)}
            />
            <Input 
            placeholder="Cidade" 
            type="text" 
            value={cidade}
            onChange={(e) => setCidade(e.target.value)}
            />
            <Input 
            placeholder="Estado" 
            type="text" 
            maxLength={3}
            value={uf}
            onChange={(e) => setUf(e.target.value)}
            />
            <Button
            
            >Cadastrar</Button>
          </form>
        </div>
      </div>
    </>
  );
}
