import { useState, useEffect, ChangeEvent } from "react";
import { setupApiClient } from "../../../service/api";
import { toast } from "react-toastify";
import Style from "./Style.module.css"

import Modal from "react-modal";
import { IoMdClose } from "react-icons/io";
import { TituloComponet,TextoComponent } from "../../ComponentText/CompoenetText";

/* Tipagens */
import { HistoricoProps} from "../../../Types/GlobalTypes";
import { ClienteProps } from "../../../Types/GlobalTypes";
import { AtendimentoProps } from "../../../Types/GlobalTypes";
import { SistemaProps } from "../../../Types/GlobalTypes";
import { TutorialProps } from "../../../Types/GlobalTypes";
import { ErroProps } from "../../../Types/GlobalTypes";
import { AnotacaoProps } from "../../../Types/GlobalTypes";


/* modals sessão historico */

type HistoricoEdit = {
historico: HistoricoProps;
onSave:(erro: HistoricoProps) => void;
onClose: () => void;
isOpen:boolean;
}
    
export function ModalEdicaoHistorico({ historico, onSave, onClose, isOpen }:HistoricoEdit) {
    
const [editData, setEditData] = useState({ ...historico });
const [cliente, setCliente] = useState<ClienteProps[]>([]);
const [atendimento, setAtendimento] = useState<AtendimentoProps[]>([]);

const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
  const { name, value } = e.target;
  setEditData((prev) => ({ ...prev, [name]: value }));
};

const handleChangeClient = (e: ChangeEvent<HTMLSelectElement>) => {
  setEditData((prev) => ({ ...prev, cliente_id: e.target.value }));
};

const handleChangeAtendimento = (e: ChangeEvent<HTMLSelectElement>) => {
  setEditData((prev) => ({ ...prev, categoria_atendimento_id: e.target.value }));
};

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
    <div className={Style.ModalEdicao}>
      <div className={Style.modalContent}>
        <button onClick={onClose} className={Style.buttonclose}><IoMdClose/></button>
        <h2>Editar Erro</h2>
        <form>  
        <label>
        <legend>Informação</legend>
        <textarea name="info" value={editData.info} onChange={handleInputChange} />
        </label>

        <label>
          <legend>Cliente</legend>
          <select name="cliente" value={editData.cliente_id} onChange={handleChangeClient} >
          {cliente.map((clientes) => (
                <option key={clientes.id} value={clientes.id}>
                {clientes.name}
                </option>
                 ))}
          </select>
        </label>

        <label>
          <legend>Atendimento</legend>
          <select name="atendimento" value={editData.categoria_atendimento_id} onChange={handleChangeAtendimento} >
          {atendimento.map((atendimentos) => (
                <option key={atendimentos.id} value={atendimentos.id}>
                {atendimentos.name}
                </option>
                 ))}
          </select>
        </label>
      
        <label>
          <legend>Data do atendimento</legend>
          <input name="data" value={`${editData.date}`} onChange={handleInputChange} />
        </label>

        <button onClick={() => onSave(editData)}>Salvar</button>
        
        </form>
      </div>
    </div>
    </Modal>
  );
}

/* Modals sessão Tutorial*/

type TutorialEdit = {
tutorial: TutorialProps;
onSave:(erro: TutorialProps) => void;
onClose: () => void;
isOpen:boolean;
}

export function ModalEdicaoTutorial({ tutorial, onSave, onClose, isOpen }:TutorialEdit) {
  
  const [editData, setEditData] = useState({ ...tutorial });
  const [sistema, setSistema] = useState<SistemaProps[]>([]);
  
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleChangeSistem = (e: ChangeEvent<HTMLSelectElement>) => {
    setEditData((prev) => ({ ...prev, sistem_id: e.target.value }));
  };
  
  useEffect(() => {
    async function loadCategories() {
    try {
    const apiClient = setupApiClient();
    const response = await apiClient.get('/consulta/sistem');
    setSistema(response.data);
    
    } catch (err) {
    console.error("Erro ao carregar categorias", err);
    toast.error("Erro ao carregar categorias");
    }
    }
        
    
    loadCategories();
    
    }, []);
  
  
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
      <div className={Style.ModalEdicao}>
        <div className={Style.modalContent}>
          <button onClick={onClose} className={Style.buttonclose}><IoMdClose/></button>
          <h2>Editar Erro</h2>
          <form>  
          <input type="text" name="nome" value={editData.nome} onChange={handleInputChange} />
          <select name="sistema" value={editData.sistem_id} onChange={handleChangeSistem} >
            {sistema.map((sistema) => (
                  <option key={sistema.id} value={sistema.id}>
                  {sistema.name}
                  </option>
                   ))}
            </select>
          <textarea name="causa" value={editData.causa} onChange={handleInputChange} />
          <textarea name="solucao" value={editData.solucao} onChange={handleInputChange} />
          <button onClick={() => onSave(editData)}>Salvar</button>
          </form>
        </div>
      </div>
      </Modal>
    );
}

