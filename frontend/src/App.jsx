import { useEffect, useState } from "react";
import Resumo from "./components/Resumo";
import Formulario from "./components/Formulario";
import Lista from "./components/Lista";
import "./index.css";

function App() {
  const [series, setSeries] = useState([]);
  const [resumo, setResumo] = useState({
    total: 0,
    media_avaliacao: 0,
    melhor: "",
  });
  const [busca, setBusca] = useState("");

  async function carregarDados() {
    try {
      const [resSeries, resResumo] = await Promise.all([
        fetch("http://localhost:8000/api/series/"),
        fetch("http://localhost:8000/api/series/resumo/"),
      ]);

      if (resSeries.ok) {
        const dadosSeries = await resSeries.json();
        setSeries(dadosSeries);
      }

      if (resResumo.ok) {
        const dadosResumo = await resResumo.json();
        setResumo(dadosResumo);
      }
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
    }
  }

  useEffect(() => {
    carregarDados();
  }, []);

  return (
    <div className="container">
      <header>
        <h1>Catálogo de Séries</h1>
      </header>

      <Resumo resumo={resumo} />
      <Formulario onCadastroSucesso={carregarDados} />
      <Lista series={series} busca={busca} onBuscaChange={setBusca} />
    </div>
  );
}

export default App;