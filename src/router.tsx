import { BrowserRouter,Routes,Route } from "react-router-dom";

import { EmailPage } from "./pages/EnviaEmail/EnvioEmail";
import { Dashboard } from "./pages/Dashboard";
import { Tutorial } from "./pages/tutorial/Tutorial";
import { Agendamento } from "./pages/agendamentos/Agendamento";
import { Anotacao } from "./pages/anotacao/Anotacao";
import { Historico } from "./pages/historico/Historico";
import { Erros } from "./pages/errosSistema/Erros";
import { Cliente } from "./pages/clientes/Cliente";
import { ProviderAplication } from "./context/ContextApi";

import { NavBar } from "./components/Nav/NavBar";


export default function AppRouter(){

return(

<BrowserRouter>

<NavBar/>
<ProviderAplication>

<Routes>

<Route path="/" element={<Dashboard/>} />
<Route path="/email" element={<EmailPage/>} />
<Route path="/erros" element={<Erros/>} />
<Route path="/tutorial" element={<Tutorial/>} />
<Route path="/cliente" element={<Cliente/>} />
<Route path="/anotacoes" element={<Anotacao/>} />
<Route path="/agendamento" element={<Agendamento/>} />
<Route path="/historico" element={<Historico/>} />

</Routes>

</ProviderAplication>

</BrowserRouter>

)
}