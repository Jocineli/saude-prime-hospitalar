document.addEventListener('DOMContentLoaded', function() {
    const patientNameSearchInput = document.getElementById('patientNameSearch');
    const searchHistoryBtn = document.getElementById('searchHistoryBtn');
    const historyResultsDiv = document.getElementById('historyResults');
    const patientNameDisplay = document.getElementById('patientNameDisplay');
    const consultationDetailsDiv = document.getElementById('consultationDetails');
    const generatePdfBtn = document.getElementById('generatePdfBtn');
    const noResultsMessage = document.getElementById('noResultsMessage');

    // --- Dados de Consulta Mock (Simulação de um Banco de Dados) ---
    // Em um sistema real, você faria requisições a um backend para obter esses dados.
    const mockConsultations = [
        {
            patientId: '101',
            patientName: 'Maria Clara Souza',
            consultas: [
                { data: '2024-01-15', medico: 'Dr. Carlos Silva (Cardiologista)', especialidade: 'Cardiologia', diagnostico: 'Hipertensão Essencial', tratamento: 'Medicação X, Acompanhamento trimestral.' },
                { data: '2024-06-01', medico: 'Dr. Carlos Silva (Cardiologista)', especialidade: 'Cardiologia', diagnostico: 'Dor Torácica Atípica', tratamento: 'Exames de imagem, ajuste de medicação.' }
            ]
        },
        {
            patientId: '102',
            patientName: 'João Pedro Almeida',
            consultas: [
                { data: '2023-11-20', medico: 'Dra. Ana Costa (Ortopedista)', especialidade: 'Ortopedia', diagnostico: 'Fratura de Tíbia', tratamento: 'Imobilização gessada, fisioterapia.' },
                { data: '2024-02-28', medico: 'Dra. Ana Costa (Ortopedista)', especialidade: 'Ortopedia', diagnostico: 'Recuperação Pós-Fratura', tratamento: 'Fisioterapia intensiva, acompanhamento mensal.' }
            ]
        },
        {
            patientId: '103',
            patientName: 'Fernanda Lima',
            consultas: [
                { data: '2024-03-10', medico: 'Dr. Ricardo Santos (Clínico Geral)', especialidade: 'Clínico Geral', diagnostico: 'Resfriado Comum', tratamento: 'Repouso, hidratação, sintomáticos.' }
            ]
        }
    ];

    // --- Função para buscar e exibir o histórico ---
    searchHistoryBtn.addEventListener('click', function() {
        const searchTerm = patientNameSearchInput.value.trim().toLowerCase();
        historyResultsDiv.style.display = 'none'; // Esconde resultados anteriores
        noResultsMessage.style.display = 'none'; // Esconde mensagem de "não encontrado"

        if (searchTerm === '') {
            alert('Por favor, digite o nome do paciente para buscar.');
            return;
        }

        // Simula a busca: encontra o paciente pelo nome
        const foundPatient = mockConsultations.find(p => p.patientName.toLowerCase().includes(searchTerm));

        if (foundPatient) {
            patientNameDisplay.textContent = foundPatient.patientName;
            consultationDetailsDiv.innerHTML = ''; // Limpa conteúdo anterior

            if (foundPatient.consultas.length > 0) {
                foundPatient.consultas.forEach(consulta => {
                    const consultationCard = document.createElement('div');
                    consultationCard.classList.add('consultation-card'); // Adiciona uma classe para estilização
                    consultationCard.innerHTML = `
                        <h4>Consulta em: ${consulta.data}</h4>
                        <p><strong>Médico:</strong> ${consulta.medico}</p>
                        <p><strong>Especialidade:</strong> ${consulta.especialidade}</p>
                        <p><strong>Diagnóstico:</strong> ${consulta.diagnostico}</p>
                        <p><strong>Tratamento:</strong> ${consulta.tratamento}</p>
                        <hr>
                    `;
                    consultationDetailsDiv.appendChild(consultationCard);
                });
            } else {
                consultationDetailsDiv.innerHTML = '<p>Nenhum histórico de consultas encontrado para este paciente.</p>';
            }
            historyResultsDiv.style.display = 'block'; // Mostra a seção de resultados
        } else {
            noResultsMessage.style.display = 'block'; // Mostra mensagem de "não encontrado"
        }
    });

    // --- Função para Gerar PDF ---
    generatePdfBtn.addEventListener('click', async function() {
        // Usa a largura da janela para o PDF para melhor visualização
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF('p', 'pt', 'a4'); // 'p' retrato, 'pt' pontos, 'a4' tamanho de página

        const content = document.getElementById('historyResults'); // Elemento a ser convertido para PDF

        if (content) {
            // Esconde o botão Gerar PDF e os botões de ação para não aparecerem no PDF
            generatePdfBtn.style.display = 'none'; 
            
            // Opcional: esconder o botão de busca ou outros elementos da UI que não devem ir para o PDF
            searchHistoryBtn.style.display = 'none';
            patientNameSearchInput.style.display = 'none';
            document.querySelector('.form-group label').style.display = 'none'; // Esconde o label tbm

            // Converte o conteúdo HTML para uma imagem (canvas)
            html2canvas(content, {
                scale: 2, // Aumenta a resolução para melhor qualidade no PDF
                useCORS: true // Necessário se houver imagens de outras origens
            }).then(canvas => {
                const imgData = canvas.toDataURL('image/png');
                const imgWidth = 595; // Largura A4 em pontos (aprox.)
                const pageHeight = 842; // Altura A4 em pontos (aprox.)
                const imgHeight = canvas.height * imgWidth / canvas.width;
                let heightLeft = imgHeight;
                let position = 0;

                doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;

                // Se o conteúdo for maior que uma página, adiciona novas páginas
                while (heightLeft >= 0) {
                    position = heightLeft - imgHeight;
                    doc.addPage();
                    doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                    heightLeft -= pageHeight;
                }
                doc.save('historico_consultas.pdf'); // Nome do arquivo PDF

                // Restaura a visibilidade dos botões após a geração
                generatePdfBtn.style.display = 'block';
                searchHistoryBtn.style.display = 'block';
                patientNameSearchInput.style.display = 'block';
                document.querySelector('.form-group label').style.display = 'block'; // Mostra o label tbm

            }).catch(error => {
                console.error("Erro ao gerar PDF:", error);
                alert("Ocorreu um erro ao gerar o PDF. Verifique o console para detalhes.");
                 // Garante que os botões voltem a aparecer mesmo em caso de erro
                generatePdfBtn.style.display = 'block';
                searchHistoryBtn.style.display = 'block';
                patientNameSearchInput.style.display = 'block';
                document.querySelector('.form-group label').style.display = 'block';
            });
        } else {
            alert('Não há conteúdo para gerar o PDF.');
        }
    });
});