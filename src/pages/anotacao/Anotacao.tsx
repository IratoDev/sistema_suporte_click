import { useState, useEffect, ChangeEvent, useContext } from "react";
import Style from "./Style.module.css"
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
import { ModalEdicaoAnotacao } from "../../components/Modal/ComponentEdicao/ComponetsEdicao";
import { ModalViewerAnotacao } from "../../components/Modal/ComponentPreviw/ComponentsPreviw";
import { FilterSechComponet } from "../../components/FilterSech/FilterSechComponet";

/* Tipagens */
import { AnotacaoProps } from "../../Types/GlobalTypes";

export function Anotacao(){

const [anotacao, setanotacao] = useState<AnotacaoProps[]>([]);
const [anotacaofiltrado, setanotacaoFiltrado] = useState("");

const [ModalVieweVisible, setModalViewVisible] = useState(false);
const [ModalEditVisible, setModalEditVisible] = useState(false);
const [AnotacaoEditado, setAnotacaoEditado] = useState<any>(null);
const [ModalAnotacaoSelecionado, setAnotacaoSelecionado] = useState<AnotacaoProps | null>(null);

const {getClientName} = useContext(ContextAplication);
const {getAtendimentoName} = useContext(ContextAplication);

const AnotacoesFiltrados = anotacao.filter((anotacoes) => anotacoes.name.toLowerCase().includes(anotacaofiltrado.toLowerCase())
);

 // Função para abrir o modal de visualização
 const handleActionViewModal = (id: string) => {
setModalViewVisible(!ModalVieweVisible);
const anotacoes = anotacao.find((anotacoes) => anotacoes.id === id);
if (anotacoes) {
  setAnotacaoSelecionado(anotacoes);
  setModalViewVisible(true);
}
};

// Função para abrir o modal de edição
function handleActionEditModal(anotacao: any) {
setAnotacaoEditado(anotacao)
setModalEditVisible(!ModalEditVisible);
}

 // Função para buscar os Historicos do banco de dados
 useEffect(() => {
    async function fetchErros() {
      try {
        const apiClient = setupApiClient();
        const responseAnotacao = await apiClient.get('/consulta/anotacao'); 
        setanotacao(responseAnotacao.data);
      } catch (err) {
        console.error("Erro ao buscar as Anotaçoes:", err);
      }
    }

    fetchErros();
  }, []);

// Função para excluir o tutorial
const handleDelete = async (id: string) => {
    try {
      const apiClient = setupApiClient();
      await apiClient.delete(`/anotacao/remove/${id}`);
      setanotacao(anotacao.filter((anotacoes) => anotacoes.id !== id));
      toast.success('Anotaçoes excluído com sucesso!');
    } catch (error) {
      console.error("Erro ao deletar o Anotaçoes:", error);
      toast.error('Erro ao excluir o Anotaçoes');
    }
};
  
  
// Função chamada para atualizar o tutorial no banco de dados
const handleUpdate = async (AnotacaoEditado: any) => {
try {
const apiClient = setupApiClient();
await apiClient.put(`/anotacao/update/${AnotacaoEditado.id}`, AnotacaoEditado); // Atualiza o Historico no backend
setanotacao(anotacao.map((anotacoes) =>
anotacoes.id === AnotacaoEditado.id ? AnotacaoEditado : anotacoes
));
toast.success('Anotação atualizado com sucesso!');
setModalEditVisible(false) // Fechar o modal após a atualização
} catch (error) {
toast.error('Erro ao atualizar o Anotação');
}
};

return(

<>

<main>

<ConteinerModalComponet Children={

<div>

<FilterSechComponet text="Anotações" onFilterChange={setanotacaoFiltrado}/>

<div className={Style.ConteinerConsulta}>
{AnotacoesFiltrados.length > 0 ? (
    AnotacoesFiltrados.map((anotacoes) => (
    <PreviewCard
    key={anotacoes.id}
    id={anotacoes.id}
    Children={
    <div>
      <div><SubtituloComponent text={anotacoes.name}/></div>
      <div><TextoComponent text={`${anotacoes.info}`}/></div>
    </div>}     
    onRemove={handleDelete}
    onEdit={() => handleActionEditModal(anotacoes)}
    onView={()=> handleActionViewModal(anotacoes.id)}
    />
))
) : (
<p>Nenhum erro encontrado.</p> // Mensagem caso não haja erros
)}
</div>
</div>

}
RegiterFunction={()=>alert("cadastro ativo")}/>


{ModalAnotacaoSelecionado && (
  <ModalViewerAnotacao anotacao={ModalAnotacaoSelecionado} isOpen={ModalVieweVisible} onClose={()=> setModalViewVisible(false)} />
)}
{ModalEditVisible && AnotacaoEditado && (
  <ModalEdicaoAnotacao anotacao={AnotacaoEditado} onSave={handleUpdate} isOpen={ModalEditVisible} onClose={() => setModalEditVisible(false)} />
)}


</main>

</>

)

}