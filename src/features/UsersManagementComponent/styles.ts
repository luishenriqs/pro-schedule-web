import { styled } from '@mui/material/styles'
import { Box, TextField } from '@mui/material'
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined'
import { COLORS } from '@common/styles/theme'

export const Container = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    width: '100vw',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    background: COLORS.background,
})

export const TitleContainer = styled(Box)({
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    marginBottom: '20px',
})

export const Content = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    maxWidth: '800px',
    marginBottom: '50px',
})

export const UserRow = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: '10px',
    background: COLORS.white,
    borderRadius: '5px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
})

export const Label = styled(Box)({
    fontWeight: 'bold',
    color: COLORS.disabled_600,
    flex: 1,
})

export const Value = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    color: COLORS.disabled_600,
    flex: 2,
})

export const InputField = styled(TextField)({
    width: '100%',
    flex: 2,
    '& input': {
        padding: '10px',
    },
})

export const UserInfo = styled(Box)({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: '500px',
    margin: '10px 0',
    padding: '10px',
    border: '1px solid',
    borderColor: COLORS.disabled_200,
    borderRadius: '8px',
    background: COLORS.white,
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',

    '& input': {
        flex: 1,
        border: 'none',
        padding: '5px',
        fontSize: '14px',
        borderRadius: '4px',
        outline: 'none',
        backgroundColor: COLORS.disabled_100,
    },
})

export const LabelContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'row',
    width: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 10px',
})

export const InputContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'row',
    width: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
})

export const EditIcon = styled(ModeEditOutlineOutlinedIcon)({
    color: COLORS.primary,
    width: '25px',
    height: '25px',
    marginRight: '10px',
})
