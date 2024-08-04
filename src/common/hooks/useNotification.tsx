import { useCallback, useMemo } from 'react'
import { OptionsObject, useSnackbar } from 'notistack'

export const AUTO_HIDE_DURATION_SHORT = 2000
export const AUTO_HIDE_DURATION = 5000
export const AUTO_HIDE_DURATION_LONG = 10000

export enum NotificationMessage {
    UnexpectedErrorOcurred,
    DataSavedWithSuccess,
}

export function useNotification() {
    const { enqueueSnackbar } = useSnackbar()

    const extractMessage = (message: NotificationMessage) => {
        if (message === NotificationMessage.UnexpectedErrorOcurred) {
            return 'Ocorreu um erro inesperado'
        } else if (message === NotificationMessage.DataSavedWithSuccess) {
            return 'Dados salvos com sucesso'
        } else {
            return ''
        }
    }

    const emmitAlert = useCallback(
        (
            message: NotificationMessage | string,
            severity: 'error' | 'success' | 'warning' = 'warning',
            options: OptionsObject = {}
        ) => {
            const alertMessage = typeof message === 'string' ? message : extractMessage(message)

            enqueueSnackbar(alertMessage, {
                autoHideDuration: AUTO_HIDE_DURATION,
                variant: severity,
                preventDuplicate: true,
                ...options,
            })
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    )

    const emmitError = useCallback(
        (message: NotificationMessage | string, options?: OptionsObject) => {
            emmitAlert(message, 'error', options)
        },
        [emmitAlert]
    )

    const emmitSuccess = useCallback(
        (message: NotificationMessage | string, options?: OptionsObject) => {
            emmitAlert(message, 'success', options)
        },
        [emmitAlert]
    )

    return useMemo(
        () => ({
            emmitError,
            emmitSuccess,
            emmitAlert,
        }),
        [emmitError, emmitSuccess, emmitAlert]
    )
}
