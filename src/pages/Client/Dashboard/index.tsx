import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { Navbar } from "@/components/Header";
import Head from "next/head";
import styles from "./styles.module.scss";
import { FaUserCircle } from "react-icons/fa";
import { Input } from "@/components/UI/Input";
import { Button } from "@/components/UI/Button/Index";
import Router from "next/router";
import { setupAPIClient } from "@/services/api";
import { toast } from "react-toastify";
import { handleSignOutClient } from "@/utils/Logout";


export default function Dashboard() {
  const [nome, setNome] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [numero, setNumero] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [uf, setUf] = useState("");
  const [loading, setLoading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [imageAvatar, setImageAvatar] = useState(null);

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

  useEffect(() => {
    const fetchData = async () => {
      const apiClient = setupAPIClient();
      const userId = localStorage.getItem("userId");
      const response = await apiClient.get(`/Cliente/${userId}`);

      const { nome, logradouro, numero, bairro, cidade, uf } = response.data;

      setNome(nome);
      setLogradouro(logradouro);
      setNumero(numero);
      setBairro(bairro);
      setCidade(cidade);
      setUf(uf);
    };

    const clientUser = localStorage.getItem("userId");
    if (!clientUser) {
      Router.push("/Client/ClientRegister");
    } else {
      fetchData();
    }
  }, []);

  async function setUserData(
    nome,
    logradouro,
    numero,
    bairro,
    cidade,
    uf
  ) {
    try {
      setLoading(true);

      const apiClient = setupAPIClient();
      const userId = Number(localStorage.getItem("userId"));

      const userData = {
        id: userId,
        nome,
        logradouro,
        numero,
        bairro,
        cidade,
        uf
      };

      const response = await apiClient.put(`/Cliente/${userId}`, userData);

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
    await setUserData(
      nome,
      logradouro,
      numero,
      bairro,
      cidade,
      uf
    );
  };



  async function handleDeleteUser() {
    const confirmed = window.confirm("Tem certeza que deseja deletar sua conta?");
  
    if (confirmed) {
      try {
        const userId = Number(localStorage.getItem("userId"));
        const apiClient = setupAPIClient();
        const response = await apiClient.delete(`/Cliente/${userId}`, {
          data: { id: userId }
        });
        if (response.status === 200) {
          toast.success("Usuário deletado com sucesso!");
        } else {
          toast.error("Ocorreu um erro ao deletar o usuário.");
        }
      } catch (error) {
        console.error("Ocorreu um erro na requisição.", error);
      }
      localStorage.removeItem('userId')
      Router.push('/#')
    }

  }
  
  return (
    <>
      <Head>
        <title>Minhas informações</title>
      </Head>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.containerUser}>
          <div className={styles.topItems}>
          <h1>Editar perfil</h1>
          <Button type="submit" onClick={handleSignOutClient}>Sair</Button>
          </div>
          <div className={styles.userImageContainer}>
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
          </div>
          <div className={styles.items}>
            <form onSubmit={handleSubmit}>
              <div className={styles.inputWrapper}>
                <Input
                  placeholder="Digite o nome do cliente"
                  type="text"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />
                <Input
                  placeholder="Logradouro"
                  type="text"
                  value={logradouro}
                  onChange={(e) => setLogradouro(e.target.value)}
                />
              </div>
              <div className={styles.inputWrapper}>
                <Input
                  placeholder="Numero"
                  type="number"
                  value={numero}
                  onChange={(e) => setNumero(e.target.value)}
                ></Input>
                <Input
                  placeholder="Bairro"
                  type="text"
                  value={bairro}
                  onChange={(e) => setBairro(e.target.value)}
                />
              </div>
              <div className={styles.inputWrapper}>
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
              </div>
              <div className={styles.buttonWrapper}>
                
                <Button loading={loading}>Salvar</Button>
              </div>
            </form>
            <Button 
                className={styles.delete} 
                loading={loading}
                onClick={handleDeleteUser}
                >Deletar Conta
                </Button>
          </div>
        </div>
      </div>
    </>
  );
}
