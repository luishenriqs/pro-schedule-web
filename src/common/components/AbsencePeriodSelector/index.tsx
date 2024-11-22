import React, { useState } from 'react'
import { Checkbox, FormControlLabel } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers-pro'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { AbsencePeriod, AbsencePeriodSelectorProps } from '@common/models'
import { useNotification } from '@common/hooks/useNotification'
import {
    Genos_Error_24_500,
    Genos_Secondary_16_500,
    Genos_Secondary_20_500,
    Genos_Secondary_24_500,
    Genos_Success_24_500,
} from '../Typography'
import { CalendarMenu, Container, Content, DataContent, DateContainer, PlusButtonContainer } from './styles'

export const AbsencePeriodSelector = ({ selectedMonth, onChange }: AbsencePeriodSelectorProps) => {
    const { emmitAlert } = useNotification()

    const [isAbsent, setIsAbsent] = useState(false)
    const [startDate, setStartDate] = useState<Date | null>(null)
    const [endDate, setEndDate] = useState<Date | null>(null)

    const handleCheckboxChange = () => {
        setIsAbsent(!isAbsent)
        if (!isAbsent) {
            onChange(null) // Reset when checkbox is unchecked
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
    }

    return (
        <Container>
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

            {isAbsent && (
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
                                />
                            </LocalizationProvider>
                        </DateContainer>

                        <PlusButtonContainer onClick={handleSetPeriod}>
                            <Genos_Secondary_20_500 text="Confirmar Período" />
                        </PlusButtonContainer>
                    </DataContent>
                </Content>
            )}
        </Container>
    )
}
