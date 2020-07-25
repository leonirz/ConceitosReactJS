import React, { useState, useEffect } from 'react';
import api from './services/api.js';  // com js ou não?

import "./styles.css";

function App() {
  
  //array de repositórios - local FRONTEND
  const [repositories, setRepositories] = useState([]); 

  useEffect(() => {
    api.get('repositories').then(response=>{
        //console.log(response);
        setRepositories(response.data);
    }); //rota sem contar a base-URL
  }, []); // uma função disparada uma vez quando . O array [] é conhecido como array de dependências

  
  async function handleAddRepository() {
    // TODO

    const response = await api.post('repositories', {
      //title: 'Desafio ReactJS',        // title: `Desafio ReactJS ${Date.now()}`,
      id: 0,
      url: "https://github.com/josepholiveira",
      title: "Desafio ReactJS",
      techs: ["React", "Node.js"],
  });

  const newRepository = response.data;

  setRepositories([...repositories, newRepository]);
  
  
  //console.log("olha ali");

  }

  async function handleRemoveRepository(id) {
    // TODO

    await api.delete(`/repositories/${id}`);
    const newRepositories = repositories.filter(repository => repository.id !== id);
    setRepositories(newRepositories);


  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(theRepository => <li key={theRepository.id}>{theRepository.title}<button onClick={() => handleRemoveRepository(theRepository.id)}>Remover</button></li>
                                           
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
