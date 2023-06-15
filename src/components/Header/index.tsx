import React, { useState } from "react";
import styles from "./styles.module.scss";
import { BsGeoAltFill } from "react-icons/bs";

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
            <a className={styles.init} href="#">Inicio</a>
          </li>
            <div className={styles.bar}/>
          <li className={styles.client}>
            <a  className={styles.liClient}href="#">Cliente</a>
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