/* sessão erros sistemas */

type ErroEdit = {
erro:ErroProps;
onSave:(erro: ErroProps) => void;
onClose: () => void;
isOpen:boolean;
}

export function ModalEdicaoErros({ erro, onSave, onClose, isOpen }:ErroEdit) {
  
  const [editData, setEditData] = useState({ ...erro });
  const [sistema, setSistema] = useState<SistemaProps[]>([]);
  const [SistemaSelected, setSistemaSelected] = useState(0);
  
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleChangeSistem = (e: ChangeEvent<HTMLSelectElement>) => {
    setEditData((prev) => ({ ...prev, sistem_id: e.target.value }));
  };
  
  useEffect(() => {
    async function loadCategories() {
    try {
    const apiClient = setupApiClient();
    const response = await apiClient.get('/consulta/sistem');
    setSistema(response.data);
    
    } catch (err) {
    console.error("Erro ao carregar categorias", err);
    toast.error("Erro ao carregar categorias");
    }
    }
        
    
    loadCategories();
    
    }, []);
  
  
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
      <div className={Style.ModalEdicao}>
        <div className={Style.modalContent}>
          <button onClick={onClose} className={Style.buttonclose}><IoMdClose/></button>
          <h2>Editar Erro</h2>
          <form>  
          <input type="text" name="nome" value={editData.nome} onChange={handleInputChange} />
          <select name="sistema" value={editData.sistem_id} onChange={handleChangeSistem} >
            {sistema.map((sistema) => (
                  <option key={sistema.id} value={sistema.id}>
                  {sistema.name}
                  </option>
                   ))}
            </select>
          <textarea name="causa" value={editData.causa} onChange={handleInputChange} />
          <textarea name="solucao" value={editData.solucao} onChange={handleInputChange} />
          <button onClick={() => onSave(editData)}>Salvar</button>
          </form>
        </div>
      </div>
      </Modal>
    );
}

/* sessão erros sistemas */

type ModalEdicaoProps = {
  isOpen: boolean;
  onClose: () => void;
  cliente: any;
  onUpdate: (clientEditado: any) => void;
}

