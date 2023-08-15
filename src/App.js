import React, { useState, useEffect } from 'react';
import './css/App.css';

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
      <img width="64" height="64" src="https://img.icons8.com/arcade/64/fire-element.png" alt="fire-element"/>
      <h1 id='title'>Treta Dev</h1>
      <div>
        <button>
          <a href="https://github.com/lincolixavier/tretadev/issues/new" target="_blank" rel="noopener noreferrer" id='btn-create'>
            Adicionar treta
          </a>
        </button>
      </div>
      <div>
        <button onClick={() => handleTagClick(['todas'])} className={selectedTag === 'todas' ? 'btn-tag-active' : 'btn-tag'}>
          Todas
        </button>
        <button onClick={() => handleTagClick(['backend', 'back', 'api', 'heroku', 'mongodb', 'nosql', 'sql'])} className={selectedTag === 'backend' ? 'btn-tag-active' : 'btn-tag'}>
          Backend
        </button>
        <button onClick={() => handleTagClick(['frontend', 'front', 'botão', 'react', 'reactjs', 'angular', 'vue', 'vuejs','tailwind'])} className={selectedTag === 'frontend' ? 'btn-tag-active' : 'btn-tag'}>
          Frontend
        </button>
        <button onClick={() => handleTagClick(['dados', 'mongodb', 'nosql', 'sql'])} className={selectedTag === 'dados' ? 'btn-tag-active' : 'btn-tag'}>
          Dados
        </button>
        <button onClick={() => handleTagClick(['teste', 'tester'])} className={selectedTag === 'qa' ? 'btn-tag-active' : 'btn-tag'}>
          QA
        </button>
        <button onClick={() => handleTagClick(['open-source', 'open source'])} className={selectedTag === 'open-source' ? 'btn-tag-active' : 'btn-tag'}>
          Open-source
        </button>
        <button onClick={() => handleTagClick(['junior'])} className={selectedTag === 'junior' ? 'btn-tag-active' : 'btn-tag'}>
          Junior
        </button>
        <button onClick={() => handleTagClick(['pleno'])} className={selectedTag === 'pleno' ? 'btn-tag-active' : 'btn-tag'}>
          Pleno
        </button>
        <button onClick={() => handleTagClick(['senior'])} className={selectedTag === 'senior' ? 'btn-tag-active' : 'btn-tag'}>
          Senior
        </button>
        <button onClick={() => handleTagClick(['sistema operacional', 'linux', 'windows', 'ubuntu'])} className={selectedTag === 'sistema operacional' ? 'btn-tag-active' : 'btn-tag'}>
          Sistema operacional
        </button>
        <button onClick={() => handleTagClick(['vim', 'nvim'])} className={selectedTag === 'ide' ? 'btn-tag-active' : 'btn-tag'}>
          IDE
        </button>
        <button onClick={() => handleTagClick(['html'])} className={selectedTag === 'html' ? 'btn-tag-active' : 'btn-tag'}>
          HTML
        </button>
        <button onClick={() => handleTagClick(['css'])} className={selectedTag === 'css' ? 'btn-tag-active' : 'btn-tag'}>
          CSS
        </button>
        <button onClick={() => handleTagClick(['javascript', 'react', 'reactjs'])} className={selectedTag === 'javascript' ? 'btn-tag-active' : 'btn-tag'}>
          JavaScript
        </button>
        <button onClick={() => handleTagClick(['php'])} className={selectedTag === 'php' ? 'btn-tag-active' : 'btn-tag'}>
          PHP
        </button>
        <button onClick={() => handleTagClick(['python'])} className={selectedTag === 'python' ? 'btn-tag-active' : 'btn-tag'}>
          Python
        </button>
        <button onClick={() => handleTagClick(['java'])} className={selectedTag === 'java' ? 'btn-tag-active' : 'btn-tag'}>
          Java
        </button>
        <button onClick={() => handleTagClick(['django'])} className={selectedTag === 'django' ? 'btn-tag-active' : 'btn-tag'}>
          Django
        </button>
        <button onClick={() => handleTagClick(['flutter'])} className={selectedTag === 'flutter' ? 'btn-tag-active' : 'btn-tag'}>
          Flutter
        </button>
        <button onClick={() => handleTagClick(['design', 'ui', 'ux'])} className={selectedTag === 'design' ? 'btn-tag-active' : 'btn-tag'}>
          Design
        </button>
        <button onClick={() => handleTagClick(['commit'])} className={selectedTag === 'commit' ? 'btn-tag-active' : 'btn-tag'}>
          Commit
        </button>
        <button onClick={() => handleTagClick(['processo seletivo', 'burnout', 'emprego', 'vaga', 'dev', 'devs', 'profissão', 'fit cultural', 'recrutador', 'linkedin', 'github', 'salário', 'daily', 'empresa', 'engenheiro', 'mil', 'carreira', 'salário', 'clt', 'pj'])} className={selectedTag === 'carreira' ? 'btn-tag-active' : 'btn-tag'}>
          Carreira
        </button>
        <button onClick={() => handleTagClick(['tecnologia', 'programação', 'programar', 'programa', 'programador', 'low-code', 'low code', 'cookies', 'computação'])} className={selectedTag === 'tecnologia' ? 'btn-tag-active' : 'btn-tag'}>
          Tecnologia
        </button>
        <button onClick={() => handleTagClick(['faculdade'])} className={selectedTag === 'faculdade' ? 'btn-tag-active' : 'btn-tag'}>
          Faculdade
        </button>
        <button onClick={() => handleTagClick(['gambiarra'])} className={selectedTag === 'gambiarra' ? 'btn-tag-active' : 'btn-tag'}>
          Gambiarra
        </button>
        <button onClick={() => handleTagClick(['esquerda', 'direita'])} className={selectedTag === 'politica' ? 'btn-tag-active' : 'btn-tag'}>
          Politica
        </button>
      </div>
      <ul>
        {filteredIssues.map(issue => (
          <li key={issue.id}>
            <h2><a href={issue.html_url} target='_blank' rel="noreferrer">{issue.title}</a></h2>
            <p>{issue.body}</p>
            {/* <a href={issue.html_url} target='_blank' rel="noreferrer">Link da treta</a> */}
            <p>Criada por: <a href={issue.user.html_url} target='_blank' rel="noreferrer">{issue.user.login}</a></p>
            <img src={issue.user.avatar_url} alt={issue.user.login} className='user-image' />
            <p>Criada em: {issue.created_at}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
