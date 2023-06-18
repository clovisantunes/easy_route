import { createContext, ReactNode, useEffect, useState } from "react";
import Router from "next/router";
import { api } from "@/services/apiClient";
import { toast } from "react-toastify";


type AuthContextData = {
  user?: UserProps;
  isAuthenticated: boolean;
  signIn: (credentials: SignInProps) => Promise<void>;
  signOut: () => void;
  signUp: (credentials: SignUpProps) => Promise<void>;
  signUpDriver: (credentials: SignUpDriverProps) => Promise<void>;
};

type UserProps = {
  numeroDocumento: string;
  tipoDocumento: string;
  nome: string;
  logradouro: string;
  numero: string;
  bairro: string;
  cidade: string;
  uf: string;
};

type SignInProps = {
  nome: string;
  numeroDocumento: string;
};

type AuthProviderProps = {
  children: ReactNode;
};

type SignUpProps = {
  numeroDocumento: string;
  tipoDocumento: string;
  nome: string;
  logradouro: string;
  numero: string;
  bairro: string;
  cidade: string;
  uf: string;
};
// types do Driver

type SignUpDriverProps = {
  nome: string;
  numeroHabilitacao: string;
  categoriaHabilitacao: string;
  vencimentoHabilitacao: string;
};

export const AuthContext = createContext({} as AuthContextData);

export function signOut() {
  localStorage.removeItem("user");
  Router.push("/");
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps>();
  const [driver, setDriver] = useState<UserProps>();
  const isAuthenticated = !!user;





  async function signIn({ nome, numeroDocumento }: SignInProps) {

    try {
      const response = await api.post("/Cliente", {
        nome,
        numeroDocumento,
      });
    
    } catch (err) {
      console.log("Erro ao logar", err);
    }
  }

  async function signUp({
    numeroDocumento,
    tipoDocumento,
    nome,
    logradouro,
    numero,
    bairro,
    cidade,
    uf,
  }: SignUpProps) {
    try {
      const response = await api.post("/Cliente", {
        nome,
        numeroDocumento,
        tipoDocumento,
        logradouro,
        numero,
        bairro,
        cidade,
        uf,
      });
      const idUser = response.data;
      localStorage.setItem("userId", String(idUser));

      toast.success('Usuario criado com sucesso')

      Router.push('/Client/Dashboard')
    } catch (err) {
      console.log("Erro ao cadatrar", err);
    }
  }

  //Cadastro de Condutor

  async function signUpDriver({
    nome,
    numeroHabilitacao,
    categoriaHabilitacao,
    vencimentoHabilitacao,
  }: SignUpDriverProps) {
    try {
      const response = await api.post("/Condutor", {
        nome,
        numeroHabilitacao,
        categoriaHabilitacao,
        vencimentoHabilitacao,
      });
      const idDriver = response.data;
      localStorage.setItem("driverId", String(idDriver));
      
      toast.success('Cadastrado com sucesso')


      Router.push('/Driver/Dashboard')
    } catch (err) {
      toast.error('Erro ao cadastrar')
      console.log("Erro ao cadastrar condutor", err);
    }
  }
 


  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, signIn, signOut, signUp, signUpDriver }}
    >
      {children}
    </AuthContext.Provider>
  );
}
