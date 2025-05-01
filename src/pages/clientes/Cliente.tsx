import { useState, useEffect } from "react";
import Style from "./StyleConsultaCliente.module.css";
import Modal from "react-modal";
import { setupApiClient } from "../../service/api";
import { toast } from "sonner";

import { FilterSechComponet } from "../../components/FilterSech/FilterSechComponet";
import { PreviewCard } from "../../components/PreviewCard/PreviewCard" // Modal cliente
import { ModalEdicaoCliente } from "../../components/Modal/ComponentEdicao/ComponetsEdicao";
import { ModalViewCliente } from "../../components/Modal/ComponentPreviw/ComponentsPreviw";
import { ModalRegisterClient } from "../../components/Modal/ComponentCadastro/ComponentRegister";

/* componentes de texto */
import { TituloComponet } from "../../components/ComponentText/CompoenetText";
import { SubtituloComponent } from "../../components/ComponentText/CompoenetText";
import { TextoComponent } from "../../components/ComponentText/CompoenetText";
import { ConteinerModalComponet } from "../../components/ConteinerModalComponet/ConteinerModalComponet";


import { GrAdd } from "react-icons/gr";
import { IoMdClose } from "react-icons/io";

/* tipagens */
import { SistemaProps } from "../../Types/GlobalTypes";
import { ClienteProps } from "../../Types/GlobalTypes";


