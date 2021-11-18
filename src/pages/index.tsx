import button from "../components/Button"
import Formulario from "../components/formulario";
import Layout from "../components/Layout"; 
import Tabela from "../components/tabela";
import useClientes from "../hooks/useclientes";

export default function Home() {

  const { cliente, clientes, clienteSelecionado, clienteExcluido, salvarCliente, tabelaVisivel, exibirTabela} = useClientes()

  const repo: ClienteRepositorio = new ColecaoCliente()

const [cliente, setCliente] = useState<Cliente>(Cliente.vazio)
const [clientes, setClientes] = useState<Cliente[]>([])

  const [visivel, setVisivel] = useState<'tabela' | 'formulario'>('tabela')

  useEffect(obterTodos, [])

  function obterTodos(){

    repo.obterTodos().then(clientes => {
      setClientes(clientes)
      setVisivel('tabela')

    })


  }



function clienteSelecionado (cliente: Cliente) {

setCliente(cliente)
setVisivel('formulario')
}

async function clienteExcluido (cliente: Cliente) {
await repo.excluir(cliente)
obterTodos()

}

function novoCliente() {
  setCliente(Cliente.vazio())
  setVisivel('formulario') 
}

async function salvarCliente(cliente: Cliente) {
await repo.salvar(cliente)
obterTodos()
}



  return (
    <div className={`
  flex justify-center items-center h-screen 
    bg-gradient-to-r from-blue-500  
    text-gray 
    `}>

      <Layout titulo="Cadastro">

        {tabelaVisivel ? (

<> 

<div className="flex justify-end">
<button className="mb-4" onClick={novoCliente}>
  Novo Cliente
  </button>


</div> 



<Tabela clientes={clientes} 
clienteSelecionado={clienteSelecionado}
clienteExcluido={clienteExcluido} /> 

</>

        ): (
          
      <Formulario 
      cliente={cliente} 
      clienteMudou={salvarCliente}
      cancelado={exibirTabela} 

      />

        )}
        
        </Layout>

  
    </div>
  ) 
}
