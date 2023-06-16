import { Input } from "@/components/UI/Input";
import styles from "./styles.module.scss";
import Head from "next/head";
import { BsGeoAltFill } from "react-icons/bs";
import { Button } from "@/components/UI/Button/Index";
import { Navbar } from "@/components/Header";

export default function ClientRegister() {
  return (
    <>
      <Head>
        <title>Easy Route - Cadastro de cliente</title>
      </Head>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.registerContainer}>
      <div className={styles.logo}>
          <BsGeoAltFill />
          <h1>Cadastre-se como usuario</h1>
        </div>
        <form>
          <Input placeholder="Digite o nome do cliente" type="text" />
          <Input placeholder="Numero do documento" type="text" />
          <Input placeholder="Tipo de documento" type="text" />
          <Input placeholder="Logradouro" type="text" />
          <Input placeholder="Bairro" type="text" />
          <Input placeholder="Cidade" type="text" />
          <Input placeholder="Estado" type="text" maxLength={3} />
        </form>
          <Button>Cadastrar</Button>
        </div>
      </div>
    </>
  );
}
