import React, { useState } from 'react'
import { MenuItem, Select } from '@mui/material'
import { TimeSelectionProps } from '@common/models'
import { GenosErrorButtonText } from '../ButtonText'
import { Genos_Secondary_20_500, Genos_Secondary_24_500 } from '../Typography'
import {
    Container,
    Content,
    PickerContainer,
    PlusButtonContainer,
    SelectContainer,
    TimeContent,
    TimesContainer,
} from './styles'

export const TimeSelection = ({ onChange }: TimeSelectionProps) => {
    const [hours, setHours] = useState<string>('08')
    const [minutes, setMinutes] = useState<string>('00')
    const [selectedTimes, setSelectedTimes] = useState<string[]>([])

    // Generate options for hours (00-23) and minutes (00, 15, 30, 45)
    const hourOptions = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'))
    const minuteOptions = ['00', '15', '30', '45']

    const handleAddTime = () => {
        const newTime = `${hours}:${minutes}`
        if (!selectedTimes.includes(newTime)) {
            const updatedTimes = [...selectedTimes, newTime]
            setSelectedTimes(updatedTimes)
            onChange(updatedTimes) // Notify parent about the updated times
        }
    }

    const handleRemoveTime = (time: string) => {
        const updatedTimes = selectedTimes.filter((t) => t !== time)
        setSelectedTimes(updatedTimes)
        onChange(updatedTimes) // Notify parent about the updated times
    }

    return (
        <Container>
            <Content>
                <SelectContainer>
                    <PickerContainer>
                        <Select value={hours} onChange={(e) => setHours(e.target.value)} fullWidth displayEmpty>
                            <MenuItem disabled value="">
                                Hora
                            </MenuItem>
                            {hourOptions.map((hour) => (
                                <MenuItem key={hour} value={hour}>
                                    {hour}
                                </MenuItem>
                            ))}
                        </Select>
                    </PickerContainer>

                    <PickerContainer>
                        <Select value={minutes} onChange={(e) => setMinutes(e.target.value)} fullWidth displayEmpty>
                            <MenuItem disabled value="">
                                Minutos
                            </MenuItem>
                            {minuteOptions.map((minute) => (
                                <MenuItem key={minute} value={minute}>
                                    {minute}
                                </MenuItem>
                            ))}
                        </Select>
                    </PickerContainer>
                </SelectContainer>
                <PlusButtonContainer onClick={handleAddTime}>
                    <Genos_Secondary_20_500 text="Adicionar Horário" />
                </PlusButtonContainer>
            </Content>

            <TimeContent>
                {selectedTimes.length > 0 && <Genos_Secondary_24_500 text="Horários Selecionados:" />}

                {selectedTimes.length > 0 ? (
                    selectedTimes.map((time) => (
                        <TimesContainer key={time}>
                            <Genos_Secondary_20_500 text={time} />
                            <GenosErrorButtonText
                                title="Remover"
                                selected={true}
                                onClick={() => handleRemoveTime(time)}
                            />
                        </TimesContainer>
                    ))
                ) : (
                    <Genos_Secondary_24_500 text="Nenhum horário selecionado" />
                )}
            </TimeContent>
        </Container>
    )
}
