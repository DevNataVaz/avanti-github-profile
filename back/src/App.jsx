import { useState } from "react";
import github from "/github.svg"
import githubName from "/github-2.svg"
import bolinhas from "/bolinhas.svg"
import search from "/search.svg"
import './App.css'

function App() {
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  const fetchGithubProfile = async () => {
    if (!username.trim()) return;
    try {
      setError(null);
      const response = await fetch(`https://api.github.com/users/${username}`);
      if (!response.ok) {
        throw new Error("Nenhum perfil foi encontrado com esse nome de usuário.\n" <br> "Tente novamente");
      }
      const data = await response.json();
      setUserData(data);
    } catch (err) {
      setUserData(null);
      setError(err.message);
    }
  };

  return (
    <>
    <img className="img-bolinhas" src={bolinhas} alt="bolinhas" />
    
    <div className="container">
      <div className="container-titulo">
      <img className="img-github" src={github} alt="github"/>
       <h1>Perfil <img src={githubName} /></h1>
       </div>
      <div className="search-box">
        <input
          type="text"
          placeholder="Digite um usuário do Github"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button onClick={fetchGithubProfile}>
          <img src={search} alt="seach" />
        </button>
      </div>
      {error && <div className="error-box">{error}</div>}
      {userData && (
        <div className="profile-box">
          <img className="avatar" src={userData.avatar_url} alt={userData.login} />
          <div className="profile-info">
          <h2>{userData.name || userData.login}</h2>
          <p>{userData.bio || "Nenhuma bio disponível."}</p>
          </div>
        </div>
      )}
    </div>
    </>
  );
}


export default App
