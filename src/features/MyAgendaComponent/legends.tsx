import { Questrial_Secondary_16_500 } from '@common/components/Typography'
import { COLORS } from '@common/styles/theme'
import { Legend, LegendContainer } from './styles'

export const CalendarLegends = () => {
    return (
        <>
            <LegendContainer>
                <Legend color={'primary'} />
                <Questrial_Secondary_16_500 text=" - Agenda Aberta" />
            </LegendContainer>
            <LegendContainer>
                <Legend color={'background'} />
                <Questrial_Secondary_16_500 text=" - Agenda Indisponível" />
            </LegendContainer>
            <LegendContainer>
                <Legend color={'tertiary'} />
                <Questrial_Secondary_16_500 text=" - Agenda Fechada" />
            </LegendContainer>
        </>
    )
}

export const AppointmentsLegends = () => {
    return (
        <>
            <LegendContainer>
                <Legend color={'primary'} />
                <Questrial_Secondary_16_500 text=" - Horário disponível" />
            </LegendContainer>
            <LegendContainer>
                <Legend color={'background'} />
                <Questrial_Secondary_16_500 text=" - Horário Desabilitado" />
            </LegendContainer>
            <LegendContainer>
                <Legend color={'tertiary'} />
                <Questrial_Secondary_16_500 text=" - Horário Reservado" />
            </LegendContainer>
            <LegendContainer>
                <Legend color={'background'} style={{ borderColor: COLORS.disabled_200 }} />
                <Questrial_Secondary_16_500 text=" - Horário Expirado" />
            </LegendContainer>
        </>
    )
}

export const ExpiredAppointmentLegend = () => {
    return (
        <LegendContainer>
            <Legend color={'background'} style={{ borderColor: COLORS.disabled_200 }} />
            <Questrial_Secondary_16_500 text=" - Horário Expirado" />
        </LegendContainer>
    )
}
