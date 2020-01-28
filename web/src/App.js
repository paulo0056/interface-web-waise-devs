// anotaçõoes:
// sempre q quiser usar alguma propriedade num campo html tem que colocar chaves ''{}''
// fragment : tag sem nomeclatura : ''<> </>''
// useState: função que cria um estado


import React, { useState, useEffect } from 'react';
import api from './services/api';
import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';

import DevForm from './components/DevForm';
import DevItem from './components/DevItem';
// Componente é um bloco isolado de html, css e js, o qual nao interfere no restante da aplicação
//Propriedade: Informações quje um componente PAI passa para o componente FILHO
//Estado: Informações mantidas pelo componente (Lembrar: imutabilidade)

function App() {// componente pai
  const [devs, setDevs] = useState([]);// usa as chaves para desestruturar oq o userState retorna, por isso aq esta dizendo q vai retornar devs e setDevs
  // nunca pode mudar o valor de um estado, por isso usa o setDevs pq ele cria um novo dado a partir do valor anterior
  useEffect(() => {   //useEffect serve pra disparar  uma função toda vez que uma informação alterar
    // ele recebe 2 parametros: 1 = qual função precisa executar, 2: quando precisa executar? e por ultimo manda um vetor, se estiver vazio--> 
    //-->ele executa uma vez so.Se tivesse uma variavel dentro do vetor, toda vez vez q o valor dela fosse alterado ele iria executar oq tem dentro desse codigo de novo
    async function loadDevs() {
      const response = await api.get('/devs');

      setDevs(response.data);
    }

    loadDevs();
  }, []);
  
    async function handleAddDev(data) {


        const response = await api.post('/devs', data) 
         
        
         setDevs([...devs, response.data]);//copia todos os devs e adiciona o novo no final
      }
    
  return (//filhos
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev}/>
      </aside>
      <main>
          <ul>
            {devs.map(dev => (
              <DevItem key={dev._id} dev={dev} />
            ))}
            
          </ul>
      </main>

    </div>
  );
}

export default App;
