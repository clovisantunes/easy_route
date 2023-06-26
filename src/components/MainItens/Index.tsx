import React from "react";
import Link from "next/link";
import styles from "./styles.module.scss";
import { Button } from "../UI/Button/Index";
import { BsFillPersonFill, BsCarFrontFill } from "react-icons/bs";
export function MainItens() {
  return (
    <div className={styles.container}>
      <div className={styles.containerCenter}>
        <span>
          A sistema da Easy Route oferece as equipes uma entrega do circuito com
          eficiencia do início ao fim.
        </span>
        <div className={styles.options}>
          <div className={styles.items}>
            <BsFillPersonFill />
            <h2>Cliente</h2>
            <span>
            Venha ter uma velocidade e resolutividade através de um atendimento organizado com tags e etiquetas fáceis de localizar.
            </span>
            <Button className={styles.buttonItems}>
            <Link href={'/Client/ClientRegister'} legacyBehavior>
              ➡
            </Link>
              </Button>
          </div>
          <div className={styles.items}>
            <BsCarFrontFill />
            <h2>Condutor</h2>
            <span>
              Torne rápida e inesquecível a experiência do primeiro contato de
              seu cliente com sua marca.
            </span>
            <Link href={'/Driver/DriverSignUp'} legacyBehavior>
            <Button className={styles.buttonItems}>
              ➡
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
