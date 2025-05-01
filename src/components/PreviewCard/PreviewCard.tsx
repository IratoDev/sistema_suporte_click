import { useState, Children, ReactNode } from 'react';
import { toast } from "sonner";
import Style from './Style.module.css';

import { TextoComponent } from "../ComponentText/CompoenetText";
import { FiEye } from 'react-icons/fi'; // Ícone para o botão de visualização
import { BsArchive } from "react-icons/bs";


type PreviewCardProps = {

id:string;
Children: ReactNode;
onEdit: () => void;
onRemove: (id: string) => void;
onView?: () => void;

}

export function PreviewCard({id, Children, onEdit, onRemove, onView}:PreviewCardProps){

return(

<>

<div className={Style.ElementCadastroModal}>
    <div className={Style.ConteinerElemet}>

        {Children}
               
        <div className={Style.BoxButton}>
            <button onClick={()=>onEdit()}><TextoComponent text="Editar"/></button>
            <button onClick={() => onRemove(id)}><TextoComponent text="Excluir"/></button>
            <button onClick={onView}><FiEye/></button>
        </div>

    </div>
</div>

</>

)

}

type PreviewCardEmailProps = {
cliente: string; // Nome do cliente
email: string;   // Email do cliente
status: boolean; 
arquivo: (nome: string, email: string, arquivo: File | null) => Promise<void>; // Função para enviar o arquivo
};

export function PreviewCardEmail({ cliente, email, status, arquivo }: PreviewCardEmailProps) {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [BoxArquivo, setBoxArquivo] = useState(false)


    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        setSelectedFile(file);
        setBoxArquivo(!!file)
        console.log("Arquivo selecionado:", file);
        console.log(BoxArquivo)
    };
    
    const handleSendEmail = async () => {
        if (!selectedFile) {
            toast.warning("Por favor, selecione um arquivo.");
            return;
        }
    
        try {
            // Chama a função arquivo com os dados corretos
            await arquivo(cliente, email, selectedFile); // Verifique se o arquivo está sendo enviado
            setBoxArquivo(false)
            //console.log("Arquivo enviado com sucesso:", selectedFile);
        } catch (error) {
            //console.error("Erro ao enviar o arquivo:", error);
        }
    };


    return (
<>


<div className={Style.ElementClient}>
            <div className={Style.ConteinerElement}>
                <div className={Style.BoxText}>
                    <p>{cliente}</p>
                </div>
                
                <div className={Style.BoxInput}>

                    <label style={{ background: BoxArquivo ? "#03b81b" : "transparent" }}>

                    <span>

                    <BsArchive size="1em"/>

                    </span>

                    <input 
                        type="file" 
                        accept=".xml, .zip, .rar" 
                        onChange={handleFileChange} 
                    />
                    </label>
                </div>

                <div className={Style.BoxButton}> 
                    <button onClick={handleSendEmail}>Enviar</button> 
                </div>

                <div className={Style.BoxStatus}>
                    <span className={status ? Style.spanAtivo : Style.spanDesativado}>{status ? 'Enviado' : 'Pendente'}</span>
                </div>
            </div>
</div>

</>

);
}

export function PreviewNoteCard (){
    
}