import { createContext, ReactNode, useState } from "react";
import Router from "next/router";
import { api } from "@/services/apiClient";
type AuthContextData = {
    user?: UserProps;
    isAuthenticated: boolean;
    signIn: (credentials: SignInProps) => Promise<void>;
    signOut: () => void;
    signUp:(credentials: SignUpProps) => Promise<void>
}


type UserProps = {
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

  type AuthProviderProps = {
    children: ReactNode;
  }


  type SignUpProps = {
    numeroDocumento: string,
    tipoDocumento: string,
    nome: string,
    logradouro: string,
    numero: string,
    bairro: string,
    cidade: string,
    uf: string
  }

export  const AuthContext = createContext ({} as AuthContextData)


export function signOut(){
  localStorage.removeItem("user");
  Router.push('/')
}

export function AuthProvider({ children }: AuthProviderProps) {

    const [user, setUser] = useState<UserProps>()
    const isAuthenticated = !!user;


   async function signIn({nome, numeroDocumento}: SignInProps) {
        try{
          const response = await api.post('/Cliente',{
            nome,
            numeroDocumento
          })
          console.log(response.data);
        }catch(err){
          console.log('Erro ao cadatrar', err)
        }
        
    }

    async function signUp({numeroDocumento, tipoDocumento,nome,logradouro,numero,bairro,cidade,uf}: SignUpProps){
      try{
        const response = await api.post('/Cliente',{
          nome,
          numeroDocumento,
          tipoDocumento,
          logradouro,
          numero,
          bairro,
          cidade,
          uf
        })
        console.log(response.data);
        console.log("cadastrado com sucesso");
      }catch(err){
        console.log('Erro ao cadatrar', err)
      }
      
    }
    

    return(
        <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut, signUp }}>
            {children}
        </AuthContext.Provider>
    )
}