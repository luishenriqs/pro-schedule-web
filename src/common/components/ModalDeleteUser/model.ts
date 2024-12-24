import { UserProps } from '@common/models'

export type ModalProps = {
    open: boolean
    userToBeDeleted: UserProps
    handleClose: () => void
}
