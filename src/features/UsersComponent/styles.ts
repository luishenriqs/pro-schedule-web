import { styled } from '@mui/material/styles'
import { Box } from '@mui/material'
import { COLORS } from '@common/styles/theme'

export const Container = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100vw',
    height: '100vh',
    background: COLORS.background,
    padding: '20px',
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

export const ButtonsContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 'auto',
    height: 'auto',
})
