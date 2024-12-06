### Backlog de tarefas

## Toda Aplicação

**TermsOfUse**

    1 - Criação de página de 'Termos de Uso' com legislação da LGPD

**Notificações**

    1 - Criar serviço de notificações por WhatsApp e Email

## Admin Area

**MyAgendaComponent**

    1 - Criar função para trazer todos os 'appointments' do mês selecionado
    (Disponíves, Reservados e Desabilitados)

    2 - Configurar Calendário com novas opções de cores e ações

    3- Criar funções de update, create e delete

**CreateAgendaComponent**

    1 - Criar validação para que não seja possível recriar agenda já existente

**UsersComponent**

    1 - Criar página 'History'
        - Histórico de consultas do paciente
        - Campo de texto (Observações) para resgistro de informações clínicas

**Relatório Financeiro**

## User Area

**PaymentComponent**
1 - Criar função de update nos 'appointments'

        Payload:
        [
            {
                "year":2024,
                "month":11,
                "day":16,
                "hour":480,
                "custumerId":"0d3417f2-5c4b-4e4a-88c0-5875980f7fd7",
                "enable":true,
                "userEmail":"diego@email.com"
            },
            {
                "year":2024,
                "month":11,
                "day":24,
                "hour":630,
                "custumerId":"0d3417f2-5c4b-4e4a-88c0-5875980f7fd7",
                "enable":true,
                "userEmail":"diego@email.com"
            },
        ]

    2 - Criar Middleware para integração com meios de pagamento

**PreviousComponent**

    1 - Criar página para usuário visualizar seu histórico de consultas

**ScheduledComponents**

    1 - Criar página para usuário visualizar suas próximas consultas
