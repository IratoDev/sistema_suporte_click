import { useState, useEffect } from "react";
import Style from "./StyleEnvioEmail.module.css";


import { PreviewCardEmail } from "../../components/PreviewCard/PreviewCard";
import { setupApiClient } from "../../service/api";
import { toast } from "sonner";

import { Spiner } from "../../components/Carregamento";
import { BsArchive } from "react-icons/bs";

/* tipagens */
import { ClientEmailProps } from "../../Types/GlobalTypes";



export function EmailPage() {
const [clientes, setClientes] = useState<ClientEmailProps[]>([]);
const [loading, setLoading] = useState(false);


useEffect(() => {
    const fetchClientes = async () => {
        try {
            const apiClient = setupApiClient();
            const response = await apiClient.get('/consulta');
            setClientes(response.data);
        } catch (error) {
            console.error("Erro ao buscar os clientes:", error);
        }
    };
    fetchClientes();
}, []);

    

const EnviaEmail = async (id:string, nome: string, email: string, arquivo: File | null) => {
    if (!arquivo) {
        toast.warning("Por favor, selecione um arquivo.");
        return;
    }
    if (!email) {
        //console.log("Por favor, forneça um e-mail.");
        return;
    }
    setLoading(true); // Inicia o carregamento
    const formData = new FormData();
    formData.append('nome', nome);
    formData.append('email', email);
    formData.append('arquivo', arquivo);
    try {
        const apiClient = setupApiClient();
        await apiClient.post('/envio', formData);
        await apiClient.put(`/status/update/${id}`, { status_email: true });
        toast.success('E-mail enviado com sucesso:');
    } catch (error) {
        toast.error('Erro ao enviar e-mail:');
    } finally {
        setLoading(false); // Finaliza o carregamento
    }
};

return (
<>
<main>
<section id={Style.EnvioEmail}>
        <div className={Style.ConteinerPage}>
            <div className={Style.BoxPage}>
                {loading ? ( // Condição para exibir o indicador de carregamento
                    <Spiner/>
                ) : (
                    clientes.map(cliente => (
                        <PreviewCardEmail 
                                key={cliente.id} 
                                cliente={cliente.name} 
                                email={cliente.email}
                                arquivo={async (nome, email, arquivo) => {
                                    await EnviaEmail(cliente.id, nome, email, arquivo);
                                }} 
                                status={cliente.status_email} 
                            />
                    ))
                )}
            </div>
        </div>
</section>        
</main>  
</>
);
}
