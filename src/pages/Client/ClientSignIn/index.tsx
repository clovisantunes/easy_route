import { useContext, FormEvent, useState } from "react";
import { Input } from "@/components/UI/Input";
import styles from "./styles.module.scss";
import Head from "next/head";
import { BsGeoAltFill } from "react-icons/bs";
import { Button } from "@/components/UI/Button/Index";
import { Navbar } from "@/components/Header";
import Link from "next/link";
import { AuthContext } from "@/contexts/AuthContext";

export default function ClientSignIn() {
  const { signIn } = useContext(AuthContext);

  const [nome, setnome] = useState("");
  const [numeroDocumento, setNumeroDocumento] = useState("");

  const [loading, setLoading] = useState(false);

  async function handleLogin(event: FormEvent) {
    event.preventDefault();

    try {
      setLoading(true);

      const data = {
        nome,
        numeroDocumento,
      };

      await signIn(data);
      setLoading(false)
      const user = {
        nome,
        numeroDocumento,
      };
      localStorage.setItem("user", JSON.stringify(user));

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("Ocorreu um erro no login:", error);
    }
  }
  return (
    <>
      <Head>
        <title>Easy Route - Login de cliente</title>
      </Head>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.registerContainer}>
          <div className={styles.containerLeft}></div>
          <div className={styles.logo}>
            <BsGeoAltFill />
            <h1>Easy Route</h1>
          </div>
          <form onSubmit={handleLogin}>
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
            <Button type="submit" loading={loading}>
            <Link href={'/#'}legacyBehavior>
                Login
              </Link>
              </Button>
          </form>
          <span>
            <Link href={"/Client/ClientRegister"} legacyBehavior>
              Não possui conta? Cadastre-se
            </Link>
          </span>
        </div>
      </div>
    </>
  );
}
