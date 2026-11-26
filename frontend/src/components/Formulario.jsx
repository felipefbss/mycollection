import { useState } from "react";

function Formulario({ onCadastroSucesso }) {
  const [titulo, setTitulo] = useState("");
  const [plataforma, setPlataforma] = useState("");
  const [ano, setAno] = useState("");
  const [avaliacao, setAvaliacao] = useState("");
  const [erro, setErro] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setErro("");

    try {
      const res = await fetch("http://localhost:8000/api/series/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          titulo,
          plataforma,
          ano: Number(ano),
          avaliacao: Number(avaliacao),
        }),
      });

      const dados = await res.json();

      if (!res.ok) {
        setErro(dados.erro || "Erro ao cadastrar.");
        return;
      }

      setTitulo("");
      setPlataforma("");
      setAno("");
      setAvaliacao("");
      setErro("");
      onCadastroSucesso();
    } catch {
      setErro("Erro de conexão com o servidor.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="formulario">
      <h2>Nova Série</h2>

      {erro && <p className="erro">{erro}</p>}

      <div>
        <label>Título:</label>
        <input
          type="text"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Plataforma:</label>
        <input
          type="text"
          value={plataforma}
          onChange={(e) => setPlataforma(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Ano:</label>
        <input
          type="number"
          value={ano}
          onChange={(e) => setAno(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Avaliação (0 a 10):</label>
        <input
          type="number"
          step="0.1"
          value={avaliacao}
          onChange={(e) => setAvaliacao(e.target.value)}
          required
        />
      </div>

      <button type="submit">Salvar</button>
    </form>
  );
}

export default Formulario;