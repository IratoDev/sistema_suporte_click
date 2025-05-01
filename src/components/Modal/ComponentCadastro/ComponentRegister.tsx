import { useState, useEffect, ChangeEvent, FormEvent} from 'react';
import { setupApiClient } from '../../../service/api';
import { toast } from 'react-toastify';
import Style from './Style.module.css'

import Modal from 'react-modal'
import { IoMdClose } from "react-icons/io";
import { FiUpload } from "react-icons/fi";

/* tipagens */
import { SistemaProps } from '../../../Types/GlobalTypes';
import { ClienteProps } from '../../../Types/GlobalTypes';


/* cadastro cliente */

type ClientRegister = {
onClose: () => void;
isOpen:boolean;
}

export function ModalRegisterClient({ onClose, isOpen}:ClientRegister ){

const [Nome, setNome] = useState('');
const [Email, setEmail] = useState('');
const [Maquinas, setMaquinas] = useState<number>(0);
const [VencimentoCertificado, setVencimentoCertificado] = useState<Date | undefined>(new Date("0000-00-00"))
const [Cnpj, setCnpj] = useState('');
const [Telefone, setTelefone] = useState('');

const [Sistema, setSistema] = useState<SistemaProps[]>([]);
const [SistemaSelected, setSistemaSelected] = useState(0);
const [FiscalSelected, setFiscalSelected] = useState<string>("SEM FISCAL");
const [TypeSelected, setTypeSelected] = useState<string>("NOVO");
const [observacao, setObservacao] = useState('');

  
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

function handleChangeSistem(event: ChangeEvent<HTMLSelectElement>) {
setSistemaSelected(Number(event.target.value));
}

function handleChangeFiscal(event: ChangeEvent<HTMLSelectElement>) {
setFiscalSelected(String(event.target.value));
}

function handleChangeType(event: ChangeEvent<HTMLSelectElement>) {
setTypeSelected(String(event.target.value));
}

async function handleRegister(event: FormEvent) {
    
event.preventDefault();

if (Nome === "") {
toast.error("Preencha todos os campos");
return;
}

console.log("esse é o nome:", Nome)
console.log("esse é o maquinas:", Maquinas)
console.log("esse é o email:", Email)
console.log("esse é o sistema:", Sistema[SistemaSelected].id)

const data = {
name: Nome,
email: Email,
status_email:false,
obs:observacao,
type:TypeSelected,
numero_maquina:  Maquinas,
sistem: `${Sistema[SistemaSelected].id}`,
fiscal: FiscalSelected,
vencimento_certificado: VencimentoCertificado,
cnpj: Cnpj,
telefone: Telefone
};


console.log("esse é o objeto:",data)

try {
const apiClient = setupApiClient();
await apiClient.post('/cadastro/cliente', data);
setNome('');
setEmail('');
setMaquinas(0);
setObservacao('');
setSistemaSelected(0);
setFiscalSelected('SEM FISCAL');
setVencimentoCertificado(new Date("0000-00-00"))
setCnpj('');
setTelefone('');
window.location.reload();
toast.success('Cadastrado com sucesso!');
} catch (err:any) {
console.error('Erro:', err.response?.data || err.message);
toast.error("Ops! Erro ao cadastrar");
}
}

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

return(

<>

<Modal isOpen={isOpen} onRequestClose={onClose} style={customStyles}>

<div id={Style.Conteiner}>

<button onClick={onClose}> <IoMdClose/> </button>

<h1>Cadastro de Cliente</h1>

<form onSubmit={handleRegister}>

            <label>
                <legend>Nome:</legend>
                <input type="text" name="nome" onChange={(e) => setNome(e.target.value)}/>
            </label>

            <label>
                <legend>Email:</legend>
                <input type="text" name="email" onChange={(e) => setEmail(e.target.value)}/>
            </label>

            <label>
                <legend>Numero de maquinas:</legend>
                <input type="number" name="maquinas" onChange={(e) => setMaquinas(Number(e.target.value))}/>
            </label>

            <label>
                <legend>Cnpj:</legend>
                <input type="number" name="cnpj" onChange={(e) => setCnpj(e.target.value)}/>
            </label>

            <label>
                <legend>Telefone:</legend>
                <input type="number" name="telefone" onChange={(e) => setTelefone(e.target.value)}/>
            </label>

            <label>
                <legend>Validade certificado digital:</legend>
                <input type="date" name="Vencimento certificado" onChange={(e) => setVencimentoCertificado(new Date(e.target.value))}/>
            </label>
            
            <div className={Style.ConteinerSelect}>
            <label>
                <legend>Fiscal:</legend>
                <select name="fiscal" value={FiscalSelected} onChange={handleChangeFiscal}>
                <option value="SEM FISCAL">SEM FISCAL</option>
                <option value="NFCE">NFCE</option>
                <option value="NFE">NFE</option>
                <option value="NFCE/NFE">NFCE/NFE</option>
            </select>
            </label>

            <label>
                <legend>tipo de cliente:</legend>
                <select name="type" value={TypeSelected} onChange={handleChangeType}>
                <option value="NOVO">NOVO</option>
                <option value="PROBLEMATICO">PROBLEMATICO</option>
                <option value="AGRADAVEL">AGRADAVEL</option>
            </select>
            </label>
            
            <label>
                <legend>Sistema:</legend>
                <select name="sistema" value={SistemaSelected} onChange={handleChangeSistem}>
               
                {Sistema.map((item, index) => (
                <option key={item.id} value={index}>
                {item.name}
                </option>
                 ))}

                </select>
            </label>
            </div>
            
            <label>
                <legend>observaçoes:</legend>
                <textarea name="obs" onChange={(e) => setObservacao(e.target.value)}/>
            </label>

            <button type="submit">Cadastrar Cliente</button>

</form>

</div>

</Modal>

</>

)


}

