import { Button } from '../UI/Button/Index';
import styles from './styles.module.scss';

export function MainItens() {
    return(
        <div className={styles.container}>
            <div className={styles.containerCenter}>
          
               <span>
                 A sistema da Easy Route oferece as equipes uma entrega do circuito com eficiencia do início ao fim.
                 </span>
                 <div className={styles.options}>
                    <Button>Porque usar?</Button>
                    <Button>Cliente</Button>
                    <Button>Condutor</Button>
                 </div>
            </div>
        </div>
    )
}