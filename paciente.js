document.addEventListener('DOMContentLoaded', function() {
    const patientForm = document.getElementById('patientForm');
    const patientListBody = document.querySelector('#patientList .data-table tbody'); // Corpo da tabela

    // --- FUNÇÃO PARA LIDAR COM A EXCLUSÃO (Reusada) ---
    // Esta função será o manipulador de eventos real para os cliques de exclusão
    function handleDeleteClick(event) {
        // Verifica se o clique foi em um botão com a classe 'delete-btn'
        if (event.target.classList.contains('delete-btn')) {
            event.preventDefault(); // Impede a ação padrão (se houver)

            const itemId = event.target.dataset.id; // Pega o ID do atributo data-id do botão clicado
            
            const confirmDelete = confirm(`Tem certeza que deseja excluir o item com ID ${itemId}? Esta ação não poderá ser desfeita.`);

            if (confirmDelete) {
                console.log(`Simulando exclusão do item com ID: ${itemId}`);
                alert(`Item ${itemId} excluído com sucesso (simulado)!`);
                
                // Remove a linha da tabela (o elemento <tr> pai do botão clicado)
                event.target.closest('tr').remove(); 

                /*
                // --- CÓDIGO PARA INTEGRAÇÃO COM BACKEND REAL (EXCLUSÃO) ---
                // Descomente e ajuste quando tiver um backend configurado
                fetch(`/api/pacientes/${itemId}`, { 
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        // Se precisar de autenticação, adicione aqui (ex: 'Authorization': 'Bearer seu_token')
                    },
                })
                .then(response => {
                    if (!response.ok) {
                        return response.json().then(err => Promise.reject(err));
                    }
                    // Se a exclusão não retornar conteúdo (ex: status 204 No Content), 
                    // você pode não precisar de response.json() ou response.text()
                    return response.text().then(text => text ? JSON.parse(text) : {}); 
                })
                .then(data => {
                    alert('Item excluído com sucesso!');
                    event.target.closest('tr').remove(); // Remove a linha da tabela da interface
                })
                .catch(error => {
                    console.error('Erro ao excluir o item:', error);
                    alert(`Erro ao excluir o item: ${error.message || 'Verifique o console para mais detalhes.'}`);
                });
                */

            } else {
                alert('Exclusão cancelada.');
            }
        }
    }

    // --- DELEGAÇÃO DE EVENTOS PARA BOTÕES DE EXCLUIR ---
    // Em vez de adicionar um listener a CADA botão, adicionamos um listener ao corpo da tabela.
    // Isso é mais eficiente e funciona para elementos que são adicionados dinamicamente (como novos pacientes).
    if (patientListBody) {
        patientListBody.addEventListener('click', handleDeleteClick);
    }


    // --- LÓGICA DE CADASTRO DE PACIENTE ---
    if (patientForm) {
        patientForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Impede o envio padrão do formulário

            // Cria um objeto com os dados do novo paciente
            const newPatient = {
                // Gera um ID simples para simulação no frontend.
                // Em um backend real, o ID viria do banco de dados após o cadastro.
                id: 'AUTO_' + Date.now().toString().slice(-6), // ID mais distinto para simulação
                nome: document.getElementById('nome').value,
                dataNascimento: document.getElementById('dataNascimento').value,
                cpf: document.getElementById('cpf').value,
                endereco: document.getElementById('endereco').value,
                telefone: document.getElementById('telefone').value
            };

            console.log('Novo paciente a ser cadastrado (simulado):', newPatient);
            alert('Paciente cadastrado com sucesso (simulado)!');

            // Adiciona o novo paciente à tabela (apenas na interface)
            const newRow = document.createElement('tr');
            newRow.innerHTML = `
                <td>${newPatient.id}</td>
                <td>${newPatient.nome}</td>
                <td>${newPatient.dataNascimento}</td>
                <td>${newPatient.telefone}</td>
                <td>
                    <a href="editar_paciente.html?id=${newPatient.id}" class="btn info">Editar</a> 
                    <button class="btn danger delete-btn" data-id="${newPatient.id}">Excluir</button>
                </td>
            `;
            if (patientListBody) { // Garante que o corpo da tabela existe
                patientListBody.appendChild(newRow);
            }

            // Limpa o formulário após o "cadastro"
            patientForm.reset();

            /*
            // --- CÓDIGO PARA INTEGRAÇÃO COM BACKEND REAL (CADASTRO) ---
            // Descomente e ajuste quando tiver um backend configurado
            fetch('/api/pacientes', { // Ex: POST para /api/pacientes
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': 'Bearer seu_token'
                },
                body: JSON.stringify(newPatient) // Envia os dados do novo paciente como JSON
            })
            .then(response => {
                if (!response.ok) {
                    return response.json().then(err => Promise.reject(err));
                }
                return response.json(); 
            })
            .then(data => {
                alert('Paciente cadastrado com sucesso!');
                // Aqui 'data' conteria o paciente cadastrado com o ID real do banco de dados
                const newRow = document.createElement('tr');
                newRow.innerHTML = `
                    <td>${data.id}</td>
                    <td>${data.nome}</td>
                    <td>${data.dataNascimento}</td>
                    <td>${data.telefone}</td>
                    <td>
                        <a href="editar_paciente.html?id=${data.id}" class="btn info">Editar</a> 
                        <button class="btn danger delete-btn" data-id="${data.id}">Excluir</button>
                    </td>
                `;
                if (patientListBody) {
                    patientListBody.appendChild(newRow);
                }
                patientForm.reset(); // Limpa o formulário
            })
            .catch(error => {
                console.error('Erro ao cadastrar paciente:', error);
                alert(`Erro ao cadastrar paciente: ${error.message || 'Verifique o console para mais detalhes.'}`);
            });
            */
        });
    }
});