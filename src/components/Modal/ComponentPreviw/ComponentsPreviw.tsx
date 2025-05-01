import { useState, useEffect, useContext } from "react";
import Style from "./Style.module.css"
import { setupApiClient } from "../../../service/api";
import { toast } from "react-toastify";
import { ContextAplication } from "../../../context/ContextApi";

import Modal from "react-modal";
import { IoMdClose } from "react-icons/io";

/* Componentes texto */
import { TituloComponet } from "../../ComponentText/CompoenetText";
import { TextoComponent } from "../../ComponentText/CompoenetText";
import { SubtituloComponent } from "../../ComponentText/CompoenetText";

/* Tipagens */
import {HistoricoProps } from "../../../Types/GlobalTypes";
import { ClienteProps } from "../../../Types/GlobalTypes";
import { AtendimentoProps } from "../../../Types/GlobalTypes";
import { TutorialProps } from "../../../Types/GlobalTypes";
import { SistemaProps } from "../../../Types/GlobalTypes";
import { Tutorial } from "../../../pages/tutorial/Tutorial";
import { ErroProps } from "../../../Types/GlobalTypes";
import { AnotacaoProps } from "../../../Types/GlobalTypes";

/* sessão historico */
type HistoricoViewer = {
isOpen:boolean;
onClose: () => void;
historico: HistoricoProps;

}

export function ModalViewerHistorico({ historico, onClose, isOpen}:HistoricoViewer) {

    const [cliente, setCliente] = useState<ClienteProps[]>([]);
    const [ClienteSelected, setClienteSelected] = useState(0);
  
    const [atendimento, setAtendimento] = useState<AtendimentoProps[]>([]);
    const [atendimentoSelected, setAtendimentoSelected] = useState(0);
    
       // Função para buscar os erros do banco de dados
       useEffect(() => {
          async function loadAtendimentos() {
          try {
          const apiClient = setupApiClient();
          const response = await apiClient.get('/consulta/categoria_atendimento');
          setAtendimento(response.data);
          
          } catch (err) {
          console.error("Erro ao carregar categorias", err);
          toast.error("Erro ao carregar categorias");
          }
          }
              
          async function loadClientes() {
          try {
          const apiClient = setupApiClient();
          const response = await apiClient.get('/consulta');
          setCliente(response.data);
          
          } catch (err) {
          console.error("Erro ao carregar categorias", err);
          toast.error("Erro ao carregar categorias");
          }
          }
          
          loadClientes();
      
          loadAtendimentos();
          
          }, []);

      const {getAtendimentoName} = useContext(ContextAplication);
      const {getClientName} = useContext(ContextAplication)
    
      const customStyles = {
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          borderRadius: "20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          transform: "translate(-50%, -50%)",
          backgroundColor: "#A19D9D",
        },
      };
    
      
    
      return (
        <Modal isOpen={isOpen} onRequestClose={onClose} style={customStyles}>
       <div className={Style.Modalview}>
          <button onClick={onClose} className={Style.closeModal}>
          <IoMdClose />
          </button>
          <h2><TituloComponet text={historico.cliente_id}/></h2>
          <table border={1}>
              <thead>
                <tr>
                  <th><SubtituloComponent text="id:"/></th>
                  <th><SubtituloComponent text="Info:"/></th>
                  <th><SubtituloComponent text="Atendimento:"/></th>
                  <th><SubtituloComponent text="Cliente:"/></th>
                  <th><SubtituloComponent text="Data de atendimento:"/></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><TextoComponent text={historico.id}/></td>
                  <td><TextoComponent text={historico.info}/></td>
                  <td><TextoComponent text={getAtendimentoName(historico.categoria_atendimento_id)}/></td>
                  <td><TextoComponent text={getClientName(historico.cliente_id)}/></td>
                  <td><TextoComponent text={`${historico.date}`}/></td>
                </tr>
              </tbody>
            </table>
        </div>
        </Modal>
      );
}

/* sessão Tutorial */

type TutorialViewer = {
isOpen:boolean;
onClose: () => void;
tutorial: TutorialProps;
openModal: (id: string) => void;
}

