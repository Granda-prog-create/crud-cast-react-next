import {useEffect, useState } from 'react';
import ColecaoCliente from "../backend/db/colecaocliente"
import Cliente from "../core/cliente"
import ClienteRepositorio from "../core/clienterepositorio"
import usetabela from './usetabela';

export default function useClientes () {
    const repo: ClienteRepositorio = new ColecaoCliente()

    const {tabelaVisivel, formularioVisivel, exibirFormulario, exibirTabela} = usetabela()

    const [cliente, setCliente] = useState<Cliente>(Cliente.vazio)
    
      const [visivel, setVisivel] = useState<'tabela' | 'formulario'>('tabela')
    
      useEffect(obterTodos, [])
    
      function obterTodos(){
    
        repo.obterTodos().then(clientes => {
          setClientes(clientes)
          exibirTabela()
    
        })
    
    
      }
    
    
    
    function clienteSelecionado (cliente: Cliente) {
    
    setCliente(cliente)
    exibirFormulario()    }
    
    async function clienteExcluido (cliente: Cliente) {
    await repo.excluir(cliente)
    obterTodos()
    
    }
    
    function novoCliente() {
      setCliente(Cliente.vazio())
    exibirFormulario()    }
    
    async function salvarCliente(cliente: Cliente) {
    await repo.salvar(cliente)
    obterTodos()
    }

    return {
        cliente,
        tabelaVisivel,
        novoCliente,
        salvarCliente,
        clienteExcluido,
        clienteSelecionado,
        obterTodos
    }
    
}