export function Cliente() {
  const [clientes, setClientes] = useState<ClienteProps[]>([]);
  const [clienteSelecionado, setClienteSelecionado] = useState<ClienteProps | null>(null);
  const [sistemas, setSistemas] = useState<SistemaProps[]>([]); // Adicionando o estado para armazenar sistemas
  const [Clientesfiltrados, setClientesFiltrados] = useState("");
  const [clienteEditando, setClienteEditando] = useState<ClienteProps | null>(null);
  
  const [ModalEditVisible, setModalEditVisible] = useState(false);
  const [ModalViewVisible, setModalViewVisible] = useState(false);
  const [ModalRegisterVisible, setModalRegisterVisible] = useState(false);
 
  // Carregar lista de clientes e sistemas ao montar o componente
  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiClient = setupApiClient();
        
        // Buscar lista de clientes
        const responseClientes = await apiClient.get("/consulta");
        setClientes(responseClientes.data);
        setClienteSelecionado(responseClientes.data)

        // Buscar lista de sistemas
        const responseSistemas = await apiClient.get("consulta/sistem"); // Ajuste a rota de acordo com a sua API
        setSistemas(responseSistemas.data);
      } catch (error) {
        console.error("Erro ao buscar os clientes ou sistemas:", error);
        toast.error("Erro ao carregar os dados!");
      }
    };
    fetchData();
  }, []);

  const handleActionModalView = (id: string) => {
    setModalViewVisible(true);
    const cliente = clientes.find((cliente) => cliente.id === id);
  setClienteSelecionado(cliente || null);
    console.log("Modal Aberto")
  };

  const handleActionModalRegister = () => {
    setModalRegisterVisible(!ModalRegisterVisible);
  };

  const handleActionModalEdit = (cliente: ClienteProps) => {
    // Defina o cliente a ser editado
    setClienteEditando(cliente);
    setModalEditVisible(!ModalEditVisible);
  };

  // Atualizar cliente no banco de dados
  const handleUpdate = async (clienteEditado: ClienteProps) => {
    if (!clienteEditado || !clienteEditado.id) {
      toast.error("Dados do cliente não encontrados!");
      return;
    }

    try {
      console.log("Dados a serem enviados para atualização:", clienteEditado);
      const apiClient = setupApiClient();
      await apiClient.put(`/update/${clienteEditado.id}`, clienteEditado);
      setClientes((prevClientes) =>
        prevClientes.map((cliente) =>
          cliente.id === clienteEditado.id ? clienteEditado : cliente
        )
      );
      toast.success("Cliente atualizado com sucesso!");
      setModalEditVisible(false)
    } catch (error) {
      console.error("Erro ao atualizar o cliente:", error);
      toast.error("Erro ao atualizar o cliente.");
    }
  };

  // Função para excluir o cliente
  const handleDelete = async (id: string) => {
    try {
      const apiClient = setupApiClient();
      await apiClient.delete(`/cliente/remove/${id}`);
      setClientes(clientes.filter((cliente) => cliente.id !== id));
      toast.success('Cliente excluído com sucesso!');
    } catch (error) {
      console.error("Erro ao deletar o cliente:", error);
      toast.error('Erro ao excluir o cliente');
    }
  };


  const getSistemaNome = (sistem_id: string) => {
    const sistema = sistemas.find((s) => s.id === sistem_id);
    return sistema ? sistema.name : "Sistema Desconhecido"; 
  };

  // Filtrar clientes com base no nome
  const clientesFiltrados = clientes.filter((cliente) =>
    cliente.name.toLowerCase().includes(Clientesfiltrados.toLowerCase())
  );

  // Usando useEffect para atualizar o modal quando clienteEditando for atualizado
  useEffect(() => {
    if (clienteEditando) {
      setModalEditVisible(true);
    }
  }, [clienteEditando]); 

  return (
    <main>
      <ConteinerModalComponet Children={
        <div>
          <div className={Style.ConteinerPage}>
            {/* Barra de pesquisa */}
            <FilterSechComponet text="Clientes" onFilterChange={setClientesFiltrados}/>

            <div className={Style.BoxPage}>
              {clientesFiltrados.length > 0 ? (
                clientesFiltrados.map((cliente) => (
                  <PreviewCard
                    key={cliente.id}
                    id={cliente.id}
                    Children={
                      <div>
                          <SubtituloComponent text={cliente.name}/>
                          <TextoComponent text={`Sistema: ${getSistemaNome(cliente.sistem_id)}`}/>
                          <TextoComponent text={`Número de máquinas: ${cliente.numero_maquina}`}/>
                          <TextoComponent text={`Fiscal: ${cliente.fiscal}`}/>
                      </div>
                    }
                    onEdit={() => handleActionModalEdit(cliente)}
                    onRemove={handleDelete}
                    onView={() => handleActionModalView(cliente.id)}
                  />
                ))
              ) : (
                <p>Nenhum cliente encontrado.</p>
              )}
            </div>
          </div>

        </div>
      }
      RegiterFunction={()=> setModalRegisterVisible(true)} />

          {/* Modal de edição */}
            {clienteEditando && (
            <ModalEdicaoCliente
              isOpen={ModalEditVisible}
              onClose={()=> setModalEditVisible(false)}
              cliente={clienteEditando} 
              onUpdate={handleUpdate}
            />
          )}

          {/* Modal que exibe os detalhes do cliente */}
          {ModalViewVisible && clienteSelecionado && (
            <ModalViewCliente
             
              id={clienteSelecionado.id}
              cliente={clienteSelecionado.name}
              type={clienteSelecionado.type}
              fiscal={clienteSelecionado.fiscal}
              sistem_id={clienteSelecionado.sistem_id}
              numero_maquinas={clienteSelecionado.numero_maquina}
              email={clienteSelecionado.email}
              obs={clienteSelecionado.obs}
              cnpj={clienteSelecionado.cnpj}
              telefone={clienteSelecionado.telefone}
              vencimento_certificado={clienteSelecionado.vencimento_certificado}
              isOpen={ModalViewVisible}
              onClose={() => setModalViewVisible(false)}
            />
          )}

          {/* Modal cadastro */}
          {ModalRegisterVisible && (
            <ModalRegisterClient 
            isOpen={ModalRegisterVisible}
            onClose={handleActionModalRegister}
            
            />
          )}


    </main>
  );
}

