
import { useState } from "react";
import Style from "./Style.module.css";
import { TituloComponet } from "../ComponentText/CompoenetText";


type FilterSechProps = {
text:string;
onFilterChange?: (value: string) => void;
}

export function FilterSechComponet({ text, onFilterChange }:FilterSechProps){

const [filtro, setFiltro] = useState("");

const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFiltro(value);
    onFilterChange?.(value); // chama callback se foi passada
  };

return(
<div className={Style.boxPesquisa}>
    <TituloComponet text={`Consulta ${text}`}/>
              
        <input
        type="text"
        placeholder={`Buscar os ${text} por nome`}
        value={filtro}
        onChange={handleFilter}
        />
</div>
)

}