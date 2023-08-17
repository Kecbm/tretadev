import React, { useState, useEffect } from 'react';
import './css/App.css';

function App() {
  const [issues, setIssues] = useState([]);
  const [filteredIssues, setFilteredIssues] = useState([]);
  const [selectedTag, setSelectedTag] = useState('todas');

  useEffect(() => {
    async function fetchIssues() {
      try {
        var allIssues = [];
        var page = 1;
        var response;
        var data = []

        do {
          response = await fetch(`https://api.github.com/repos/lincolixavier/tretadev/issues?page=${page}`);
          data = await response.json();
          allIssues = allIssues.concat(data);
          page++;
        } while (data.length > 0);

        const issuesFormated = allIssues.map((issue) => {
          return {
            ...issue,
            body: limitingBodySize(issue.body),
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

  const limitingBodySize = (body) => {
    var limitedString;

    if (body !== null && body?.length < 500) {
      return body;
    } else if (body?.length > 500) {
      limitedString = body.slice(0, 300) + " ...";
    } else {
      console.log("body is null");
    }

    return limitedString;
  }

  const handleTagClick = (tags) => {
    setSelectedTag(tags[0]);
  
    if (tags.includes('todas')) {
      setFilteredIssues(issues);
    } else {
      const filtered = issues.filter((issue) =>
        tags.some((tag) =>
          (issue.title && issue.title.toLowerCase().includes(tag)) ||
          (issue.body && issue.body.toLowerCase().includes(tag))
        )
      );
  
      console.log('filtered: ', filtered);
      setFilteredIssues(filtered);
    }
  };  
  
  return (
    <div id='home'>
      <img width='64' height='64' src='https://img.icons8.com/arcade/64/fire-element.png' alt='fire-element'/>
      <h1 id='title'>Treta Dev</h1>
      <div>
        <a href='https://github.com/lincolixavier/tretadev/issues/new' target='_blank' rel='noopener noreferrer'>
          <button className='btn btn-create'>
            <img width="20" height="20" src="https://img.icons8.com/external-bearicons-glyph-bearicons/64/FFFFFF/external-Plus-essential-collection-bearicons-glyph-bearicons.png"  alt="Plus" id="icon-plus" /> Adicionar treta
          </button>
        </a>
      </div>
      <div id='btn-section'>
        <button
          onClick={() => handleTagClick(['todas'])}
          className={selectedTag === 'todas' ? 'btn btn-tag-active' : 'btn  btn-tag'}
        >
          Todas
        </button>
        <button
          onClick={() => handleTagClick(['backend', 'back', 'api', 'heroku', 'mongodb', 'nosql', 'sql'])}
          className={selectedTag === 'backend' ? 'btn  btn-tag-active' : 'btn  btn-tag'}
        >
          Backend
        </button>
        <button
          onClick={() => handleTagClick(['frontend', 'front', 'botão', 'react', 'reactjs', 'angular', 'vue', 'vuejs','tailwind'])}
          className={selectedTag === 'frontend' ? 'btn  btn-tag-active' : 'btn btn-tag'}
        >
          Frontend
        </button>
        <button
          onClick={() => handleTagClick(['dados', 'mongodb', 'nosql', 'sql'])}
          className={selectedTag === 'dados' ? 'btn btn-tag-active' : 'btn btn-tag'}
        >
          Dados
        </button>
        <button
          onClick={() => handleTagClick(['qa', 'teste', 'tester'])}
          className={selectedTag === 'qa' ? 'btn btn-tag-active' : 'btn btn-tag'}
        >
          QA
        </button>
        <button
          onClick={() => handleTagClick(['open-source', 'open source'])}
          className={selectedTag === 'open-source' ? 'btn btn-tag-active' : 'btn btn-tag'}
        >
          Open-source
        </button>
        <button
          onClick={() => handleTagClick(['junior'])}
          className={selectedTag === 'junior' ? 'btn btn-tag-active' : 'btn btn-tag'}
        >
          Junior
        </button>
        <button 
          onClick={() => handleTagClick(['pleno'])}
          className={selectedTag === 'pleno' ? 'btn btn-tag-active' : 'btn btn-tag'}
        >
          Pleno
        </button>
        <button
          onClick={() => handleTagClick(['senior'])}
          className={selectedTag === 'senior' ? 'btn btn-tag-active' : 'btn btn-tag'}
        >
          Senior
        </button>
        <button
          onClick={() => handleTagClick(['sistema operacional', 'linux', 'windows', 'ubuntu'])}
          className={selectedTag === 'sistema operacional' ? 'btn btn-tag-active' : 'btn btn-tag'}
        >
          Sistema operacional
        </button>
        <button
          onClick={() => handleTagClick(['ide', 'vim', 'nvim'])}
          className={selectedTag === 'ide' ? 'btn btn-tag-active' : 'btn btn-tag'}
        >
          IDE
        </button>
        <button
          onClick={() => handleTagClick(['html'])}
          className={selectedTag === 'html' ? 'btn btn-tag-active' : 'btn btn-tag'}
        >
          HTML
        </button>
        <button
          onClick={() => handleTagClick(['css'])}
          className={selectedTag === 'css' ? 'btn btn-tag-active' : 'btn btn-tag'}
        >
          CSS
        </button>
        <button
          onClick={() => handleTagClick(['javascript', 'react', 'reactjs'])}
          className={selectedTag === 'javascript' ? 'btn btn-tag-active' : 'btn btn-tag'}
        >
          JavaScript
        </button>
        <button
          onClick={() => handleTagClick(['php'])}
          className={selectedTag === 'php' ? 'btn btn-tag-active' : 'btn btn-tag'}
        >
          PHP
        </button>
        <button 
          onClick={() => handleTagClick(['python'])}
          className={selectedTag === 'python' ? 'btn btn-tag-active' : 'btn btn-tag'}
        >
          Python
        </button>
        <button
          onClick={() => handleTagClick(['java'])}
          className={selectedTag === 'java' ? 'btn btn-tag-active' : 'btn btn-tag'}
        >
          Java
        </button>
        <button
          onClick={() => handleTagClick(['django'])}
          className={selectedTag === 'django' ? 'btn btn-tag-active' : 'btn btn-tag'}
        >
          Django
        </button>
        <button
          onClick={() => handleTagClick(['flutter'])}
          className={selectedTag === 'flutter' ? 'btn btn-tag-active' : 'btn btn-tag'}
        >
          Flutter
        </button>
        <button
          onClick={() => handleTagClick(['design', 'ui', 'ux'])}
          className={selectedTag === 'design' ? 'btn btn-tag-active' : 'btn btn-tag'}
        >
          Design
        </button>
        <button
          onClick={() => handleTagClick(['commit'])}
          className={selectedTag === 'commit' ? 'btn btn-tag-active' : 'btn btn-tag'}
        >
          Commit
        </button>
        <button
          onClick={() => handleTagClick(['carreira', 'processo seletivo', 'burnout', 'emprego', 'vaga', 'dev', 'devs', 'profissão', 'fit cultural', 'recrutador', 'linkedin', 'github', 'salário', 'daily', 'empresa', 'engenheiro', 'mil', 'carreira', 'salário', 'clt', 'pj'])}
          className={selectedTag === 'carreira' ? 'btn btn-tag-active' : 'btn btn-tag'}
        >
          Carreira
        </button>
        <button
          onClick={() => handleTagClick(['tecnologia', 'programação', 'programar', 'programa', 'programador', 'low-code', 'low code', 'cookies', 'computação'])}
          className={selectedTag === 'tecnologia' ? 'btn btn-tag-active' : 'btn btn-tag'}
        >
          Tecnologia
        </button>
        <button
          onClick={() => handleTagClick(['faculdade'])}
          className={selectedTag === 'faculdade' ? 'btn btn-tag-active' : 'btn btn-tag'}
        >
          Faculdade
        </button>
        <button
          onClick={() => handleTagClick(['gambiarra'])}
          className={selectedTag === 'gambiarra' ? 'btn btn-tag-active' : 'btn btn-tag'}
        >
          Gambiarra
        </button>
        <button
          onClick={() => handleTagClick(['politica', 'esquerda', 'direita'])}
          className={selectedTag === 'politica' ? 'btn btn-tag-active' : 'btn btn-tag'}
        >
          Politica
        </button>
      </div>

      <div className='section-cards'>
        {filteredIssues.map(issue => (
          <div className='card' key={issue.id}>
            {/* <div className='card-header'>
              <div className='card-product-img'>
                <img src="https://img.icons8.com/arcade/64/brick.png" alt="imagem de teste" />
              </div>
            </div> */}

            <div className='card-body'>
            <a href={issue.html_url} target='_blank' rel="noreferrer">
            <h3 className='card-title'>{issue.title}</h3>
            </a>
            <p className='card-text'>{issue.body}</p>
            <div className='wrapper'>
            <div className='card-number'>
            <img src="https://img.icons8.com/arcade/64/code-file.png" alt="Código" className='card-icon' />
            <span>{issue.number}</span>
            </div>

            <div className='card-countdown'>
            <img src="https://img.icons8.com/arcade/64/clock.png" alt="Relógio" className='card-icon' />
            <span>{issue.created_at}</span>
            </div>
            </div>
            </div>

            <div className='card-footer'>
            <a href={issue.user.html_url}><img src={issue.user.avatar_url}  alt={issue.user.login} className='card-author-img' /></a>
            <p className='card-author-name'>Criada por <a href={issue.user.html_url}>@{issue.user.login}</a></p>
            </div>
            </div>
            ))}
          </div>

      <footer>
        <p>
          <a href='https://github.com/Kecbm/tretadev' target='_blank' rel='noopener noreferrer' className='text-footer'>
            <img width="40" height="40" src="https://img.icons8.com/glyph-neue/64/772e17/github.png" alt="github"/> Repositório
          </a>
        </p>
        <p className='developer'>
          <a href='https://github.com/ericviana' target='_blank' rel='noopener noreferrer' className='text-footer'>
            Eric Viana
          </a>
          <a href='https://github.com/ericviana' target='_blank' rel='noopener noreferrer' className='text-footer'>
            <img width="40" height="40" src="https://img.icons8.com/glyph-neue/64/772e17/github.png" alt="github"/>
          </a>
          <a href='https://www.linkedin.com/in/eric-viana/' target='_blank' rel='noopener noreferrer' className='text-footer'>
            <img width="40" height="40" src="https://img.icons8.com/glyph-neue/64/772e17/linkedin.png" alt="linkedin"/>
          </a>
          <a href='https://twitter.com/ericvna' target='_blank' rel='noopener noreferrer' className='text-footer'>
            <img width="40" height="40" src="https://img.icons8.com/glyph-neue/64/772e17/twitter.png" alt="twitter"/>
          </a>
        </p>
        <p className='developer'>
          <a href='https://github.com/Kecbm' target='_blank' rel='noopener noreferrer' className='text-footer'>
            Klecianny Melo
          </a>
          <a href='https://github.com/Kecbm' target='_blank' rel='noopener noreferrer' className='text-footer'>
            <img width="40" height="40" src="https://img.icons8.com/glyph-neue/64/772e17/github.png" alt="github"/>
          </a>
          <a href='https://www.linkedin.com/in/kecbm/' target='_blank' rel='noopener noreferrer' className='text-footer'>
            <img width="40" height="40" src="https://img.icons8.com/glyph-neue/64/772e17/linkedin.png" alt="linkedin"/>
          </a>
          <a href='https://twitter.com/Kecbm' target='_blank' rel='noopener noreferrer' className='text-footer'>
            <img width="40" height="40" src="https://img.icons8.com/glyph-neue/64/772e17/twitter.png" alt="twitter"/>
          </a>
        </p>
        <p className='developer'>
          <a href='https://github.com/lincolixavier' target='_blank' rel='noopener noreferrer' className='text-footer'>
            Lincoli Xavier
          </a>
          <a href='https://github.com/lincolixavier' target='_blank' rel='noopener noreferrer' className='text-footer'>
            <img width="40" height="40" src="https://img.icons8.com/glyph-neue/64/772e17/github.png" alt="github"/>
          </a>
          <a href='https://www.linkedin.com/in/lincoli-xavier/' target='_blank' rel='noopener noreferrer' className='text-footer'>
            <img width="40" height="40" src="https://img.icons8.com/glyph-neue/64/772e17/linkedin.png" alt="linkedin"/>
          </a>
          <a href='https://twitter.com/lincolixavier' target='_blank' rel='noopener noreferrer' className='text-footer'>
            <img width="40" height="40" src="https://img.icons8.com/glyph-neue/64/772e17/twitter.png" alt="twitter"/>
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;
