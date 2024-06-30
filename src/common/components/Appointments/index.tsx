import React, { useCallback, useState } from 'react'
import { Genos_Primary_24_500, Genos_Secondary_24_500 } from '../Typography'
import {
    Container,
    HoursContainer,
    TitleContainer,
} from './styles'

export const Appointments = () => {

    return (
        <Container>
            <TitleContainer>                
                <Genos_Secondary_24_500 text='Escolha o seu horário' />
                <Genos_Primary_24_500 text='Dia: 3/6/2024' />
            </TitleContainer>
            <HoursContainer>
                <Genos_Secondary_24_500 text='08:00 horas' />
            </HoursContainer>
            <HoursContainer>
                <Genos_Secondary_24_500 text='09:00 horas' />
            </HoursContainer>
            <HoursContainer>
                <Genos_Secondary_24_500 text='10:00 horas' />
            </HoursContainer>
            <HoursContainer>
                <Genos_Secondary_24_500 text='11:00 horas' />
            </HoursContainer>

            <HoursContainer>
                <Genos_Secondary_24_500 text='14:00 horas' />
            </HoursContainer>
            <HoursContainer>
                <Genos_Secondary_24_500 text='15:00 horas' />
            </HoursContainer>
            <HoursContainer>
                <Genos_Secondary_24_500 text='16:00 horas' />
            </HoursContainer>
            <HoursContainer>
                <Genos_Secondary_24_500 text='17:00 horas' />
            </HoursContainer>
        </Container>
    )
}
