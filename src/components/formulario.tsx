import { useState } from "react";
import Cliente from "../core/cliente";
import button from "./Button";
import Entrada from "./Entrada";

interface FormularioProps{

    cliente: Cliente
    clienteMudou?: (cliente: Cliente) => void
    cancelado?: () => void


}
export default function Formulario(props: FormularioProps) {
    const id = props.cliente?.id 
    const [nome, setNome] = useState(props.cliente?.nome ?? '')
    const [idade, setIdade] = useState(props.cliente?.idade ?? 0) 


    return (
        <div>
            {id ? (
                <Entrada 
                somenteLeitura
                texto="Código" 
                valor={id} 
                className="mb-5" 
                />


            ): false}

            <Entrada 
            texto="Nome" 
            valor={nome} 
            valorMudou={setNome}
            className="mb-5"
            
            /> 
            <Entrada 
            texto="Idade" 
            tipo="number" 
            valor={idade} 
            valorMudou={setIdade}
            className="mb-5"

            /> 

            <div className="flex justify-end mt-7"> 
                <button color="blue" className="mr-2" onClick={() => props.clienteMudou?.(new Cliente(nome, +idade, id))}>

                    {id ? 'Alterar' : 'Salvar'}

                </button> 

                <button onClick={props.cancelado}>
                    Cancelar

                </button>
            </div>



        </div>
    )
}