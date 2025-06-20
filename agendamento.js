document.addEventListener('DOMContentLoaded', () => {
    const appointmentForm = document.getElementById('appointmentForm');
    const patientSelect = document.getElementById('pacienteAgendamento');
    const medicoSelect = document.getElementById('medicoAgendamento');
    const appointmentListDiv = document.getElementById('appointmentList');

    // Carregar pacientes e profissionais para os selects
    let patients = JSON.parse(localStorage.getItem('patients')) || [];
    // Simulação de profissionais (poderia vir de outra página/localStorage)
    const professionals = [
        { id: 1, nome: 'Dr. João Silva - Cardiologista' },
        { id: 2, nome: 'Dra. Maria Souza - Pediatra' },
        { id: 3, nome: 'Enf. Carlos Lima - Enfermagem' },
    ];

    function populateSelects() {
        if (patientSelect) {
            patientSelect.innerHTML = '<option value="">Selecione um paciente</option>';
            patients.forEach(p => {
                const option = document.createElement('option');
                option.value = p.id;
                option.textContent = p.nome;
                patientSelect.appendChild(option);
            });
        }

        if (medicoSelect) {
            medicoSelect.innerHTML = '<option value="">Selecione um profissional</option>';
            professionals.forEach(prof => {
                const option = document.createElement('option');
                option.value = prof.id;
                option.textContent = prof.nome;
                medicoSelect.appendChild(option);
            });
        }
    }

    // Simulação de "banco de dados" local para agendamentos
    let appointments = JSON.parse(localStorage.getItem('appointments')) || [];

    function renderAppointments() {
        if (appointmentListDiv) {
            if (appointments.length === 0) {
                appointmentListDiv.innerHTML = '<p>Nenhum agendamento futuro.</p>';
                return;
            }

            let html = '<table class="data-table"><thead><tr><th>Paciente</th><th>Profissional</th><th>Data</th><th>Hora</th><th>Tipo</th><th>Ações</th></tr></thead><tbody>';
            appointments.forEach((appt, index) => {
                const patientName = patients.find(p => p.id == appt.patientId)?.nome || 'Paciente Desconhecido';
                const professionalName = professionals.find(p => p.id == appt.professionalId)?.nome || 'Profissional Desconhecido';

                html += `
                    <tr>
                        <td>${patientName}</td>
                        <td>${professionalName}</td>
                        <td>${appt.date}</td>
                        <td>${appt.time}</td>
                        <td>${appt.type === 'presencial' ? 'Presencial' : 'Telemedicina'}</td>
                        <td>
                            <button class="btn danger btn-sm" onclick="cancelAppointment(${index})">Cancelar</button>
                        </td>
                    </tr>
                `;
            });
            html += '</tbody></table>';
            appointmentListDiv.innerHTML = html;
        }
    }

    if (appointmentForm) {
        appointmentForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const newAppointment = {
                id: Date.now(),
                patientId: patientSelect.value,
                professionalId: medicoSelect.value,
                date: document.getElementById('dataConsulta').value,
                time: document.getElementById('horaConsulta').value,
                type: document.getElementById('tipoConsulta').value,
            };

            appointments.push(newAppointment);
            localStorage.setItem('appointments', JSON.stringify(appointments));
            appointmentForm.reset();
            renderAppointments();
            alert('Agendamento realizado com sucesso!');
        });
    }

    window.cancelAppointment = function(index) {
        if (confirm(`Tem certeza que deseja cancelar este agendamento?`)) {
            appointments.splice(index, 1);
            localStorage.setItem('appointments', JSON.stringify(appointments));
            renderAppointments();
        }
    };

    populateSelects();
    renderAppointments();
});