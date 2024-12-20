import React, { useState } from 'react'
import { MonthYearSelectProps } from '@common/models'
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import { MONTHS } from '@common/models/enuns'
import { Genos_Secondary_20_500 } from '../Typography'
import { Container, SelectContainer } from './styles'

export const MonthYearSelect = ({ onChange }: MonthYearSelectProps) => {
    const [selectedMonth, setSelectedMonth] = useState<number | null>(null)
    const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear())

    const currentDate = new Date()
    const currentMonth = currentDate.getMonth()
    const currentYear = currentDate.getFullYear()

    // Generate years dynamically, e.g., current year and the next 5 years
    const years = Array.from({ length: 6 }, (_, index) => currentYear + index)

    // Get months filtered based on selected year
    const getFilteredMonths = () => {
        if (selectedYear === currentYear) {
            return MONTHS.filter((month) => month.index >= currentMonth) // Only current and future months
        }
        return MONTHS // All months for future years
    }

    const handleMonthChange = (event: SelectChangeEvent<number>) => {
        const monthIndex = Number(event.target.value)
        setSelectedMonth(monthIndex)

        // Emit the selected value
        const selected = {
            month: monthIndex,
            name: MONTHS.find((month) => month.index === monthIndex)?.name || '',
            year: selectedYear,
        }
        onChange(selected)
    }

    const handleYearChange = (event: SelectChangeEvent<number>) => {
        const year = Number(event.target.value)
        setSelectedYear(year)
        setSelectedMonth(null) // Reset month when year changes
    }

    return (
        <Container>
            <SelectContainer>
                <FormControl fullWidth>
                    <InputLabel id="year-select-label">Ano</InputLabel>
                    <Select
                        labelId="year-select-label"
                        id="year-select"
                        value={selectedYear}
                        onChange={handleYearChange}
                        label="Ano"
                    >
                        {years.map((year) => (
                            <MenuItem key={year} value={year}>
                                {<Genos_Secondary_20_500 text={year} />}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </SelectContainer>

            {/* Select for Month */}
            <SelectContainer>
                <FormControl fullWidth>
                    <InputLabel id="month-select-label">Mês</InputLabel>
                    <Select
                        labelId="month-select-label"
                        id="month-select"
                        value={selectedMonth !== null ? selectedMonth : ''}
                        onChange={handleMonthChange}
                        label="Mês"
                        disabled={!selectedYear} // Disable if no year is selected
                    >
                        {getFilteredMonths().map((month) => (
                            <MenuItem key={month.index} value={month.index}>
                                {<Genos_Secondary_20_500 text={month.name} />}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </SelectContainer>
        </Container>
    )
}
