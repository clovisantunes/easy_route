import React from "react";
import Head from "next/head";
import Image from "next/image";
import { BsGeoAltFill } from "react-icons/bs";
import { Navbar } from "@/components/Header";
import { Button } from "@/components/UI/Button/Index";
import { MainItens } from "@/components/MainItens/Index";
import styles from "../styles/home.module.scss";
import imgBanner from "../img/Suporte-Tecnico-em-TI.jpg";

export default function Home() {
  return (
    <>
      <Head>
        <title>Easy Route - Seu sistema de gerenciar rotas</title>
      </Head>
      <Navbar />
      <div className={styles.containerCenter}>
        <div className={styles.bannerContainer}>
          <Image src={imgBanner} alt="Image do banner" />
          <div className={styles.cover}>
            <h1>
              <BsGeoAltFill />
              Easy Route
            </h1>
            <h2>A Sua Central De Controle ao Atendimento de seus Clientes:</h2>
            <div className={styles.text}>
              <div className={styles.line} />
              <div className={styles.textSpan}>
              <span>
                Otimize rotas, reduza tempos de viagem e aumente a satisfação
                dos seus clientes.
              </span>
              <span>
                Com nosso sistema de controle, você terá todas as ferramentas
                necessárias para acompanhar, planejar e otimizar rotas.
                Economize tempo e dinheiro.
              </span>
              </div>
            </div>
            <div className={styles.button}>
                <Button>Experimente agora</Button>
            </div>
          </div>
        </div>


      </div>
        <MainItens />
    </>
  );
}


