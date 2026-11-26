function Lista({ series, busca, onBuscaChange }) {
  const seriesFiltradas = series.filter((serie) =>
    serie.titulo.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <section className="secao-lista">
      <div className="lista-topo">
        <h2>Séries Cadastradas</h2>
        <input
          type="text"
          className="campo-busca"
          placeholder="Filtrar por título..."
          value={busca}
          onChange={(e) => onBuscaChange(e.target.value)}
        />
      </div>

      {seriesFiltradas.length === 0 ? (
        <p className="aviso-vazio">Nenhum item encontrado</p>
      ) : (
        <table className="tabela-series">
          <thead>
            <tr>
              <th>Título</th>
              <th>Plataforma</th>
              <th>Ano</th>
              <th>Avaliação</th>
            </tr>
          </thead>
          <tbody>
            {seriesFiltradas.map((serie) => (
              <tr key={serie.id}>
                <td>{serie.titulo}</td>
                <td>{serie.plataforma}</td>
                <td>{serie.ano}</td>
                <td>{serie.avaliacao} / 10</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}

export default Lista;