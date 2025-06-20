document.addEventListener('DOMContentLoaded', function() {
    const movimentacoesBody = document.getElementById('movimentacoesBody');
    const noMovimentationsMessage = document.getElementById('noMovimentationsMessage');
    const totalEntradasElement = document.getElementById('totalEntradas');
    const totalSaidasElement = document.getElementById('totalSaidas');
    const saldoAtualElement = document.getElementById('saldoAtual');
    const saldoFinalCard = document.getElementById('saldoFinalCard');

    // Dados fictícios de movimentações financeiras
    const mockMovimentacoes = [
        { data: '2024-06-15', tipo: 'entrada', descricao: 'Pagamento Plano Ouro - Paciente Maria', valor: 2500.00 },
        { data: '2024-06-16', tipo: 'saida', descricao: 'Pagamento Salário Dr. Carlos', valor: 8000.00 },
        { data: '2024-06-16', tipo: 'saida', descricao: 'Pagamento Salário Dr. João da Silva', valor: 8000.00 },
        { data: '2024-06-17', tipo: 'entrada', descricao: 'Doação ONG Saúde Solidária', valor: 10000.00 },
        { data: '2024-06-18', tipo: 'entrada', descricao: 'Pagamento Plano Prata - Paciente João', valor: 1200.00 },
        { data: '2024-06-15', tipo: 'entrada', descricao: 'Pagamento Plano Ouro - Paciente Maria', valor: 2500.00 },
        { data: '2024-06-15', tipo: 'entrada', descricao: 'Pagamento Plano Ouro - Paciente Jessica', valor: 2500.00 },
        { data: '2024-06-18', tipo: 'saida', descricao: 'Despesas com Material de Enfermagem', valor: 15000.50 },
        { data: '2024-06-19', tipo: 'saida', descricao: 'Pagamento Enfermeira Julia Santos', valor: 4500.00 },
        { data: '2024-06-19', tipo: 'saida', descricao: 'Pagamento Enfermeira Ana', valor: 4500.00 },
        { data: '2024-06-19', tipo: 'saida', descricao: 'Pagamento Enfermeira Maria Silva', valor: 4500.00 },
        { data: '2024-06-19', tipo: 'entrada', descricao: 'Pagamento Plano Bronze - Paciente Pedro', valor: 800.00 },
        { data: '2024-06-19', tipo: 'saida', descricao: 'Pagamento Tecnicos enfermagem Juliana Santos', valor: 4500.00 },
        { data: '2024-06-16', tipo: 'saida', descricao: 'Pagamento Salário Dr. Matheus Silva', valor: 8000.00 },
        { data: '2024-06-20', tipo: 'entrada', descricao: 'Pagamento Plano Ouro - Paciente Sofia', valor: 2500.00 },
        { data: '2024-06-22', tipo: 'entrada', descricao: 'Pagamento Plano Prata - Paciente Marlon', valor: 1200.00 },
        { data: '2024-06-16', tipo: 'saida', descricao: 'Pagamento Salário Dr. Jose Silva', valor: 8000.00 },
        { data: '2024-06-16', tipo: 'saida', descricao: 'Pagamento Salário Dr. Maria Santos', valor: 8000.00 },
        { data: '2024-06-16', tipo: 'saida', descricao: 'Pagamento Salário Dr. Pedro Souza', valor: 8000.00 },
        { data: '2024-06-20', tipo: 'saida', descricao: 'Manutenção Equipamento RX', valor: 15000.00 },
        { data: '2024-06-16', tipo: 'saida', descricao: 'Pagamento Salário Dr. Flavia Santos', valor: 8000.00 },
        { data: '2024-06-16', tipo: 'saida', descricao: 'Pagamento Salário Dr. Maria Souza', valor: 8000.00 },
        { data: '2024-06-21', tipo: 'entrada', descricao: 'Doação Estadual', valor: 500000.00 },
        { data: '2024-06-21', tipo: 'saida', descricao: 'Gasto com Limpeza e Higiene', valor: 2000.00 },
        { data: '2024-06-22', tipo: 'entrada', descricao: 'Pagamento Plano Prata - Paciente Carlos', valor: 1200.00 },
        { data: '2024-06-21', tipo: 'saida', descricao: 'Gasto com Manuntenção estrutura', valor: 5000.00 },
        { data: '2024-06-22', tipo: 'saida', descricao: 'Pagamento Salário Dr. Ana', valor: 7500.00 },
        { data: '2024-06-19', tipo: 'saida', descricao: 'Pagamento Tecnicos enfermagem Ana Clara Silva', valor: 4500.00 },
        { data: '2024-06-19', tipo: 'saida', descricao: 'Pagamento Tecnicos enfermagem Emanuel Silva', valor: 4500.00 },
    ];

    // Função para formatar valores monetários
    function formatCurrency(value) {
        return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }

    // Função para popular a tabela de movimentações e calcular totais
    function populateMovimentacoes() {
        let totalEntradas = 0;
        let totalSaidas = 0;

        movimentacoesBody.innerHTML = ''; // Limpa qualquer conteúdo anterior

        if (mockMovimentacoes.length === 0) {
            noMovimentationsMessage.style.display = 'block';
            return;
        }

        mockMovimentacoes.forEach(mov => {
            const row = document.createElement('tr');
            row.classList.add(mov.tipo); // Adiciona classe 'entrada' ou 'saida' para estilização

            const valorFormatado = formatCurrency(mov.valor);
            const valorClass = (mov.tipo === 'entrada') ? 'entrada-valor' : 'saida-valor';

            row.innerHTML = `
                <td>${mov.data}</td>
                <td>${mov.tipo === 'entrada' ? 'Entrada' : 'Saída'}</td>
                <td>${mov.descricao}</td>
                <td class="valor ${valorClass}">${valorFormatado}</td>
            `;
            movimentacoesBody.appendChild(row);

            if (mov.tipo === 'entrada') {
                totalEntradas += mov.valor;
            } else {
                totalSaidas += mov.valor;
            }
        });

        // Atualiza os cards de resumo
        totalEntradasElement.textContent = formatCurrency(totalEntradas);
        totalSaidasElement.textContent = formatCurrency(totalSaidas);

        const saldoAtual = totalEntradas - totalSaidas;
        saldoAtualElement.textContent = formatCurrency(saldoAtual);

        // Ajusta a cor do card de saldo conforme o valor
        saldoFinalCard.classList.remove('positive', 'negative');
        if (saldoAtual >= 0) {
            saldoFinalCard.classList.add('positive');
        } else {
            saldoFinalCard.classList.add('negative');
        }

        noMovimentationsMessage.style.display = 'none';
    }

    // Chama a função para popular a lista quando a página carrega
    populateMovimentacoes();

    // Lógica para o botão "Sair" (logoutBtn) - replicado aqui para conveniência
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(event) {
            event.preventDefault(); 
            const confirmLogout = confirm("Tem certeza que deseja sair?");
            if (confirmLogout) {
                alert("Sessão encerrada com sucesso!");
                window.location.href = 'login.html'; // Redirecione para sua tela de login
            }
        });
    }
});