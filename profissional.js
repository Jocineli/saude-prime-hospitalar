document.addEventListener('DOMContentLoaded', () => {
    const professionalForm = document.getElementById('professionalForm');
    const professionalListDiv = document.getElementById('professionalList');

    // Simulação de "banco de dados" local com localStorage
    let professionals = JSON.parse(localStorage.getItem('professionals')) || [];

    // Função para renderizar a lista de profissionais
    function renderProfessionals() {
        if (professionalListDiv) {
            if (professionals.length === 0) {
                professionalListDiv.innerHTML = '<p>Nenhum profissional cadastrado ainda. Use o formulário acima.</p>';
                return;
            }

            let html = '<table class="data-table"><thead><tr><th>Nome</th><th>CPF</th><th>Conselho</th><th>Especialidade</th><th>Telefone</th><th>Ações</th></tr></thead><tbody>';
            professionals.forEach((professional, index) => {
                html += `
                    <tr>
                        <td>${professional.nome}</td>
                        <td>${professional.cpf}</td>
                        <td>${professional.conselho}</td>
                        <td>${professional.especialidade}</td>
                        <td>${professional.telefone}</td>
                        <td>
                            <button class="btn secondary btn-sm" onclick="editProfessional(${index})">Editar</button>
                            <button class="btn danger btn-sm" onclick="deleteProfessional(${index})">Excluir</button>
                        </td>
                    </tr>
                `;
            });
            html += '</tbody></table>';
            professionalListDiv.innerHTML = html;
        }
    }

    // Função para adicionar um novo profissional
    if (professionalForm) {
        professionalForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const newProfessional = {
                id: Date.now(), // ID único
                nome: document.getElementById('nomeProfissional').value,
                cpf: document.getElementById('cpfProfissional').value,
                conselho: document.getElementById('conselhoProfissional').value,
                especialidade: document.getElementById('especialidade').value,
                telefone: document.getElementById('telefoneProfissional').value,
                email: document.getElementById('emailProfissional').value,
            };

            professionals.push(newProfessional);
            localStorage.setItem('professionals', JSON.stringify(professionals)); // Salva no localStorage
            professionalForm.reset(); // Limpa o formulário
            renderProfessionals(); // Atualiza a lista
            alert('Profissional cadastrado com sucesso!');
        });
    }

    // Funções de edição e exclusão (globais para serem acessíveis via onclick)
    window.editProfessional = function(index) {
        alert('Funcionalidade de edição para ' + professionals[index].nome + ' ainda não implementada.');
        // Aqui você implementaria a lógica para preencher o formulário com os dados do profissional
        // e permitir a edição, talvez um modal ou preenchendo os campos do formulário.
    };

    window.deleteProfessional = function(index) {
        if (confirm(`Tem certeza que deseja excluir o profissional ${professionals[index].nome}?`)) {
            professionals.splice(index, 1);
            localStorage.setItem('professionals', JSON.stringify(professionals));
            renderProfessionals();
            alert('Profissional excluído com sucesso.');
        }
    };

    renderProfessionals(); // Renderiza a lista ao carregar a página
});