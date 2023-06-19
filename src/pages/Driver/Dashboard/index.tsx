import React, { useState, useEffect, ChangeEvent,FormEvent } from "react";
import { Navbar } from "@/components/Header";
import Head from "next/head";
import styles from "./styles.module.scss";
import { Input } from "@/components/UI/Input";
import { Button } from "@/components/UI/Button/Index";
import { setupAPIClient } from "@/services/api";
import Router from "next/router";
import { FaUserCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import { handleSignOutDriver } from "@/utils/Logout";
import Link from "next/link";


export default function Dashboard() {
  const [nome, setNome] = useState("");
  const [numeroHabilitacao, setNumeroHabilitacao] = useState("");
  const [categoriaHabilitacao, setCategoriaHabilitacao] = useState("");
  const [vencimentoHabilitacao, setVencimentoHabilitacao] = useState("");
  const [imageAvatar, setImageAvatar] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [loading, setLoading] = useState(false);

  function handleFile(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) {
      return;
    }
    const image = e.target.files[0];

    if (!image) {
      return;
    }
    if (image.type === "image/jpeg" || image.type === "image/png") {
      const imageUrl = URL.createObjectURL(image);
      setImageAvatar(image);
      setAvatarUrl(imageUrl);
    }
  }


  async function setDriverData(categoriaHabilitacao, vencimentoHabilitacao) {
    try {
      setLoading(true);
  
      const apiClient = setupAPIClient();
      const driverId = Number(localStorage.getItem("driverId"));
  
      const driverData = {
        id: driverId,
        categoriaHabilitacao,
        vencimentoHabilitacao,
      };
  
      const response = await apiClient.put(`/Condutor/${driverId}`, driverData);
  
      if (response.status === 200) {
        toast.success("Dados atualizados com sucesso!");
      } else {
        toast.error("Ocorreu um erro ao atualizar os dados.");
      }
    } catch (error) {
      console.error("Ocorreu um erro ao enviar a requisição.", error);
    } finally {
      setLoading(false);
    }
  }



  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await setDriverData(
      numeroHabilitacao,
      categoriaHabilitacao,
    );
  };



  useEffect(() => {
    const fetchData = async () => {
      const apiClient = setupAPIClient();
      const driverId = localStorage.getItem("driverId");
      const response = await apiClient.get(`/Condutor/${driverId}`);

      const {
        nome,
        numeroHabilitacao,
        categoriaHabilitacao,
        vencimentoHabilitacao,
      } = response.data;

      setNome(nome);
      setNumeroHabilitacao(numeroHabilitacao);
      setCategoriaHabilitacao(categoriaHabilitacao);
      setVencimentoHabilitacao(vencimentoHabilitacao);
    };

    const driverId = localStorage.getItem("driverId");
    if (!driverId) {
      Router.push("/Driver/DriverSignIn");
    } else {
      fetchData();
    }
  }, []);


  async function handleDeleteDriver() {
    const confirmed = window.confirm("Tem certeza que deseja deletar sua conta?");
  
    if (confirmed) {
      try {
        const driverId = Number(localStorage.getItem("driverId"));
        const apiClient = setupAPIClient();
        const response = await apiClient.delete(`/Condutor/${driverId}`, {
          data: { id: driverId }
        });
        if (response.status === 200) {
          toast.success("Usuário deletado com sucesso!");
        } else {
          toast.error("Ocorreu um erro ao deletar o condutor.");
        }
      } catch (error) {
        console.error("Ocorreu um erro na requisição.", error);
      }
      localStorage.removeItem('driverId')
      Router.push('/#')
    }

  }

  return (
    <>
      <Head>
        <title>Dashboard - Condutor </title>
      </Head>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.registerContainer}>
          <div className={styles.containerLeft}></div>
          <div className={styles.textTop}>
            <h1>Editar perfil</h1>
            <Button className={styles.button} type="submit" onClick={handleSignOutDriver}>Sair</Button>
          </div>
          <div className={styles.userImage}>
              <label className={styles.labelAvatar}>
                <span>
                  <FaUserCircle />
                </span>
                <input
                  type="file"
                  accept="image/png, image/jpeg"
                  onChange={handleFile}
                />
                {avatarUrl && (
                  <img
                    className={styles.preview}
                    src={avatarUrl}
                    alt="foto do usuario"
                    width={128}
                    height={128}
                  />
                )}
              </label>
                <span className={styles.textImage}>Alterar foto de perfil</span>
            </div>
          <form onSubmit={handleSubmit}>
            <div className={styles.inputWrapper}>
              <Input
                placeholder="Digite o nome do condutor"
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
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
                Salvar
              </Button>
            </div>
          </form>
          <Button 
                className={styles.delete} 
                loading={loading}
                onClick={handleDeleteDriver}
                >Deletar Conta
                </Button>
        </div>
        <Button
        type="submit"
        className={styles.nextPage}
        >
          <Link href={'/SelectClient'} legacyBehavior>
          ➡
          </Link>
        </Button>
      </div>
    </>
  );
}
