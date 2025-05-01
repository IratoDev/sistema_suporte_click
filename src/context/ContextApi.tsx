import { useState,useEffect, createContext, ReactNode } from "react";
import { setupApiClient } from "../service/api";

// Tipagens:
import { ClienteProps } from "../Types/GlobalTypes";
import { SistemaProps } from "../Types/GlobalTypes";
import { AtendimentoProps } from "../Types/GlobalTypes";

type ContextProps ={
getSistemaName:(sistema_id:string)=> string;
getClientName:(client_id:string)=> string;
getAtendimentoName:(atendimento_id:string)=> string;
}


export const ContextAplication = createContext({} as ContextProps);

export function ProviderAplication({children}: {children: ReactNode}){

const [cliente, setCliente] = useState<ClienteProps[]>([]);
const [atendimento, setAtendimento] = useState<AtendimentoProps[]>([]);
const [sistemas, setSistemas] = useState<SistemaProps[]>([]);

useEffect(()=>{

async function LoadData(){
  
const apiClient = setupApiClient();

try {

const responseCliente = await apiClient.get('/consulta');
const responseAtendimento = await apiClient.get('/consulta/categoria_atendimento');
const responseSistem = await apiClient.get('/consulta/sistem')

setCliente(responseCliente.data);
setAtendimento(responseAtendimento.data);
setSistemas(responseSistem.data);
  
} catch (error) {
  
throw new Error("erro ao buscar dados");

}

}

LoadData();

},[])

const getClientName = (cliente_id: string) => {
  if (Array.isArray(cliente)) {
    const c = cliente.find((s) => s.id === cliente_id);
    return c ? c.name : "Cliente Desconhecido";
  }
  return "Cliente Desconhecido";
};

const getAtendimentoName = (cliente_id: string) => {
  if (Array.isArray(atendimento)) {
    const a = atendimento.find((s) => s.id === cliente_id);
    return a ? a.name : "Atendimento Desconhecido";
  }
  return "Atendimento Desconhecido";
};

const getSistemaName = (sistemId: string) => {
  if (Array.isArray(sistemas)) {
    const s = sistemas.find((s) => s.id === sistemId);
    return s ? s.name : "Sistema Desconhecido";
  }
  return "Sistema Desconhecido";
};


return(

<ContextAplication.Provider value={{getSistemaName,getClientName,getAtendimentoName}}>
{children}
</ContextAplication.Provider>

)

}