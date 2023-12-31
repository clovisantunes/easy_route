import React, { useContext, FormEvent, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { BsGeoAltFill } from "react-icons/bs";
import { AuthContext } from "@/contexts/AuthContext";
import { Input } from "@/components/UI/Input";
import { Button } from "@/components/UI/Button/Index";
import { Navbar } from "@/components/Header";
import styles from "./styles.module.scss";


export default function ClientSignIn() {
  const { signIn } = useContext(AuthContext);
  const [nome, setnome] = useState("");
  const [numeroHabilitação, setNumeroHabilitação] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <>
      <Head>
        <title>Easy Route - Login de Condutor</title>
      </Head>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.registerContainer}>
          <div className={styles.containerLeft}></div>
          <div className={styles.logo}>
            <BsGeoAltFill />
            <h1>Easy Route</h1>
          </div>
          <form>
            <Input
              placeholder="Digite o nome do condutor"
              type="text"
              value={nome}
              onChange={(e) => setnome(e.target.value)}
            />
            <Input
              placeholder="Numero da Habilitação"
              type="text"
              value={numeroHabilitação}
              onChange={(e) => setNumeroHabilitação(e.target.value)}
            />
            <Button type="submit" loading={loading}>
              <Link href={'/#'}legacyBehavior>
                Login
              </Link>
              </Button>
          </form>
          <span>
            <Link href={"/Driver/DriverSignUp"} legacyBehavior>
              Não possui conta? Cadastre-se
            </Link>
          </span>
        </div>
      </div>
    </>
  );
}
