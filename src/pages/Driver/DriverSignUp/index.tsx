import { Navbar } from "@/components/Header";
import Head from "next/head";
import styles from './styles.module.scss';
import { Button } from "@/components/UI/Button/Index";
import Link from "next/link";
import { Input } from "@/components/UI/Input";
import { useState } from "react";

export default function DriverSignUp(){


    const [nome, setnome] = useState("");
    const [numeroHabilitação, setNumeroHabilitação] = useState("");
    const [categoriaHabilitação, setCategoriaHabilitação] = useState("");
    const [vencimentoHabilitação, setVencimentoHabilitação] = useState("");




    return(
        <>
        <Head>
        <title>Easy Route - Cadastro de condutor</title>
      </Head>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.registerContainer}>
          <div className={styles.containerLeft}>
          </div>
          <div className={styles.logo}>
            <h1>Cadastre-se como condutor</h1>
          </div>
          <form>
            <div className={styles.inputWrapper}>
              <Input
                placeholder="Digite o nome do cliente"
                type="text"
                value={nome}
                onChange={(e) => setnome(e.target.value)}
              />
              <Input
                placeholder="Numero do documento"
                type="text"
                value={numeroHabilitação}
                onChange={(e) => setNumeroHabilitação(e.target.value)}
              />
            </div>

            <div className={styles.inputWrapper}>
              <Input
                placeholder="Tipo de documento"
                type="text"
                value={categoriaHabilitação}
                onChange={(e) => setCategoriaHabilitação(e.target.value)}
              />
              <Input
                placeholder="Logradouro"
                type="text"
                value={vencimentoHabilitação}
                onChange={(e) => setVencimentoHabilitação(e.target.value)}
              />


            </div>
            <div className={styles.buttonWrapper}>
              <Button>Cadastrar</Button>
            </div>
          </form>
        </div>
        <div className={styles.loginContainer}>
            <h1>Bem-Vindo</h1>
            <span>Acesse sua conta agora mesmo</span>

            <Button>
              <Link href={'./DriverSignIn'} legacyBehavior>
              Entrar
              </Link>
              </Button>

        </div>
      </div>

        </>
    )
}