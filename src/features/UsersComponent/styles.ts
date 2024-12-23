import { styled } from '@mui/material/styles'
import { Box } from '@mui/material'
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined'
import StarIcon from '@mui/icons-material/Star'
import BlockIcon from '@mui/icons-material/Block'
import TimelineIcon from '@mui/icons-material/Timeline'
import { COLORS } from '@common/styles/theme'

export const Container = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100vw',
    height: '100vh',
    background: COLORS.background,
})

export const TitleContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '30px',
    marginBottom: '30px',
})

export const Content = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: '800px',
    height: '100vh',
    overflowY: 'scroll',
    gap: '10px',
    marginBottom: '30px',
    padding: '10px',
})

export const UserRow = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: '10px 15px',
    borderRadius: '5px',
    background: COLORS.background,
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
})

export const UserContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 'auto',
    height: 'auto',
})

export const ButtonsContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: 'auto',
    height: 'auto',
})

export const ButtonsTextContainer = styled(Box)({
    display: 'none',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 'auto',
    height: 'auto',

    '@media (min-width:1024px)': {
        display: 'flex',
    },
})

export const ButtonsIconsContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 'auto',
    height: 'auto',

    '@media (min-width:1024px)': {
        display: 'none',
    },
})

export const EditIcon = styled(ModeEditOutlineOutlinedIcon)({
    color: COLORS.primary,
    width: '25px',
    height: '25px',
    marginRight: '10px',
})

export const HistoryIcon = styled(TimelineIcon)({
    color: COLORS.secondary,
    width: '25px',
    height: '25px',
    marginRight: '10px',
})

export const AdminIcon = styled(StarIcon)({
    color: COLORS.primary,
    width: '25px',
    height: '25px',
    marginLeft: '10px',
})

export const ManagerIcon = styled(StarIcon)({
    color: COLORS.error,
    width: '25px',
    height: '25px',
    marginLeft: '10px',
})

export const BlockedIcon = styled(BlockIcon)({
    color: COLORS.error,
    width: '25px',
    height: '25px',
    marginLeft: '10px',
})
