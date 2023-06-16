import React, { useState } from "react";
import styles from "./styles.module.scss";
import { BsGeoAltFill } from "react-icons/bs";


import Link from "next/link";
export function Navbar() {


  return (
    <div className={styles.containerNav}>
      <div className={styles.navList}>
        <div className={styles.logo}>
          <BsGeoAltFill />
          <h1>Easy Route</h1>
        </div>
        
        <div className={styles.items}>
          <ul>
          <li className={styles.li}>
            <Link href={'/#'} legacyBehavior>
            <a className={styles.init} >Inicio</a>
            </Link>
          </li>
            <div className={styles.bar}/>
          <li className={styles.client}>
            <Link href="/ClientSignUp" legacyBehavior>
            <a  className={styles.liClient}>Cliente</a>
            </Link>
          </li>
          <li className={styles.driver}>
            <a className={styles.liDriver} href="#">Condutor</a>
          </li>
        
          </ul>
        </div>
      </div>
    </div>
  );
}