export function ModalViewerTutorial({ tutorial, onClose, isOpen, openModal}:TutorialViewer) {

  const [sistemas, setSistemas] = useState<SistemaProps[]>([]);

   // Função para buscar os erros do banco de dados
   useEffect(() => {

    async function fetchData() {
      try {
        const apiClient = setupApiClient();
        
        // Buscar lista de sistemas
        const responseSistemas = await apiClient.get("consulta/sistem"); 
        setSistemas(responseSistemas.data);
      } catch (error) {
        console.error("Erro ao buscar os clientes ou sistemas:", error);
        toast.error("Erro ao carregar os dados!");
      }
    };
    fetchData();
    
  }, []);

  const {getSistemaName} = useContext(ContextAplication);

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      borderRadius: "20px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      transform: "translate(-50%, -50%)",
      backgroundColor: "#A19D9D",
    },
  };

  const getSistemaNome = (sistemId: string) => {
    const sistema = sistemas.find((s) => s.id === sistemId);
    return sistema ? sistema.name : "Sistema Desconhecido"; 
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} style={customStyles}>
   <div className={Style.Modalview}>
          <button onClick={onClose} className={Style.closeModal}>
          <IoMdClose />
          </button>
          <h2><TituloComponet text={tutorial.nome}/></h2>
          <table border={1}>
              <thead>
                <tr>
                  <th><SubtituloComponent text="id:"/></th>
                  <th><SubtituloComponent text="Nome:"/></th>
                  <th><SubtituloComponent text="Foto:"/></th>
                  <th><SubtituloComponent text="Causa:"/></th>
                  <th><SubtituloComponent text="Solução:"/></th>
                  <th><SubtituloComponent text="Sistema:"/></th>

                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><TextoComponent text={tutorial.id}/></td>
                  <td><TextoComponent text={tutorial.nome}/></td>
                  <td><img src={`${tutorial.imagem}`} alt="imagem tutorial" /></td>
                  <td><TextoComponent text={tutorial.causa}/></td>
                  <td><TextoComponent text={tutorial.solucao}/></td>
                  <td><TextoComponent text={getSistemaName(tutorial.sistem_id)}/></td>
                </tr>
              </tbody>
            </table>
        </div>
    </Modal>
  );
}

/* sessão erros sistema */

type ErroViewer = {
isOpen:boolean;
erro: ErroProps;
onClose: () => void;
}

export function ModalViewerErros({ erro, onClose, isOpen}:ErroViewer) {

  const [sistemas, setSistemas] = useState<SistemaProps[]>([]);

   // Função para buscar os erros do banco de dados
   useEffect(() => {

    async function fetchData() {
      try {
        const apiClient = setupApiClient();
        
        // Buscar lista de sistemas
        const responseSistemas = await apiClient.get("consulta/sistem"); 
        setSistemas(responseSistemas.data);
      } catch (error) {
        console.error("Erro ao buscar os clientes ou sistemas:", error);
        toast.error("Erro ao carregar os dados!");
      }
    };
    fetchData();
    
  }, []);

  const {getSistemaName} = useContext(ContextAplication)

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      borderRadius: "20px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      transform: "translate(-50%, -50%)",
      backgroundColor: "#A19D9D",
    },
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} style={customStyles}>
    <div className={Style.Modalview}>
          <button onClick={onClose} className={Style.closeModal}>
          <IoMdClose />
          </button>
          <h2><TituloComponet text={erro.nome}/></h2>
          <table border={1}>
              <thead>
                <tr>
                  <th><SubtituloComponent text="id:"/></th>
                  <th><SubtituloComponent text="Nome:"/></th>
                  <th><SubtituloComponent text="Foto:"/></th>
                  <th><SubtituloComponent text="Causa:"/></th>
                  <th><SubtituloComponent text="Solução:"/></th>
                  <th><SubtituloComponent text="Sistema:"/></th>

                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><TextoComponent text={erro.id}/></td>
                  <td><TextoComponent text={erro.nome}/></td>
                  <td><img src={`${erro.imagem}`} alt="imagem erro" /></td>
                  <td><TextoComponent text={erro.causa}/></td>
                  <td><TextoComponent text={erro.solucao}/></td>
                  <td><TextoComponent text={getSistemaName(erro.sistem_id)}/></td>
                </tr>
              </tbody>
            </table>
        </div>
    </Modal>
  );
}

/* sessão erros sistema */

