import React from 'react'
import { Box, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material'
import { TimePickerProps } from '@common/models'

export const TimePicker = ({ label, value, onChange }: TimePickerProps) => {
    const hours = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0'))
    const minutes = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0'))

    const [hour, minute] = value.split(':')

    const handleHourChange = (event: SelectChangeEvent<string>) => {
        const newHour = event.target.value
        onChange(`${newHour}:${minute}`)
    }

    const handleMinuteChange = (event: SelectChangeEvent<string>) => {
        const newMinute = event.target.value
        onChange(`${hour}:${newMinute}`)
    }

    return (
        <Box display="flex" alignItems="center" gap={2}>
            {label && (
                <Typography variant="body1" sx={{ minWidth: '80px' }}>
                    {label}
                </Typography>
            )}
            <Select value={hour} onChange={handleHourChange} displayEmpty sx={{ width: 80 }}>
                {hours.map((h) => (
                    <MenuItem key={h} value={h}>
                        {h}
                    </MenuItem>
                ))}
            </Select>
            <Typography variant="body1">:</Typography>
            <Select value={minute} onChange={handleMinuteChange} displayEmpty sx={{ width: 80 }}>
                {minutes.map((m) => (
                    <MenuItem key={m} value={m}>
                        {m}
                    </MenuItem>
                ))}
            </Select>
        </Box>
    )
}
