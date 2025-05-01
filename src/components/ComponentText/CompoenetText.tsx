
import Style from "./Style.module.css"

type TextsComponent = {
text:string;  
}


export function TituloComponet({text}:TextsComponent){

return(

<h1 className={Style.Titulo}>{text}</h1>

)

}

export function SubtituloComponent({text}:TextsComponent){

return(

<h3 className={Style.SubTitulo}>{text}</h3>

)

}

export function TextoComponent({text}:TextsComponent){

return(

<p className={Style.Texto}>{text}</p>

)

}