type ClienteViewerProps = {
id:string;
cliente: string;
type:string;
fiscal:string;
sistem_id:string;
numero_maquinas:string;
email:string;
obs:string;
isOpen: boolean;
cnpj:string;
telefone:string;
vencimento_certificado:Date;
onClose: () => void;
};

export function ModalViewCliente({ cliente,type,fiscal,sistem_id,numero_maquinas,email,obs,cnpj,telefone,vencimento_certificado, onClose, isOpen}: ClienteViewerProps) {
  
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      borderRadius: "20px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      transform: "translate(-50%, -50%)",
      
    },
  };

  return (
    <>
    <Modal isOpen={isOpen} onRequestClose={onClose} style={customStyles}>
    <div className={Style.Modalview}>
          <button onClick={onClose} className={Style.closeModal}>
          <IoMdClose />
          </button>
          <h2><TituloComponet text={cliente}/></h2>
          <table border={1}>
              <thead>
                <tr>
                  <th><SubtituloComponent text="tipo:"/></th>
                  <th><SubtituloComponent text="fiscal:"/></th>
                  <th><SubtituloComponent text="sistema:"/></th>
                  <th><SubtituloComponent text="numero de maquinas:"/></th>
                  <th><SubtituloComponent text="email:"/></th>
                  <th><SubtituloComponent text="obs:"/></th>
                  <th><SubtituloComponent text="cnpj:"/></th>
                  <th><SubtituloComponent text="telefone:"/></th>
                  <th><SubtituloComponent text="vencimento certificado:"/></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                 <td><TextoComponent text={type}/></td>
                  <td><TextoComponent text={fiscal}/></td>
                  <td><TextoComponent text={sistem_id}/></td>
                  <td><TextoComponent text={numero_maquinas}/></td>
                  <td><TextoComponent text={email}/></td>
                  <td><TextoComponent text={obs}/></td>
                  <td><TextoComponent text={cnpj}/></td>
                  <td><TextoComponent text={telefone}/></td>
                  <td><TextoComponent text={`${vencimento_certificado}`}/></td>
                </tr>
              </tbody>
            </table>
        </div>
    </Modal>
      
    </>
  );
}

/* sessão historico */
type AnotacaoViewer = {
isOpen:boolean;
onClose: () => void;
anotacao: AnotacaoProps;

}

export function ModalViewerAnotacao({ anotacao, onClose, isOpen}:AnotacaoViewer) {

    const [cliente, setCliente] = useState<ClienteProps[]>([]);
    const [ClienteSelected, setClienteSelected] = useState(0);
  
    const [atendimento, setAtendimento] = useState<AtendimentoProps[]>([]);
    const [atendimentoSelected, setAtendimentoSelected] = useState(0);
    
       // Função para buscar os erros do banco de dados
       useEffect(() => {
          async function loadAtendimentos() {
          try {
          const apiClient = setupApiClient();
          const response = await apiClient.get('/consulta/categoria_atendimento');
          setAtendimento(response.data);
          
          } catch (err) {
          console.error("Erro ao carregar categorias", err);
          toast.error("Erro ao carregar categorias");
          }
          }
              
          async function loadClientes() {
          try {
          const apiClient = setupApiClient();
          const response = await apiClient.get('/consulta');
          setCliente(response.data);
          
          } catch (err) {
          console.error("Erro ao carregar categorias", err);
          toast.error("Erro ao carregar categorias");
          }
          }
          
          loadClientes();
      
          loadAtendimentos();
          
          }, []);

      const {getAtendimentoName} = useContext(ContextAplication);
      const {getClientName} = useContext(ContextAplication)
    
      const customStyles = {
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          borderRadius: "20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          transform: "translate(-50%, -50%)",
          backgroundColor: "#A19D9D",
        },
      };
    
      
    
      return (
        <Modal isOpen={isOpen} onRequestClose={onClose} style={customStyles}>
       <div className={Style.Modalview}>
          <button onClick={onClose} className={Style.closeModal}>
          <IoMdClose />
          </button>
          <h2><TituloComponet text={anotacao.name}/></h2>
          <table border={1}>
              <thead>
                <tr>
                  <th><SubtituloComponent text="Nome:"/></th>
                  <th><SubtituloComponent text="Info:"/></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><TextoComponent text={anotacao.name}/></td>
                  <td><TextoComponent text={anotacao.info}/></td>
                </tr>
              </tbody>
            </table>
        </div>
        </Modal>
      );
}