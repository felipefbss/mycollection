function Resumo({ resumo }) {
  return (
    <p className="resumo">
      Total cadastrado: <strong>{resumo.total}</strong> | Média das notas:{" "}
      <strong>{resumo.media_avaliacao}</strong> | Melhor série:{" "}
      <strong>{resumo.melhor || "-"}</strong>
    </p>
  );
}

export default Resumo;