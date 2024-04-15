import React, { useEffect, useState } from 'react'
import { Drawer } from '@mui/material'
import Image from 'next/image'
import { Container } from './styles'

type DrawerProps = {
    isOpen: boolean
}

export const DrawerNavigator = ({ isOpen }: DrawerProps) => {
    const [open, setOpen] = useState(false)

    useEffect(() => {
        setOpen(isOpen)
    }, [isOpen])

    return (
        <Drawer anchor="left" open={open} onClose={() => setOpen(!isOpen)}>
            <Container>
                <Image
                    src={require('../../../../assets/pro-schedule-logo.png')}
                    alt={'Pro-Schedule-logo'}
                    width={250}
                    height={250}
                />
            </Container>
        </Drawer>
    )
}
