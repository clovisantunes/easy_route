import { useEffect} from 'react';
import Router from 'next/router';
import { useState, FormEvent, useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { Navbar } from "@/components/Header";
import Head from "next/head";
import styles from "./styles.module.scss";
import { Button } from "@/components/UI/Button/Index";
import Link from "next/link";
import { Input } from "@/components/UI/Input";
import { toast } from "react-toastify";



export default function DriverSignUp() {
  const { signUpDriver } = useContext(AuthContext);

  const [nome, setnome] = useState("");
  const [numeroHabilitacao, setNumeroHabilitacao] = useState("");
  const [categoriaHabilitacao, setCategoriaHabilitacao] = useState("");
  const [vencimentoHabilitacao, setVencimentoHabilitacao] = useState("");

  const [loading, setLoading] = useState(false);

  async function handleSignUpDriver(event: FormEvent) {
    event.preventDefault();
    if (
      nome === "" ||
      numeroHabilitacao === "" ||
      categoriaHabilitacao === ""
    ) {
      toast.error("Preencha todos os campos");
      return;
    }
    setLoading(true)


    let data = {
      nome,
      numeroHabilitacao,
      categoriaHabilitacao,
      vencimentoHabilitacao,
    };
    await signUpDriver(data);
    

    setLoading(false);
    return;
  }


  useEffect(() => {
    const driveUser = localStorage.getItem("driverId");
    if (driveUser) {
      Router.push("/dashboard");
    }
  }, []);


  return (
    <>
      <Head>
        <title>Easy Route - Cadastro de condutor</title>
      </Head>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.registerContainer}>
          <div className={styles.containerLeft}></div>
          <div className={styles.logo}>
            <h1>Cadastre-se como condutor</h1>
          </div>
          <form onSubmit={handleSignUpDriver}>
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
                value={numeroHabilitacao}
                onChange={(e) => setNumeroHabilitacao(e.target.value)}
              />
            </div>

            <div className={styles.inputWrapper}>
              <Input
                placeholder="Categoria da habilitação"
                type="text"
                value={categoriaHabilitacao}
                onChange={(e) => setCategoriaHabilitacao(e.target.value)}
              />
              <Input
                placeholder="Logradouro"
                type="datetime-local"
                value={vencimentoHabilitacao}
                onChange={(e) => setVencimentoHabilitacao(e.target.value)}
              />
            </div>
            <div className={styles.buttonWrapper}>
              <Button type="submit" loading={loading}>
              
                     Cadastrar
                
              </Button>
            </div>
          </form>
        </div>
        <div className={styles.loginContainer}>
          <h1>Bem-Vindo</h1>
          <span>Acesse sua conta agora mesmo</span>

          <Button>
            <Link href={"./DriverSignIn"} legacyBehavior>
              Entrar
            </Link>
          </Button>
        </div>
      </div>
    </>
  );
}
