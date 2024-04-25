import React from 'react'
import * as icons from '@mui/icons-material'

interface IconMap {
    [key: string]: React.ElementType
}

interface IconProps {
    iconName: string
    color?: string
    margin?: string
}

export const Icon: React.FC<IconProps> = ({ iconName, color, margin }) => {
    const iconMap: IconMap = icons

    const IconComponent = iconMap[iconName]
    if (!IconComponent) {
        return null
    }
    return <IconComponent style={{ color, margin }} />
}
