import React, { useState } from 'react'
import { Checkbox, FormControlLabel } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers-pro'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { AbsencePeriod, AbsencePeriodSelectorProps } from '@common/models'
import { useNotification } from '@common/hooks/useNotification'
import { GenosErrorButtonText } from '../ButtonText'
import {
    Genos_Error_24_500,
    Genos_Secondary_16_500,
    Genos_Secondary_20_500,
    Genos_Secondary_24_500,
    Genos_Success_24_500,
} from '../Typography'
import {
    CalendarMenu,
    Container,
    Content,
    DataContent,
    DateContainer,
    DateContent,
    InfoMenu,
    PlusButtonContainer,
} from './styles'

export const AbsencePeriodSelector = ({ selectedMonth, onChange }: AbsencePeriodSelectorProps) => {
    const { emmitAlert } = useNotification()

    const [isAbsent, setIsAbsent] = useState(false)
    const [startDate, setStartDate] = useState<Date | null>(null)
    const [endDate, setEndDate] = useState<Date | null>(null)
    const [isConfirmed, setIsConfirmed] = useState(false) // Novo estado

    const handleCheckboxChange = () => {
        setIsAbsent(!isAbsent)
        if (!isAbsent) {
            onChange(null) // Reset when checkbox is unchecked
            setIsConfirmed(false) // Reset confirmation when unchecked
        }
    }

    const handleSetPeriod = () => {
        if (!startDate || !endDate) {
            emmitAlert('Por favor, preencha as duas datas.')
            return
        }

        const start = new Date(startDate)
        const end = new Date(endDate)

        if (start > end) {
            emmitAlert('A data de início não pode ser maior que a data de fim.')
            return
        }

        const monthStart = selectedMonth.month
        const yearStart = selectedMonth.year

        if (
            start.getFullYear() !== yearStart ||
            start.getMonth() !== monthStart ||
            end.getFullYear() !== yearStart ||
            end.getMonth() !== monthStart
        ) {
            emmitAlert('As datas devem estar dentro do mês selecionado.')
            return
        }

        const formattedPeriod: AbsencePeriod[] = [
            { year: start.getFullYear(), month: start.getMonth(), day: start.getDate() },
            { year: end.getFullYear(), month: end.getMonth(), day: end.getDate() },
        ]

        onChange(formattedPeriod)
        setIsConfirmed(true)
    }

    const handleRemovePeriod = () => {
        setStartDate(null)
        setEndDate(null)
        setIsConfirmed(false)
        setIsAbsent(false)
    }

    return (
        <Container>
            {!isConfirmed && (
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={isAbsent}
                            onChange={handleCheckboxChange}
                            color="primary"
                            checkedIcon={<Genos_Success_24_500 text="✓" />}
                            icon={<Genos_Error_24_500 text="✗" />}
                        />
                    }
                    label={<Genos_Secondary_24_500 text="Período ausente?" />}
                />
            )}

            {isAbsent && !isConfirmed && (
                <Content>
                    <Genos_Secondary_20_500 text="Selecione o período:" />
                    <DataContent>
                        <DateContainer>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    label={<Genos_Secondary_16_500 text="Data de Início" />}
                                    value={startDate}
                                    onChange={(newValue) => setStartDate(newValue)}
                                    slots={{
                                        openPickerIcon: () => <CalendarMenu />,
                                    }}
                                    minDate={new Date(selectedMonth.year, selectedMonth.month, 1)}
                                    maxDate={new Date(selectedMonth.year, selectedMonth.month + 1, 0)}
                                    sx={{ width: '48%', borderRadius: '8px' }}
                                />
                                <DatePicker
                                    label={<Genos_Secondary_16_500 text="Data de Fim" />}
                                    value={endDate}
                                    onChange={(newValue) => setEndDate(newValue)}
                                    slots={{
                                        openPickerIcon: () => <CalendarMenu />,
                                    }}
                                    minDate={new Date(selectedMonth.year, selectedMonth.month, 1)}
                                    maxDate={new Date(selectedMonth.year, selectedMonth.month + 1, 0)}
                                    sx={{ width: '48%', borderRadius: '8px' }}
                                />
                            </LocalizationProvider>
                        </DateContainer>

                        <PlusButtonContainer onClick={handleSetPeriod}>
                            <Genos_Secondary_20_500 text="Confirmar Período" />
                        </PlusButtonContainer>
                    </DataContent>
                </Content>
            )}

            {isAbsent && isConfirmed && startDate && endDate && (
                <Content>
                    <Genos_Secondary_24_500 text="Ausência:" />
                    <InfoMenu>
                        <DateContent>
                            <Genos_Secondary_24_500 text={`De: ${startDate.toLocaleDateString()}`} />
                            <Genos_Secondary_24_500 text={`Até: ${endDate.toLocaleDateString()}`} />
                        </DateContent>
                        <GenosErrorButtonText title="Remover" selected={true} onClick={handleRemovePeriod} />
                    </InfoMenu>
                </Content>
            )}
        </Container>
    )
}
