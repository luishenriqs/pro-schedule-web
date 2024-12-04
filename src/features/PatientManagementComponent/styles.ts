import { styled } from '@mui/material/styles'
import { Box, IconButton, TextField } from '@mui/material'

export const Container = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    width: '100vw',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: '20px',
    background: '#f5f5f5',
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
    width: '100%',
    maxWidth: '800px',
    gap: '15px',
})

export const UserRow = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: '10px',
    background: '#fff',
    borderRadius: '5px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
})

export const Label = styled(Box)({
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
})

export const Value = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    color: '#555',
    flex: 2,
})

export const EditIcon = styled(IconButton)({
    color: '#1976d2',
    cursor: 'pointer',
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
    border: '1px solid #ddd',
    borderRadius: '8px',
    background: '#fff',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',

    '& span': {
        fontWeight: 'bold',
        marginRight: '10px',
    },

    '& input': {
        flex: 1,
        border: 'none',
        padding: '5px',
        fontSize: '14px',
        borderRadius: '4px',
        outline: 'none',
        backgroundColor: '#f3f3f3',
    },
})
