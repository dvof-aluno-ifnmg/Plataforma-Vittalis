// ==========================================
// 1. GERAR RELATÓRIO MÉDICO (PDF)
// ==========================================
function gerarRelatorio() {
    const historico = JSON.parse(localStorage.getItem('vittalis_historico')) || [];
    
    if (historico.length === 0) {
        alert("Nenhuma avaliação encontrada. Por favor, realize uma avaliação primeiro.");
        return;
    }

    const ultima = historico[historico.length - 1];
    const nomeUsuario = ultima.paciente?.nome || "Usuário não identificado"; 
    const dataAvaliacao = new Date(ultima.dataHora).toLocaleDateString('pt-BR');
    const dataHoje = new Date().toLocaleDateString('pt-BR');

    const peso = ultima.medicoes?.peso || '--';
    const altura = ultima.medicoes?.altura || '--';
    const imc = ultima.medicoes?.imc || '--';
    const pSistolica = ultima.medicoes?.pressaoSistolica || '--';
    const pDiastolica = ultima.medicoes?.pressaoDiastolica || '--';
    const percGordura = ultima.medicoes?.percGordura || '--';
    const cintura = ultima.medicoes?.circAbdominal || '--';

    const win = window.open('', '_blank');
    win.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Laudo Vittalis - ${dataAvaliacao}</title>
            <style>
                body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 50px; color: #1e293b; line-height: 1.6; }
                .header { border-bottom: 4px solid #004253; padding-bottom: 20px; margin-bottom: 30px; text-align: center; }
                .title { font-size: 28px; font-weight: 800; color: #004253; letter-spacing: -1px; }
                .intro { font-size: 15px; margin-bottom: 40px; background: #f1f5f9; padding: 20px; border-radius: 8px; border-left: 6px solid #004253; }
                table { width: 100%; border-collapse: collapse; margin-top: 20px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); }
                th, td { border: 1px solid #e2e8f0; padding: 15px; text-align: left; }
                th { background-color: #004253; color: white; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; }
                tr:nth-child(even) { background-color: #f8fafc; }
                .footer { margin-top: 80px; font-size: 11px; color: #64748b; text-align: center; border-top: 1px solid #e2e8f0; padding-top: 20px; }
                @media print { body { padding: 20px; } button { display: none; } }
            </style>
        </head>
        <body>
            <div class="header"><div class="title">VITTALIS | RELATÓRIO DE SAÚDE</div></div>
            <p class="intro">
                Olá profissional de saúde, segue abaixo a última avaliação física do usuário <strong>${nomeUsuario}</strong> no dia <strong>${dataAvaliacao}</strong> realizada pela plataforma Vittalis. Documento emitido em: ${dataHoje}.
            </p>
            <table>
                <thead><tr><th>Indicador</th><th>Resultado</th></tr></thead>
                <tbody>
                    <tr><td>Peso Corporal</td><td><strong>${peso} kg</strong></td></tr>
                    <tr><td>Estatura (Altura)</td><td><strong>${altura} m</strong></td></tr>
                    <tr><td>Índice de Massa Corporal (IMC)</td><td><strong>${imc}</strong></td></tr>
                    <tr><td>Pressão Arterial</td><td><strong>${pSistolica}/${pDiastolica} mmHg</strong></td></tr>
                    <tr><td>Percentual de Gordura</td><td><strong>${percGordura}%</strong></td></tr>
                    <tr><td>Circunferência Abdominal</td><td><strong>${cintura} cm</strong></td></tr>
                </tbody>
            </table>
            <div class="footer">Documento digital gerado pelo sistema Vittalis Assessment.</div>
            <script>
                window.onload = function() {
                    window.print();
                    window.onafterprint = function() { window.close(); };
                }
            </script>
        </body>
        </html>
    `);
    win.document.close();
}

// Função auxiliar para filtrar apenas a última avaliação de cada pessoa
function filtrarUltimasAvaliacoes(historico) {
    const listaUnica = new Map();
    historico.forEach(item => {
        // Usa o nome ou matrícula como chave para identificar a pessoa
        const identificador = item.paciente?.nome || item.paciente?.matricula || "Geral";
        listaUnica.set(identificador, item);
    });
    return Array.from(listaUnica.values());
}

// ==========================================
// 2. EXPORTAR EXCEL/CSV (DADOS ANONIMIZADOS)
// ==========================================
function exportarDadosAnonimos() {
    let historico = JSON.parse(localStorage.getItem('vittalis_historico')) || [];
    if (historico.length === 0) return alert("Sem dados para exportar.");

    // Filtra para pegar apenas a última de cada um
    const dadosFiltrados = filtrarUltimasAvaliacoes(historico);

    let csv = "Data;IMC;Peso;Altura;Pressao_Sistolica;Pressao_Diastolica;Gordura_Percentual;Cintura_cm\n";
    
    dadosFiltrados.forEach(item => {
        csv += `${new Date(item.dataHora).toLocaleDateString()};${item.medicoes.imc};${item.medicoes.peso};${item.medicoes.altura};${item.medicoes.pressaoSistolica};${item.medicoes.pressaoDiastolica};${item.medicoes.percGordura};${item.medicoes.circAbdominal}\n`;
    });

    downloadCSV(csv, "vittalis_dados_anonimos.csv");
}

// ==========================================
// 3. EXPORTAR EXCEL/CSV (PLANILHA COMPLETA ADMIN)
// ==========================================
function exportarPlanilhaCompleta() {
    let historico = JSON.parse(localStorage.getItem('vittalis_historico')) || [];
    if (historico.length === 0) return alert("Sem dados para exportar.");

    // Filtra para pegar apenas a última de cada um
    const dadosFiltrados = filtrarUltimasAvaliacoes(historico);

    // Adicionado campo Paciente para identificar de quem é a avaliação
    let csv = "Paciente;Data;IMC;Peso;Altura;Pressao;Gordura;Cintura;Sono;Tabaco;Alcool;Exercicios;Doencas;Medicamentos\n";
    
    dadosFiltrados.forEach(item => {
        const nome = item.paciente?.nome || "Não Identificado";
        csv += `${nome};${new Date(item.dataHora).toLocaleString()};${item.medicoes.imc};${item.medicoes.peso};${item.medicoes.altura};${item.medicoes.pressaoSistolica}/${item.medicoes.pressaoDiastolica};${item.medicoes.percGordura};${item.medicoes.circAbdominal};${item.habitosVida.qualidadeSono};${item.habitosVida.usaTabaco};${item.habitosVida.usaAlcool};${item.habitosVida.sessoesExercicios};${(item.perfilClinico.doencasAtuais || "").replace(/;/g, ',')};${(item.perfilClinico.medicamentos || "").replace(/;/g, ',')}\n`;
    });

    downloadCSV(csv, "vittalis_relatorio_admin_completo.csv");
}

// Função auxiliar para download com correção de acentos para o Excel (BOM)
function downloadCSV(csv, filename) {
    const blob = new Blob(["\ufeff" + csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}