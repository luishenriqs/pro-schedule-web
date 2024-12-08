### Backlog de tarefas

## Bugs

## Toda Aplicação

**TermsOfUse**

1 - Criação de página de 'Termos de Uso' com legislação da LGPD

**Notificações**

1 - Criar serviço de notificações por WhatsApp e Email

## Admin Area

**MyAgendaComponent**

_Priority 1_
1 - Criar novo componente 'ManageAppointments' personalizado para 'MyAgendaComponent' - Horário disponível - Legenda: Hora / Cor: Primary / onClick: desabilita/habilita (enable: false/true)

    - Horário indisponível
        - Legenda: Hora / Cor: Background / onClick: habilita/desabilita (enable: true/false)

    - Horário reservado
        - Legenda: Hora + Nome do usuário / Cor: Background / onClick: abre modal de cancelamento + disable

    Se 'Reservado'
    - Criar Modal Cancelamento - Cancela atendimento, desabilita horário, adiciona crédito para usuário

    - Criar novo botão: "Adicionar horário" - Abre componente "CreateNewAppointments"

2 - Criar visualização de agenda em formato de lista

**CreateAgendaComponent**

1 - Criar validação para que não seja possível recriar agenda já existente

**UsersComponent**

1 - Criar Filtros para usuários, critérios: Admin, Manager, Nome, Data

2 - Criar SortBy por critérios: Mais Recentes, Mais Frequentes

3 - Criar página 'History' - Histórico de consultas do paciente - Campo de texto (Observações) para resgistro de informações clínicas

**Relatório Financeiro**

1 - Criar página de relatório financeiro e balanço do mês

## User Area

**PaymentComponent**

1 - Criar Middleware para integração com meios de pagamento

**PreviousComponent**

1 - Criar página para usuário visualizar seu histórico de consultas

**ScheduledComponents**

1 - Criar página para usuário visualizar suas próximas consultas

**Profile**

1 - Criar página de perfil para usuário visualizar seus dados e créditos
