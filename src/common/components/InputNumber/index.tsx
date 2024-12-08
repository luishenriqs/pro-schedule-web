import React, { useState } from 'react'
import { TextField, IconButton } from '@mui/material'
import { useNotification } from '@common/hooks/useNotification'
import { Container, DownArrowIcon, UpArrowIcon } from './styles'

interface NumberInputWithButtonsProps {
    value: number
    onChange: (value: number) => void
}

export const InputNumber: React.FC<NumberInputWithButtonsProps> = ({ value, onChange }) => {
    const { emmitAlert } = useNotification()

    const [internalValue, setInternalValue] = useState(value)

    const handleIncrement = () => {
        setInternalValue((prevValue) => {
            const newValue = prevValue + 1
            onChange(newValue)
            return newValue
        })
    }

    const handleDecrement = () => {
        setInternalValue((prevValue) => {
            const newValue = Math.max(0, prevValue - 1) // Impede que o valor seja negativo
            onChange(newValue)
            return newValue
        })
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = Number(e.target.value)
        if (!isNaN(inputValue) && inputValue >= 0) {
            setInternalValue(inputValue)
            onChange(inputValue)
        } else {
            setInternalValue(0) // Resetar para 0 se o valor for inválido
            emmitAlert('Insira um número válido.')
        }
    }

    return (
        <Container>
            <IconButton onClick={handleDecrement} size="small">
                <DownArrowIcon />
            </IconButton>
            <TextField
                type="number"
                value={internalValue}
                onChange={handleInputChange}
                size="small"
                variant="outlined"
                style={{ width: 'auto', alignItems: 'center', justifyContent: 'center' }}
                slotProps={{
                    htmlInput: {
                        min: 0,
                    },
                }}
            />
            <IconButton onClick={handleIncrement} size="small">
                <UpArrowIcon />
            </IconButton>
        </Container>
    )
}
