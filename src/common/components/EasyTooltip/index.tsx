import Tooltip from '@mui/material/Tooltip'
import React from 'react'
import { IdeasTooltipProps } from './model'
import Box from '@mui/material/Box'
import { COLORS } from '@common/styles/theme'
import { getSxProps } from '@common/utils/helpers'

export const EasyTooltip = ({
    title,
    arrow = false,
    onClick,
    placement = 'top',
    children,
    sxProps,
    sxPropsArrow,
}: IdeasTooltipProps) => {
    return (
        <Tooltip
            arrow={arrow}
            title={title}
            placement={placement}
            slotProps={{
                tooltip: {
                    sx: [
                        {
                            fontWeight: '300',
                            minWidth: '66px',
                            maxWidth: '300px',
                            backgroundColor: COLORS.disabled_100,
                            color: COLORS.secondary,
                            padding: title.length >= 100 ? '8px 14px' : '4px 8px',
                            textAlign: title.length >= 100 ? 'left' : 'center',
                            cursor: 'pointer',
                        },
                        ...getSxProps(sxProps),
                    ],
                },
                arrow: {
                    sx: [
                        {
                            color: COLORS.background,
                            position: 'relative',
                        },
                        ...getSxProps(sxPropsArrow),
                    ],
                },
            }}
        >
            <Box onClick={onClick} sx={{ display: 'inline-block' }}>
                {children}
            </Box>
        </Tooltip>
    )
}
