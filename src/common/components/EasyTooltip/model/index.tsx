import { SxProps, Theme } from '@mui/material'

export interface IdeasTooltipProps {
    title: string
    arrow: boolean
    onClick?: () => void
    placement?:
        | 'bottom'
        | 'left'
        | 'right'
        | 'top'
        | 'bottom-end'
        | 'bottom-start'
        | 'left-end'
        | 'left-start'
        | 'right-end'
        | 'right-start'
        | 'top-end'
        | 'top-start'
    children: React.ReactElement<any, any>
    sxProps?: SxProps<Theme>
    sxPropsArrow?: SxProps<Theme>
}
