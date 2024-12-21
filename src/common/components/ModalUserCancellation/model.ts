import { ScheduleObjectProps } from '@common/models'

export type ModalProps = {
    open: boolean
    payload: ScheduleObjectProps
    handleClose: () => void
}
