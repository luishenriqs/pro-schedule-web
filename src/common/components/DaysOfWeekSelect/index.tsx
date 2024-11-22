import React, { useState } from 'react'
import { FormGroup, FormControlLabel, Checkbox } from '@mui/material'
import { DaysOfWeekSelectProps } from '@common/models'
import { Container } from './styles'
import { Genos_Error_24_500, Genos_Success_24_500, Genos_Secondary_20_500 } from '../Typography'

export const DaysOfWeekSelect = ({ onChange }: DaysOfWeekSelectProps) => {
    const daysOfWeek = [
        'segunda-feira',
        'terça-feira',
        'quarta-feira',
        'quinta-feira',
        'sexta-feira',
        'sábado',
        'domingo',
    ]

    const [selectedDays, setSelectedDays] = useState<string[]>([])

    const handleDayChange = (day: string) => {
        const updatedDays = selectedDays.includes(day)
            ? selectedDays.filter((d) => d !== day) // Remove day if already selected
            : [...selectedDays, day] // Add day if not selected

        setSelectedDays(updatedDays)
        onChange(updatedDays) // Notify parent about the change
    }

    return (
        <Container>
            <FormGroup>
                {daysOfWeek.map((day) => (
                    <FormControlLabel
                        key={day}
                        control={
                            <Checkbox
                                checked={selectedDays.includes(day)}
                                onChange={() => handleDayChange(day)}
                                color="primary"
                                checkedIcon={<Genos_Success_24_500 text="✓" />}
                                icon={<Genos_Error_24_500 text="✗" />}
                            />
                        }
                        label={<Genos_Secondary_20_500 text={day} />}
                    />
                ))}
            </FormGroup>
        </Container>
    )
}
