import { Button } from '../Button/Index';
import styles from './styles.module.scss';



export function ModalClient(){
    return(
        <div className={styles.container}>
            <div className={styles.clientContainer}>
            <span>Clientes</span>
                <div>
                <Button type='submit'>
                    UM Cliente | Endereço
                </Button>
                </div>
            </div>
        </div>
    )
}