export function ModalEdicaoCliente({ isOpen, onClose, cliente, onUpdate }: ModalEdicaoProps) {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [statusEmail, setStatusEmail] = useState<boolean>(false);
  const [type, setType] = useState<string>("novo");
  const [numeroMaquina, setNumeroMaquina] = useState<number | null>(null);
  const [fiscal, setFiscal] = useState<string>("");
  const [obs, setObs] = useState<string>("");
  const [sistemId, setSistemId] = useState<string>("");
  const [sistemas, setSistemas] = useState<any[]>([]); 
  const [VencimentoCertificado, setVencimentoCertificado] = useState<string>("");
const [cnpj, setCnpj] = useState('');
const [telefone, setTelefone] = useState('');


  useEffect(() => {
    if (cliente) {
      setName(cliente.name);
      setEmail(cliente.email);
      setFiscal(cliente.fiscal);
      setNumeroMaquina(cliente.numero_maquina || null); // Atribui null se não houver valor
      setSistemId(cliente.sistem_id || ''); // Atribui uma string vazia se não houver valor
      setStatusEmail(cliente.status_email || false); // Define o statusEmail com valor padrão
      setObs(cliente.obs || ''); // Atribui uma string vazia se não houver valor
      setCnpj(cliente.cnpj);
      setTelefone(cliente.telefone);
      setVencimentoCertificado(cliente.vencimento_certificado)
      console.log("Cliente recebido no modal de edição:", cliente);
      console.log(`${VencimentoCertificado}`)
    }

  }, [cliente]);

  useEffect(() => {
    // Buscar os sistemas disponíveis ao carregar o modal
    const fetchSistemas = async () => {
      try {
        const apiClient = setupApiClient();
        const response = await apiClient.get("/consulta/sistem"); // Supondo que a API tenha uma rota para retornar os sistemas
        setSistemas(response.data); // Armazenar os sistemas retornados da API
      } catch (error) {
        console.error("Erro ao buscar sistemas:", error);
        toast.error("Erro ao carregar os sistemas.");
      }
    };

    fetchSistemas();
  }, [cliente]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const updatedClient = {
      name,
      email,
      status_email: statusEmail,
      type,
      numero_maquina: numeroMaquina,
      fiscal,
      obs,
      sistem_id: sistemId,
      cnpj,
      vencimento_certificado: new Date (VencimentoCertificado),
      telefone
    };

    try {
      const apiClient = setupApiClient();
      const response = await apiClient.put(`/update/${cliente.id}`, updatedClient);
      toast.success("Dados atualizados com sucesso!");
      onUpdate(response.data.cliente); // Atualiza no frontend
      onClose(); // Fecha o modal
    } catch (err: any) {
      console.error("Erro ao atualizar cliente:", err.response?.data || err.message, updatedClient);
      toast.error("Erro ao atualizar os dados do cliente");
    }
  };

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
      backgroundColor:"#A19D9D",
    },
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} style={customStyles}>
      <div className={Style.ModalEdicao}>
        <h2><TituloComponet text="Editar Cliente"/></h2>
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Nome do cliente"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            placeholder="Email do cliente"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            placeholder="vencimento certificado"
            type="date"
            value={VencimentoCertificado ? new Date(VencimentoCertificado).toISOString().split("T")[0] : ""}
            onChange={(e) => setVencimentoCertificado(e.target.value)}
          />
          <input
            placeholder="Cnpj"
            type="text"
            value={cnpj}
            onChange={(e) => setCnpj(e.target.value)}
          />
          <input
            placeholder="Telefone"
            type="text"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
          />
          <label>
            <legend><TextoComponent text="Status do Email:"/></legend>
            <input
              type="checkbox"
              checked={statusEmail}
              onChange={() => setStatusEmail(!statusEmail)}
            />
          </label>
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="novo">Novo</option>
            <option value="existente">Existente</option>
          </select>

           {/* Select para os sistemas cadastrados */}
          <select value={sistemId} onChange={(e) => setSistemId(e.target.value)}>
            <option value="">Selecione o Sistema</option>
            {sistemas.map((sistema) => (
              <option key={sistema.id} value={sistema.id}>
                {sistema.name} {/* Nome do sistema, pode ser alterado conforme os dados */}
              </option>
            ))}
          </select>

          <input
            placeholder="Número da Máquina"
            type="number"
            value={numeroMaquina || ""}
            onChange={(e) => setNumeroMaquina(Number(e.target.value))}
          />
          <input
            placeholder="Fiscal"
            type="text"
            value={fiscal}
            onChange={(e) => setFiscal(e.target.value)}
          />
          <textarea
            placeholder="Observação"
            value={obs}
            onChange={(e) => setObs(e.target.value)}
          />

          <button type="submit"><TextoComponent text="Alterar"/></button>
        </form>
      </div>
    </Modal>
  );
}

/* modals sessão anotaçoes */

type AnotacaoEdit = {
  anotacao: AnotacaoProps;
  onSave:(erro: AnotacaoProps) => void;
  onClose: () => void;
  isOpen:boolean;
}
      
export function ModalEdicaoAnotacao({ anotacao, onSave, onClose, isOpen }:AnotacaoEdit) {
      
const [editData, setEditData] = useState({ ...anotacao});

const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
  const { name, value } = e.target;
  setEditData((prev) => ({ ...prev, [name]: value }));
};

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
    <div className={Style.ModalEdicao}>
      <div className={Style.modalContent}>
        <button onClick={onClose} className={Style.buttonclose}><IoMdClose/></button>
        <h2>Editar Anotações</h2>
        <form>  

        <label>
        <legend>Nome</legend>
        <input type="text" name="name" value={editData.name} onChange={handleInputChange} />
        </label>

        <label>
          <legend>Informações</legend>
          <textarea name="info" value={editData.info} onChange={handleInputChange} />
        </label>

        <button onClick={() => onSave(editData)}>Salvar</button>
        
        </form>
      </div>
    </div>
    </Modal>
  );
}