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
  GetClients: (credentials: getClientProps) => Promise<getClientProps[]>
  GetCars: (Credentials: getCarProps) => Promise<getCarProps[]>
  CreateCar:(Credentials: createCarProps) => Promise<void>
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

type createCarProps = {
  placa: string;
  marcaModelo: string;
  anoFabricacao: number;
  kmAtual: number;
}
// types do Driver

type SignUpDriverProps = {
  nome: string;
  numeroHabilitacao: string;
  categoriaHabilitacao: string;
  vencimentoHabilitacao: string;
};

type getClientProps = {
    id: number,
    numeroDocumento: string,
    tipoDocumento: string,
    nome: string,
    logradouro: string,
    numero: string,
    bairro: string,
    cidade: string,
    uf: string  
}

type getCarProps = {
  id: number,
  placa: string,
  marcaModelo: string,
  anoFabricacao: number,
  kmAtual: number
}



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
    } catch (err) {
      console.log("Erro ao cadatrar", err);
    }
  }


  async function CreateCar({
    placa,
    marcaModelo,
    anoFabricacao,
    kmAtual
  }: createCarProps) {
    try{  
      const response = await api.post("/Veiculo",{
        placa,
        marcaModelo,
        anoFabricacao,
        kmAtual
      });
      toast.success("veiculo criado com sucesso")

    }catch(err){
      console.log("Erro ao cadastrar veiculo", err)
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

 

  async function GetClients(credentials: getClientProps): Promise<getClientProps[]> {
    try {
      const response = await api.get("/Cliente", {
        params: credentials,
      });
      const clients = response.data as getClientProps[];
      return clients;
    } catch (err) {
      console.log("Erro ao carregar clientes", err);
      throw err;
    }
  }
  async function GetCars(credentials: getCarProps): Promise<getCarProps[]> {
    try {
      const response = await api.get("/Veiculo", {
        params: credentials,
      });
      const cars = response.data as getCarProps[];
      return cars;
    } catch (err) {
      console.log("Erro ao carregar carros", err);
      throw err;
    }
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, signIn, signOut, signUp, signUpDriver, GetClients, GetCars, CreateCar }}
    >
      {children}
    </AuthContext.Provider>
  );
}
