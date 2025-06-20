document.addEventListener('DOMContentLoaded', () => {
    const startTelemedicinaForm = document.getElementById('startTelemedicinaForm');
    const pacienteTeleconsultaSelect = document.getElementById('pacienteTeleconsulta');
    const medicoTeleconsultaSelect = document.getElementById('medicoTeleconsulta');
    const teleconsultasListDiv = document.getElementById('teleconsultasList');

    // Carregar pacientes e profissionais para os selects
    const patients = JSON.parse(localStorage.getItem('patients')) || [];
    const professionals = JSON.parse(localStorage.getItem('professionals')) || []; // Pega dos profissionais cadastrados

    function populateSelects() {
        if (pacienteTeleconsultaSelect) {
            pacienteTeleconsultaSelect.innerHTML = '<option value="">Selecione um paciente</option>';
            patients.forEach(p => {
                const option = document.createElement('option');
                option.value = p.id;
                option.textContent = p.nome;
                pacienteTeleconsultaSelect.appendChild(option);
            });
        }

        if (medicoTeleconsultaSelect) {
            medicoTeleconsultaSelect.innerHTML = '<option value="">Selecione um profissional</option>';
            professionals.forEach(prof => {
                const option = document.createElement('option');
                option.value = prof.id;
                option.textContent = `${prof.nome} (${prof.especialidade})`;
                medicoTeleconsultaSelect.appendChild(option);
            });
        }
    }

    // Função para renderizar a lista de teleconsultas (baseado nos agendamentos de telemedicina)
    function renderTeleconsultas() {
        if (teleconsultasListDiv) {
            const allAppointments = JSON.parse(localStorage.getItem('appointments')) || [];
            const teleconsultas = allAppointments.filter(appt => appt.type === 'telemedicina');

            if (teleconsultas.length === 0) {
                teleconsultasListDiv.innerHTML = '<p>Nenhuma teleconsulta registrada ainda.</p>';
                return;
            }

            let html = '<table class="data-table"><thead><tr><th>Paciente</th><th>Profissional</th><th>Data</th><th>Hora</th><th>Status</th><th>Ações</th></tr></thead><tbody>';
            teleconsultas.forEach((teleconsulta, index) => {
                const patientName = patients.find(p => p.id == teleconsulta.patientId)?.nome || 'Paciente Desconhecido';
                const professionalName = professionals.find(p => p.id == teleconsulta.professionalId)?.nome || 'Profissional Desconhecido';

                html += `
                    <tr>
                        <td>${patientName}</td>
                        <td>${professionalName}</td>
                        <td>${teleconsulta.date}</td>
                        <td>${teleconsulta.time}</td>
                        <td>Agendada</td> <td>
                            <button class="btn info btn-sm" onclick="joinCall('${teleconsulta.id}')">Entrar</button>
                            <button class="btn secondary btn-sm" onclick="viewRecord('${teleconsulta.id}')">Prontuário</button>
                        </td>
                    </tr>
                `;
            });
            html += '</tbody></table>';
            teleconsultasListDiv.innerHTML = html;
        }
    }

    // Lógica para iniciar a videochamada
    if (startTelemedicinaForm) {
        startTelemedicinaForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const selectedPatient = pacienteTeleconsultaSelect.options[pacienteTeleconsultaSelect.selectedIndex].textContent;
            const selectedProfessional = medicoTeleconsultaSelect.options[medicoTeleconsultaSelect.selectedIndex].textContent;

            // Simulação: Abre um link de demonstração de videochamada.
            // Em um sistema real, você chamaria uma API de videochamada aqui.
            const confirmCall = confirm(`Deseja iniciar uma teleconsulta entre ${selectedPatient} e ${selectedProfessional}?`);
            if (confirmCall) {
                window.open('https://meet.google.com/new', '_blank'); // Exemplo com Google Meet
                alert('Iniciando videochamada (em uma nova janela/aba)...');
                // Aqui você adicionaria lógica para registrar o início da teleconsulta
            }
        });
    }

    // Funções de ação (globais para serem acessíveis via onclick)
    window.joinCall = function(teleconsultaId) {
        alert(`Entrando na chamada da teleconsulta ID: ${teleconsultaId}`);
        window.open('https://meet.google.com/new', '_blank'); // Abre link de exemplo
    };

    window.viewRecord = function(teleconsultaId) {
        alert(`Visualizando prontuário para a teleconsulta ID: ${teleconsultaId}`);
        // Em um sistema real, isso navegaria para a tela de prontuário do paciente específico
    };

    populateSelects();
    renderTeleconsultas();
});