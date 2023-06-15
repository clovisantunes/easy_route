import { Input } from '@/components/UI/Input';
import styles from './styles.module.scss';

export function ClientRegister(){
    return(
<div className={styles.cadastro}>
          <form>
            <Input 
            placeholder='Digite o nome do cliente'
            />
            <Input 
            placeholder='Numero do documento'
            />
            <Input 
            placeholder='Tipo de documento'
            />
            <Input 
            placeholder='Logradouro'
            />
            <Input 
            placeholder='Bairro'
            />
            <Input 
            placeholder='Cidade'
            />
            <Input 
            placeholder='UF'
            />
          </form>
        </div>
    )
}