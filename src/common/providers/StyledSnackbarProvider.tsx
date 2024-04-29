import { styled } from '@mui/material'
import { SnackbarOrigin, SnackbarProvider, SnackbarProviderProps } from 'notistack'

interface StyledSnackbarProviderProps extends SnackbarProviderProps {}

const StyledSnackbarProvider: React.FC<StyledSnackbarProviderProps> = (props) => {
    const { children, ...other } = props

    const CustomProvider = styled(SnackbarProvider)(({
        theme: {
            palette: {
                error: { main: errorMain },
                success: { main: successMain },
                warning: { main: warningMain },
            },
        },
    }) => {
        return `
        &.notistack-MuiContent-error {
            background-color: ${errorMain};
        },
        &.notistack-MuiContent-success {
            background-color: ${successMain};
        },
        &.notistack-MuiContent-warning {
            background-color: ${warningMain};
        }
    `
    })
    const anchorOrigin: SnackbarOrigin = {
        vertical: 'bottom',
        horizontal: 'right',
    }

    return (
        <CustomProvider {...other} anchorOrigin={anchorOrigin}>
            {children}
        </CustomProvider>
    )
}

export default StyledSnackbarProvider
