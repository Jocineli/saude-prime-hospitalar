document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const patientId = urlParams.get('id'); // Pega o ID do paciente da URL

    const patientIdDisplay = document.getElementById('patientIdDisplay');
    const editPatientForm = document.getElementById('editPatientForm');
    const editNome = document.getElementById('editNome');
    const editDataNascimento = document.getElementById('editDataNascimento');
    const editCpf = document.getElementById('editCpf');
    const editEndereco = document.getElementById('editEndereco');
    const editTelefone = document.getElementById('editTelefone');

    if (patientId) {
        // Exibe o ID do paciente no título da página
        patientIdDisplay.textContent = `(ID: ${patientId})`;

        // SIMULAÇÃO: Dados de pacientes para preenchimento.
        // Em um sistema real, você faria uma requisição Fetch/AJAX para seu backend aqui.
        const mockPatients = [
            { id: '101', nome: 'Maria Clara Souza', dataNascimento: '1988-03-20', cpf: '123.456.789-01', endereco: 'Rua Flores, 10', telefone: '(11) 98765-4321' },
            { id: '102', nome: 'João Pedro Almeida', dataNascimento: '1995-07-10', cpf: '987.654.321-02', endereco: 'Av. Sol, 200', telefone: '(21) 91234-5678' },
            { id: '103', nome: 'Fernanda Lima', dataNascimento: '1972-01-01', cpf: '111.222.333-03', endereco: 'Praça Central, 50', telefone: '(31) 99876-1234' }
        ];

        const patientToEdit = mockPatients.find(p => p.id === patientId);

        if (patientToEdit) {
            // Preenche o formulário com os dados do paciente encontrado
            editNome.value = patientToEdit.nome;
            editDataNascimento.value = patientToEdit.dataNascimento;
            editCpf.value = patientToEdit.cpf;
            editEndereco.value = patientToEdit.endereco;
            editTelefone.value = patientToEdit.telefone;
        } else {
            alert('Paciente não encontrado!');
            // Opcional: Redirecionar de volta para a lista de pacientes
            // window.location.href = 'pacientes.html';
        }

        // Lidar com o envio do formulário de atualização
        editPatientForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Impede o envio padrão do formulário

            const updatedPatientData = {
                id: patientId,
                nome: editNome.value,
                dataNascimento: editDataNascimento.value,
                cpf: editCpf.value,
                endereco: editEndereco.value,
                telefone: editTelefone.value
            };

            console.log('Dados do paciente atualizados (simulado):', updatedPatientData);
            alert('Paciente atualizado com sucesso (simulado)!');
            // Opcional: Redirecionar de volta para a lista de pacientes após a atualização
            // window.location.href = 'pacientes.html';

            /*
            // EXEMPLO: Se você tiver um backend, use Fetch API para enviar os dados atualizados
            // Geralmente, usa-se PUT ou PATCH para atualizações
            fetch(`/api/pacientes/${patientId}`, { 
                method: 'PUT', // Ou 'PATCH'
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': 'Bearer seu_token'
                },
                body: JSON.stringify(updatedPatientData)
            })
            .then(response => {
                if (!response.ok) {
                    return response.json().then(err => Promise.reject(err));
                }
                return response.json(); 
            })
            .then(data => {
                alert('Paciente atualizado com sucesso!');
                window.location.href = 'pacientes.html'; // Redireciona após sucesso
            })
            .catch(error => {
                console.error('Erro ao atualizar paciente:', error);
                alert(`Erro ao atualizar paciente: ${error.message || 'Verifique o console para mais detalhes.'}`);
            });
            */
        });

    } else {
        alert('ID do paciente não fornecido na URL.');
        // Opcional: Redirecionar para a lista de pacientes se o ID não estiver na URL
        // window.location.href = 'pacientes.html';
    }
});