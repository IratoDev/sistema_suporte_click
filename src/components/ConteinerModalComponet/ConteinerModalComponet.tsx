
import { ReactNode } from 'react';
import Style from './Style.module.css';
import { GrAdd } from "react-icons/gr";

type ConteinerModalProps = {

Children: ReactNode;
RegiterFunction: () => void;

}

export function ConteinerModalComponet({Children, RegiterFunction }:ConteinerModalProps){

return(

<div className={Style.ConteinerModal}>

    <div className={Style.Conteiner}>

        <div className={Style.ConteinerConteudo}>
            {Children}
        </div>

        <div className={Style.BoxButtonRegister}>
            <button onClick={RegiterFunction}> <GrAdd /> </button>
        </div>

    </div>

</div>

)

}