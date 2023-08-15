import React, { useState, useEffect } from 'react';

function App() {
  const [issues, setIssues] = useState([]);
  const [filteredIssues, setFilteredIssues] = useState([]);
  const [selectedTag, setSelectedTag] = useState('todas');

  useEffect(() => {
    async function fetchIssues() {
      try {
        let allIssues = [];
        let page = 1;
        let response;
        let data = []

        do {
          response = await fetch(`https://api.github.com/repos/lincolixavier/tretadev/issues?page=${page}`);
          data = await response.json();
          allIssues = allIssues.concat(data);
          page++;
        } while (data.length > 0);

        const issuesFormated = allIssues.map((issue) => {
          return {
            ...issue,
            created_at: dateBrasilian(issue.created_at),
          }
        })

        setIssues(issuesFormated);
        setFilteredIssues(issuesFormated);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchIssues();
  }, []);

  const dateBrasilian = (isoDateString) => {
    const isoDate = new Date(isoDateString);
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const brasilFormattedDate = isoDate.toLocaleDateString('pt-BR', options);
    return brasilFormattedDate;
  }

  const handleTagClick = (tags) => {
    setSelectedTag(tags);
  
    if (tags.includes('todas')) {
      setFilteredIssues(issues);
    } else {
      const filtered = issues.filter((issue) =>
        tags.some((tag) =>
          (issue.title && issue.title.toLowerCase().includes(tag)) ||
          (issue.body && issue.body.toLowerCase().includes(tag))
        )
      );
  
      setFilteredIssues(filtered);
    }
  };  
  
  return (
    <div className="App">
      <h1>Treta Dev 🔥</h1>
      <div>
        <button>
          <a href="https://github.com/lincolixavier/tretadev/issues/new" target="_blank" rel="noopener noreferrer">
            Adicionar treta
          </a>
        </button>
      </div>
      <div>
        <button onClick={() => handleTagClick(['todas'])}>
          Todas
        </button>
        <button onClick={() => handleTagClick(['backend', 'back', 'api', 'heroku', 'mongodb', 'nosql', 'sql'])}>
          Backend
        </button>
        <button onClick={() => handleTagClick(['frontend', 'front', 'botão', 'react', 'reactjs', 'angular', 'vue', 'vuejs','tailwind'])}>
          Frontend
        </button>
        <button onClick={() => handleTagClick(['dados', 'mongodb', 'nosql', 'sql'])}>
          Dados
        </button>
        <button onClick={() => handleTagClick(['teste', 'tester'])}>
          QA
        </button>
        <button onClick={() => handleTagClick(['open-source', 'open source'])}>
          Open-source
        </button>
        <button onClick={() => handleTagClick(['junior'])}>
          Junior
        </button>
        <button onClick={() => handleTagClick(['pleno'])}>
          Pleno
        </button>
        <button onClick={() => handleTagClick(['senior'])}>
          Senior
        </button>
        <button onClick={() => handleTagClick(['sistema operacional', 'linux', 'windows', 'ubuntu'])}>
          Sistema operacional
        </button>
        <button onClick={() => handleTagClick(['vim', 'nvim'])}>
          IDE
        </button>
        <button onClick={() => handleTagClick(['html'])}>
          HTML
        </button>
        <button onClick={() => handleTagClick(['css'])}>
          CSS
        </button>
        <button onClick={() => handleTagClick(['javascript', 'react', 'reactjs'])}>
          JavaScript
        </button>
        <button onClick={() => handleTagClick(['php'])}>
          PHP
        </button>
        <button onClick={() => handleTagClick(['python'])}>
          Python
        </button>
        <button onClick={() => handleTagClick(['java'])}>
          Java
        </button>
        <button onClick={() => handleTagClick(['django'])}>
          Django
        </button>
        <button onClick={() => handleTagClick(['flutter'])}>
          Flutter
        </button>
        <button onClick={() => handleTagClick(['design', 'ui', 'ux'])}>
          Design
        </button>
        <button onClick={() => handleTagClick(['commit'])}>
          Commit
        </button>
        <button onClick={() => handleTagClick(['processo seletivo', 'burnout', 'emprego', 'vaga', 'dev', 'devs', 'profissão', 'fit cultural', 'recrutador', 'linkedin', 'github', 'salário', 'daily', 'empresa', 'engenheiro', 'mil', 'carreira', 'salário', 'clt', 'pj'])}>
          Carreira
        </button>
        <button onClick={() => handleTagClick(['tecnologia', 'programação', 'programar', 'programa', 'programador', 'low-code', 'low code', 'cookies', 'computação'])}>
          Tecnologia
        </button>
        <button onClick={() => handleTagClick(['faculdade'])}>
          Faculdade
        </button>
        <button onClick={() => handleTagClick(['gambiarra'])}>
          Gambiarra
        </button>
        <button onClick={() => handleTagClick(['esquerda', 'direita'])}>
          Politica
        </button>
      </div>
      <ul>
        {filteredIssues.map(issue => (
          <li key={issue.id}>
            <h2>{issue.title}</h2>
            <p>{issue.body}</p>
            <a href={issue.html_url} target='_blank' rel="noreferrer">Link da treta</a>
            <p>Criada por: {issue.user.login}</p>
            <p>Criada em: {issue.created_at}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
