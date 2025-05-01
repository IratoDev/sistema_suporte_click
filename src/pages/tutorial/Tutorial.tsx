import { useState, useEffect, ChangeEvent } from "react";
import Style from "./style.module.css"
import { setupApiClient } from "../../service/api";
import { toast } from "react-toastify";


import { PreviewCard } from "../../components/PreviewCard/PreviewCard";//modal cliente
import { TituloComponet } from "../../components/ComponentText/CompoenetText";
import { SubtituloComponent } from "../../components/ComponentText/CompoenetText";//componente Texto
import { TextoComponent } from "../../components/ComponentText/CompoenetText";//componente Texto
import { ConteinerModalComponet } from "../../components/ConteinerModalComponet/ConteinerModalComponet";

import { ModalEdicaoTutorial } from "../../components/Modal/ComponentEdicao/ComponetsEdicao";
import { ModalViewerTutorial } from "../../components/Modal/ComponentPreviw/ComponentsPreviw";

/* tipagem */
import { TutorialProps } from "../../Types/GlobalTypes";


export function Tutorial(){

  const [tutorial, setTutorial] = useState<TutorialProps[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [TutorialEditado, setTutorialEditado] = useState<any>(null); 
  const [modalTutorialSelecionado, setTutorialSelecionado] = useState<TutorialProps | null>(null);


 // Função para abrir o modal de visualização
const openModalView = (id: string) => {
setModalVisible(true);
const tutoriais = tutorial.find((tutoriais) => tutoriais.id === id);
if (tutoriais) {
  setTutorialSelecionado(tutoriais);
  setModalVisible(true);
}
};

const closeModalView = () => {
  setModalVisible(false);
  console.log("Modal Aberto")
};

// Função para abrir o modal de edição
function openModal() {
  setModalVisible(true);
}

// Função para fechar o modal de edição
function handleCloseModal() {
  setModalVisible(false);
  setTutorialEditado(null); // Limpar os dados do produto ao fechar o modal
}

// Função para buscar os Tutoriais do banco de dados
useEffect(() => {
     async function fetchTutoriais() {
       try {
         const apiClient = setupApiClient();
         const response = await apiClient.get('/consulta/tutorial'); 
         setTutorial(response.data);
       } catch (err) {
         console.error("Erro ao buscar Tutoriais:", err);
       }
     }
 
     fetchTutoriais();
}, []);

// Função para excluir o tutorial
const handleDelete = async (id: string) => {
  try {
    const apiClient = setupApiClient();
    await apiClient.delete(`/erro/remove/${id}`);
    setTutorial(tutorial.filter((tutoriais) => tutoriais.id !== id));
    toast.success('Tutorial excluído com sucesso!');
  } catch (error) {
    console.error("Erro ao deletar o erros:", error);
    toast.error('Erro ao excluir o Tutorial');
  }
};

// Função chamada ao clicar no botão "Editar"
const handleEdit = (tutoriais: any) => {
  setTutorialEditado(tutoriais); // Definir o erros a ser editado
  setIsEditModalOpen(true); // Abrir o modal de edição
};

// Função chamada para atualizar o tutorial no banco de dados
const handleUpdate = async (TutorialEditado: any) => {
  try {
    const apiClient = setupApiClient();
    await apiClient.put(`/tutorial/update/${TutorialEditado.id}`, TutorialEditado); // Atualiza o Tutorial no backend
    setTutorial(tutorial.map((tutoriais) =>
      tutoriais.id === TutorialEditado.id ? TutorialEditado : tutoriais
    ));
    toast.success('Tutorial atualizado com sucesso!');
    handleCloseModal(); // Fechar o modal após a atualização
  } catch (error) {
    console.error("Erro ao atualizar o Tutorial:", error);
    toast.error('Erro ao atualizar o Tutorial');
  }
};

return(

<>

<main>

<ConteinerModalComponet Children={

<div className={Style.ConteinerConsulta}>
  {tutorial.length > 0 ? (
    tutorial.map((tutoriais) => (
      <PreviewCard
        key={tutoriais.id}
        id={tutoriais.id}
        Children={<div>
          <div><SubtituloComponent text={tutoriais.nome}/></div>
          <div><img src={`http://localhost:3333/files/${tutoriais.imagem}`}/></div>
        </div>}     
        onRemove={handleDelete}
        onEdit={() => handleEdit(tutoriais)}
        onView={()=> openModalView(tutoriais.id)}
      />
    ))
  ) : (
    <p>Nenhum erro encontrado.</p> // Mensagem caso não haja erros
  )}
</div>

} 
RegiterFunction={()=>alert("cadastro ativo")}/>

{modalTutorialSelecionado && (
  <ModalViewerTutorial tutorial={modalTutorialSelecionado} isOpen={modalVisible} openModal={openModalView} onClose={closeModalView} />
)}
{isEditModalOpen && TutorialEditado && (
  <ModalEdicaoTutorial tutorial={TutorialEditado} onSave={handleUpdate} isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} />
)}

</main>

</>

)

}


