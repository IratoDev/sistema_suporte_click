import { useState, useEffect, ChangeEvent, useContext } from "react";
import Style from "./style.module.css"
import { setupApiClient } from "../../service/api";
import { toast } from "react-toastify";
import { ContextAplication } from "../../context/ContextApi";

/* component de texto */
import { TituloComponet } from "../../components/ComponentText/CompoenetText";
import { SubtituloComponent } from "../../components/ComponentText/CompoenetText";//componente Texto
import { TextoComponent } from "../../components/ComponentText/CompoenetText";//componente Texto

/* components Modal */
import { ConteinerModalComponet } from "../../components/ConteinerModalComponet/ConteinerModalComponet";
import { PreviewCard } from "../../components/PreviewCard/PreviewCard";
import { ModalEdicaoHistorico } from "../../components/Modal/ComponentEdicao/ComponetsEdicao";
import { ModalViewerHistorico } from "../../components/Modal/ComponentPreviw/ComponentsPreviw";
import { FilterSechComponet } from "../../components/FilterSech/FilterSechComponet";

/* Tipagens */
import { HistoricoProps } from "../../Types/GlobalTypes";

export function Historico(){

const [historico, setHistorico] = useState<HistoricoProps[]>([]);
const [Historicofiltrado, setHistoricoFiltrado] = useState("");
const [ModalVieweVisible, setModalViewVisible] = useState(false);
const [ModalEditVisible, setModalEditVisible] = useState(false);
const [HistoricoEditado, setHistoricoEditado] = useState<any>(null);
const [modalHistoricoSelecionado, setHistoricoSelecionado] = useState<HistoricoProps | null>(null);

const {getClientName} = useContext(ContextAplication);
const {getAtendimentoName} = useContext(ContextAplication);

const HistoricoFiltrados = historico.filter((historicos) =>{
  const cliente = getClientName(historicos.cliente_id)
  return cliente.toLowerCase().includes(Historicofiltrado.toLowerCase())
});

 // Função para abrir o modal de visualização
 const handleActionViewModal = (id: string) => {
setModalViewVisible(!ModalVieweVisible);
const historicos = historico.find((historicos) => historicos.id === id);
if (historicos) {
  setHistoricoSelecionado(historicos);
  setModalViewVisible(true);
}
};

// Função para abrir o modal de edição
function handleActionEditModal(historico: any) {
setHistoricoEditado(historico)
setModalEditVisible(!ModalEditVisible);
}

 // Função para buscar os Historicos do banco de dados
 useEffect(() => {
    async function fetchErros() {
      try {
        const apiClient = setupApiClient();
        const responseHistorico = await apiClient.get('consulta/historico'); 
        setHistorico(responseHistorico.data);
      } catch (err) {
        console.error("Erro ao buscar erros:", err);
      }
    }

    fetchErros();
  }, []);

// Função para excluir o tutorial
const handleDelete = async (id: string) => {
    try {
      const apiClient = setupApiClient();
      await apiClient.delete(`/erro/remove/${id}`);
      setHistorico(historico.filter((historicos) => historicos.id !== id));
      toast.success('Historico excluído com sucesso!');
    } catch (error) {
      console.error("Erro ao deletar o Historico:", error);
      toast.error('Erro ao excluir o Historico');
    }
};
  
  
// Função chamada para atualizar o tutorial no banco de dados
const handleUpdate = async (HistoricoEditado: any) => {
try {
const apiClient = setupApiClient();
await apiClient.put(`/historico/update/${HistoricoEditado.id}`, HistoricoEditado); // Atualiza o Historico no backend
setHistorico(historico.map((historicos) =>
historicos.id === HistoricoEditado.id ? HistoricoEditado : historicos
));
toast.success('Historico atualizado com sucesso!');
setModalEditVisible(false) // Fechar o modal após a atualização
} catch (error) {
console.error("Erro ao atualizar o historico:", error);
toast.error('Erro ao atualizar o historico');
}
};

return(

<>

<main>

<ConteinerModalComponet Children={

<div>

<FilterSechComponet text="Historico" onFilterChange={setHistoricoFiltrado}/>

<div className={Style.ConteinerConsulta}>
{HistoricoFiltrados.length > 0 ? (
    HistoricoFiltrados.map((historicos) => (
    <PreviewCard
    key={historicos.id}
    id={historicos.id}
    Children={
    <div>
      <div><SubtituloComponent text={getClientName(historicos.cliente_id)}/></div>
      <div><TextoComponent text={`${historicos.date}`}/></div>
      <div><TextoComponent text={getAtendimentoName(historicos.categoria_atendimento_id)}/></div>
    </div>}     
    onRemove={handleDelete}
    onEdit={() => handleActionEditModal(historicos)}
    onView={()=> handleActionViewModal(historicos.id)}
    />
))
) : (
<p>Nenhum erro encontrado.</p> // Mensagem caso não haja erros
)}
</div>
</div>

}
RegiterFunction={()=>alert("cadastro ativo")}/>


{modalHistoricoSelecionado && (
  <ModalViewerHistorico historico={modalHistoricoSelecionado} isOpen={ModalVieweVisible} onClose={()=> setModalViewVisible(false)} />
)}
{ModalEditVisible && HistoricoEditado && (
  <ModalEdicaoHistorico historico={HistoricoEditado} onSave={handleUpdate} isOpen={ModalEditVisible} onClose={() => setModalEditVisible(false)} />
)}

</main>

</>

)

}