/* cadastro de erro */

export function ModalRegisterErroSistem({ onClose, isOpen}:ClientRegister){

const [Nome, setNome] = useState('');
const [Causa, setCausa] = useState('');
const [Solucao, setSolucao] = useState('');
const [imagemUrl, setImagemUrl] = useState('');
const [imageErro, setImageErro] = useState<File | null>(null);

const [sistema, setSistema] = useState<SistemaProps[]>([]);
const [SistemaSelected, setSistemaSelected] = useState(0);

function handleFile(e: ChangeEvent<HTMLInputElement>) {
  if (!e.target.files) return;

  const image = e.target.files[0];
  if (image && (image.type === 'image/jpeg' || image.type === 'image/jpg' || image.type === 'image/png')) {
    setImageErro(image);
    setImagemUrl(URL.createObjectURL(image));
  }
}

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

function handleChangeSistem(event: ChangeEvent<HTMLSelectElement>) {
setSistemaSelected(Number(event.target.value));
console.log(SistemaSelected)
console.log(sistema)
}


async function handleRegister(event: FormEvent) {
  event.preventDefault();

  if (Nome === "" || imageErro === null) {
    toast.error("Preencha todos os campos");
    return;
  }

  const Sistema = `${sistema[SistemaSelected].id}`;

  const data = new FormData();
  data.append('nome', Nome);
  data.append('causa', Causa);
  data.append('solucao', Solucao);
  data.append('sistem_id', Sistema);
  if (imageErro) {
    data.append('imagem', imageErro); // Verifique se o nome está correto para o backend
  }


  try {
    const apiClient = setupApiClient();
    await apiClient.post('/cadastro/erro', data);
    toast.success('Erro cadastrado com sucesso!');
    onClose();
  
  } catch (err: any) {
    toast.error("Ops! Erro ao cadastrar");
  }
}

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

return(

<>

<Modal isOpen={isOpen} onRequestClose={onClose} style={customStyles}>
<div className={Style.ConteinerModalErro}>
    
    <button onClick={onClose}><IoMdClose/></button>

    <h1>Cadastro de Erros do sistema</h1>
    
    <form onSubmit={handleRegister}>
          <label>
            <span className={Style.BoxIcon}>
              <FiUpload size={30} color="#fff" />
            </span>
            <input type="file" accept="image/png, image/jpeg, image/jpg" onChange={handleFile} />
            {imagemUrl && <img className={Style.previw} src={imagemUrl} alt="foto do erro" width={250} height={250} />}
          </label>

          <select name="sistema" value={SistemaSelected} onChange={handleChangeSistem}>
          {sistema.map((item, index) => (
                <option key={item.id} value={index}>
                {item.name}
                </option>
                 ))}
          </select>

          <input
            className={Style.input}
            type="text"
            placeholder="Digite o nome do erro"
            value={Nome}
            onChange={(e) => setNome(e.target.value)}
          />

          <textarea
            className={Style.input}
            placeholder="Descreva a causa do erro"
            value={Causa}
            onChange={(e) => setCausa(e.target.value)}
            rows={10}
          />

          <textarea
            className={Style.input}
            placeholder="Descreva a solução do erro"
            value={Solucao}
            onChange={(e) => setSolucao(e.target.value)}
            rows={10}
          />

          <button className={Style.buttonAdd} type="submit">
            Cadastrar
          </button>
    </form>
</div>
</Modal>

</>

)

}