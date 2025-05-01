import { useState, useEffect, ChangeEvent, useContext } from "react";
import Style from "./Style.module.css";
import { setupApiClient } from "../../service/api";
import { toast } from "react-toastify";
import { ContextAplication } from "../../context/ContextApi";

import { FilterSechComponet } from "../../components/FilterSech/FilterSechComponet";
import { PreviewCard } from "../../components/PreviewCard/PreviewCard";
import { TituloComponet, SubtituloComponent, TextoComponent } from "../../components/ComponentText/CompoenetText"; // Componentes de texto
import { ConteinerModalComponet } from "../../components/ConteinerModalComponet/ConteinerModalComponet";
import { ModalEdicaoErros } from "../../components/Modal/ComponentEdicao/ComponetsEdicao";
import { ModalViewerErros } from "../../components/Modal/ComponentPreviw/ComponentsPreviw";
import { ModalRegisterErroSistem } from "../../components/Modal/ComponentCadastro/ComponentRegister";

/* tipagens */
import { ErroProps } from "../../Types/GlobalTypes";
import { SistemaProps } from "../../Types/GlobalTypes";

export function Erros() {
  const [erros, setErros] = useState<ErroProps[]>([]);
  const [Errofiltrado, setErroFiltrado] = useState("");
  const [erroEditado, setErroEditado] = useState<ErroProps | null>(null);
  const [modalErroSelecionado, setModalErroSelecionado] = useState<ErroProps | null>(null);
  const [sistemas, setSistemas] = useState<SistemaProps[]>([]);
  
  const [ModalViewVisible, setModalViewVisible] = useState(false);
  const [ModalEditVisible, setModalEditVisible] = useState(false);
  const [ModalRegisterVisible, setModalRegisterVisible] = useState(false);

const {getSistemaName}=useContext(ContextAplication);

// Filtrar clientes com base no nome
const ErrosFiltrados = erros.filter((erro) =>
  erro.nome.toLowerCase().includes(Errofiltrado.toLowerCase())
);

// Função para buscar os erros do banco de dados
useEffect(() => {
  async function fetchErros() {
    try {
      const apiClient = setupApiClient();
      const response = await apiClient.get("consulta/erros");
      setErros(response.data);
    } catch (err) {
      console.error("Erro ao buscar erros:", err);
    }
  }
  fetchErros();

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

// Função para abrir o modal de visualização
const handleActionModalView = (id: string) => {
  setModalViewVisible(!ModalViewVisible);
  const erro = erros.find((erro) => erro.id === id);
  if (erro) {
    setModalErroSelecionado(erro);
    setModalViewVisible(!ModalViewVisible);
  }
};

// Função para abrir o modal de edição
const handleActionModalEdit = (erro: ErroProps) => {
  setErroEditado(erro);
  setModalEditVisible(!ModalEditVisible);
};
// Função para excluir o erro
const handleDelete = async (id: string) => {
  try {
    const apiClient = setupApiClient();
    await apiClient.delete(`/erro/remove/${id}`);
    setErros(erros.filter((erro) => erro.id !== id));
    toast.success("Erro excluído com sucesso!");
  } catch (error) {
    console.error("Erro ao deletar o erro:", error);
    toast.error("Erro ao excluir o erro");
  }
};
// Função para atualizar o erro no banco de dados
const handleUpdate = async (erroEditado: ErroProps) => {
  try {
    const apiClient = setupApiClient();
    await apiClient.put(`/erro/update/${erroEditado.id}`, erroEditado);
    setErros((prevErros) =>
      prevErros.map((erro) => (erro.id === erroEditado.id ? { ...erroEditado } : erro))
    );
    toast.success("Erro atualizado com sucesso!");
    setModalEditVisible(false);
  } catch (error) {
   
    toast.error("Erro ao atualizar o erro");
  }
};
  return (
    <main>
      <ConteinerModalComponet Children={
        <div>

        <FilterSechComponet text="Erros de sistema" onFilterChange={setErroFiltrado}/>        

        <div className={Style.ConteinerConsulta}>
          {ErrosFiltrados.length > 0 ? (
            ErrosFiltrados.map((erro) => (
              <PreviewCard
                key={erro.id}
                id={erro.id}
                Children={
                  <div>
                    <SubtituloComponent text={erro.nome} />
                    <TextoComponent text={`${getSistemaName(erro.sistem_id)}`}/>
                    <img src={`http://localhost:3333/files/${erro.imagem}`} alt={erro.nome} />
                  </div>
                }
                onRemove={() => handleDelete(erro.id)}
                onEdit={() => handleActionModalEdit(erro)}
                onView={() => handleActionModalView(erro.id)}
              />
            ))
          ) : (
            <p>Nenhum erro encontrado.</p>
          )}
        </div>

        </div>
      }
      RegiterFunction={()=> setModalRegisterVisible(true)}/>
        
    

      {modalErroSelecionado && (
        <ModalViewerErros erro={modalErroSelecionado} isOpen={ModalViewVisible} onClose={()=>setModalViewVisible(false)} />
      )}

      {ModalEditVisible && erroEditado && (
        <ModalEdicaoErros erro={erroEditado} onSave={handleUpdate} isOpen={ModalEditVisible} onClose={() => setModalEditVisible(false)} />
      )}

      {ModalRegisterVisible && (

        <ModalRegisterErroSistem
        isOpen={ModalRegisterVisible}
        onClose={()=> setModalRegisterVisible(false)}
        />
      )}
    </main>
  );
}

