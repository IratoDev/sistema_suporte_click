
export type ClienteProps = {
id: string;
cliente: string;
name: string;
email: string;
type: string;
obs: string;
fiscal: string;
sistem_id: string;
sistema_nome: string;
numero_maquina: string;
cnpj:string;
telefone:string;
vencimento_certificado:Date;
onEdit: (id: string) => void;
onRemove: (id: string) => void;
};

export type HistoricoProps = {
id: string;
date: Date;
info: string;
categoria_atendimento_id: string;
cliente_id: string;
}

export type AtendimentoProps = {
id: string;
name: string;
};

export type SistemaProps = {
id: string;
name: string;
};

export type TutorialProps = {
id: string;
nome: string;
causa: string;
solucao: string;
imagem: string;
sistem_id: string
}

export type ErroProps = {
id: string;
nome: string;
causa: string;
solucao: string;
imagem: string;
sistem_id: string
}

export type ClientEmailProps = {
id:string
name:string
email: string;   // Email do cliente
status_email: boolean; 
arquivo: (nome: string, email: string, arquivo: File | null) => Promise<void>; // Função para enviar o arquivo
};

export type AnotacaoProps = {
id: string;
name:string;
info: string;
}