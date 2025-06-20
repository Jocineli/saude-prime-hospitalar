vdocument.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const patientId = urlParams.get('id'); // Obtém o ID do paciente da URL (ex: ?id=101)

    const patientIdDisplay = document.getElementById('patientIdDisplay');
    const editPatientForm = document.getElementById('editPatientForm');
    const editNome = document.getElementById('editNome');
    const editDataNascimento = document.getElementById('editDataNascimento');
    const editCpf = document.getElementById('editCpf');
    const editEndereco = document.getElementById('editEndereco');
    const editTelefone = document.getElementById('editTelefone');

    // Verifica se um ID de paciente foi passado na URL
    if (patientId) {
        // Exibe o ID do paciente no título da página (ex: "Editar Paciente (ID: 101)")
        if (patientIdDisplay) { // Garante que o elemento existe antes de tentar manipulá-lo
            patientIdDisplay.textContent = `(ID: ${patientId})`;
        }

        // --- SIMULAÇÃO DE DADOS (Substitua por sua API real quando tiver um backend) ---
        // Este é um array de objetos que simula pacientes vindos de um banco de dados.
        // Em um sistema real, você faria uma requisição Fetch/AJAX para seu backend aqui,
        // passando o 'patientId' para obter os dados específicos do paciente.
        const mockPatients = [
            { id: '101', nome: 'Maria Clara Souza', dataNascimento: '1988-03-20', cpf: '123.456.789-01', endereco: 'Rua Flores, 10', telefone: '(11) 98765-4321' },
            { id: '102', nome: 'João Pedro Almeida', dataNascimento: '1995-07-10', cpf: '987.654.321-02', endereco: 'Av. Sol, 200', telefone: '(21) 91234-5678' },
            { id: '103', nome: 'Fernanda Lima', dataNascimento: '1972-01-01', cpf: '111.222.333-03', endereco: 'Praça Central, 50', telefone: '(31) 99876-1234' }
        ];

        // Busca o paciente correspondente na lista simulada pelo ID
        const patientToEdit = mockPatients.find(p => p.id === patientId);

        if (patientToEdit) {
            // Preenche o formulário com os dados do paciente encontrado
            if (editNome) editNome.value = patientToEdit.nome;
            if (editDataNascimento) editDataNascimento.value = patientToEdit.dataNascimento;
            if (editCpf) editCpf.value = patientToEdit.cpf;
            if (editEndereco) editEndereco.value = patientToEdit.endereco;
            if (editTelefone) editTelefone.value = patientToEdit.telefone;
        } else {
            // Caso o ID na URL não corresponda a nenhum paciente simulado
            alert('Paciente não encontrado com o ID fornecido! Verifique o ID na URL.');
            // Opcional: Redirecionar de volta para a lista de pacientes após o erro
            // window.location.href = 'pacientes.html';
        }

        // Lida com o envio do formulário de atualização
        if (editPatientForm) {
            editPatientForm.addEventListener('submit', function(event) {
                event.preventDefault(); // Impede o envio padrão do formulário

                // Coleta os dados atualizados do formulário
                const updatedPatientData = {
                    id: patientId, // Garante que o ID do paciente seja enviado para atualização
                    nome: editNome.value,
                    dataNascimento: editDataNascimento.value,
                    cpf: editCpf.value,
                    endereco: editEndereco.value,
                    telefone: editTelefone.value
                };

                console.log('Dados do paciente a serem atualizados (simulado):', updatedPatientData);
                alert('Paciente atualizado com sucesso (simulado)!');
                
                // Opcional: Redirecionar de volta para a lista de pacientes após a atualização simulada
                // window.location.href = 'pacientes.html';

                /*
                // --- CÓDIGO PARA INTEGRAÇÃO COM BACKEND REAL (ATUALIZAÇÃO DE DADOS) ---
                // Descomente e ajuste quando tiver um backend configurado para receber PUT/PATCH
                fetch(`/api/pacientes/${patientId}`, { // Exemplo: requisição PUT para /api/pacientes/101
                    method: 'PUT', // Ou 'PATCH', dependendo da sua API REST
                    headers: {
                        'Content-Type': 'application/json',
                        // Adicione cabeçalhos de autenticação se sua API exigir (ex: 'Authorization': 'Bearer seu_token')
                    },
                    body: JSON.stringify(updatedPatientData) // Envia os dados atualizados como JSON
                })
                .then(response => {
                    if (!response.ok) {
                        // Se a resposta HTTP não for bem-sucedida (ex: 400, 404, 500), trata o erro
                        return response.json().then(err => Promise.reject(err));
                    }
                    // Se o backend não retornar JSON (ex: status 204 No Content), 
                    // ajuste para 'response.text()' ou remova esta linha se não precisar do retorno.
                    return response.text().then(text => text ? JSON.parse(text) : {}); 
                })
                .then(data => {
                    alert('Paciente atualizado com sucesso!');
                    // Redireciona para a lista de pacientes após a atualização bem-sucedida
                    window.location.href = 'pacientes.html'; 
                })
                .catch(error => {
                    // Lida com erros de rede ou outros problemas na requisição
                    console.error('Erro ao atualizar paciente:', error);
                    alert(`Erro ao atualizar paciente: ${error.message || 'Verifique o console do navegador para mais detalhes.'}`);
                });
                */
            });
        }
    } else {
        // Caso nenhum ID de paciente seja passado na URL (ex: acessou editar_paciente.html diretamente)
        alert('ID do paciente não fornecido na URL. Redirecionando para a lista de pacientes.');
        window.location.href = 'pacientes.html'; // Redireciona de volta para a lista
    }
});