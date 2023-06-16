import { Input } from "@/components/UI/Input";
import styles from "./styles.module.scss";
import Head from "next/head";
import { BsGeoAltFill } from "react-icons/bs";
import { Button } from "@/components/UI/Button/Index";
import { Navbar } from "@/components/Header";
import Link from "next/link";

export default function ClientSignUp() {
  return (
    <>
      <Head>
        <title>Easy Route - Login de cliente</title>
      </Head>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.registerContainer}>
          <div className={styles.containerLeft}>

            
          </div>
      <div className={styles.logo}>
          <BsGeoAltFill />
          <h1>Easy Route</h1>
        </div>
        <form>
          <Input placeholder="Digite o nome do cliente" type="text" />
          <Input placeholder="Numero do documento" type="text" />
        </form>
          <Button>Login</Button>
          <span>
            <Link href={"/ClientRegister"} legacyBehavior>
            Não possui conta? Cadastre-se
            </Link>
            </span>
        </div>
      </div>
    </>
  );
}
