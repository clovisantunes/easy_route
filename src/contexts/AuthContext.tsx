import { createContext, ReactNode } from "react";


type AuthContextData = {
    user: UserProps;
    isAuthenticated: boolean;
    signIn: (credentials: SignInProps) => Promise<void>;
}


type UserProps={
    numeroDocumento: string,
    tipoDocumento: string,
    nome: string,
    logradouro: string,
    numero: string,
    bairro: string,
    cidade: string,
    uf: string,
  }

  type SignInProps = {
    nome: string,
    numeroDocumento: string,
  }

const AuthContext = createContext ({} as AuthContextData)