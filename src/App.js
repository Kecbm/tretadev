import React, { useState, useEffect } from 'react';

function App() {
  const [issues, setIssues] = useState([]);

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

  return (
    <div className="App">
      <h1>Treta Dev 🔥</h1>
      <ul>
        {issues.map(issue => (
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
