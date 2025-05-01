import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

//icones
import { TfiAlignJustify } from "react-icons/tfi";
import { SlNote } from "react-icons/sl";// icone de nota
import { MdOutlineMailOutline } from "react-icons/md";// icone de email
import { FaUser } from "react-icons/fa"; // icone pessoa
import { FaHome } from "react-icons/fa"; // icone de casa
import { BiMessageError } from "react-icons/bi";// icone de erro
import { BsCalendarDateFill } from "react-icons/bs";// icone calendario
import { LuMonitorPlay } from "react-icons/lu"; // icone de tutorial
import { MdOutlineHistory } from "react-icons/md"; // icone de hitorico

import StyleNav from "./styleNav.module.css";
import Logo from "../../assets/imagens/logo.png";

export function NavBar(){
const [isClienteOpen, setIsClienteOpen] = useState(false);
const [isErroOpen, setIsErroOpen] = useState(false);
const [isTutorialOpen, setIsTutorialOpen] = useState(false);
const [isAgendamentoOpen, setIsAgendamentoOpen] = useState(false);
const [isAnotacoesOpen, setIsAnotacoesOpen] = useState(false);
const [isHistoricoOpen, setIsHistoricoOpen] = useState(false);

const navigate = useNavigate();
const handleNavigation = (path:string) => {
    navigate(path);
};

return(

<>

<header>

<div id={StyleNav.ConteinerNav}>

    <div className={StyleNav.BoxLogo}><img src={Logo} alt="" /></div>

    <nav className={StyleNav.ConteinerButton}>

    <div className={StyleNav.BoxButton}>
        <button onClick={() => handleNavigation('/')}><FaHome/></button>
        <button onClick={() => handleNavigation('/cliente')} ><FaUser/></button>
        <button onClick={() => handleNavigation('/erros')}><BiMessageError /></button>
        <button onClick={() => handleNavigation('/email')}><MdOutlineMailOutline/></button>

        <button onClick={() => handleNavigation('tutorial')}><LuMonitorPlay/></button>
        <button onClick={() => handleNavigation('/agendamento')}><BsCalendarDateFill/></button>
        <button onClick={() => handleNavigation('/anotacoes')}><SlNote/></button>
        <button onClick={() => handleNavigation('/historico')}><MdOutlineHistory/></button>

    </div>

    </nav>

</div>

</header>

</>

)

}