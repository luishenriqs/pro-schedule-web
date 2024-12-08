import React from 'react'
import { useRouter } from 'next/router'
import mainLogo from '../../../assets/Massaro/main-logo-removebg.png'
import { useForm, SubmitHandler } from 'react-hook-form'
import { v4 as uuidv4 } from 'uuid'
import { useNotification } from '@common/hooks/useNotification'
import { CreateAuth, WriteData } from '@common/api'
import { FilledPrimaryButton } from '@common/components/Button'
import { TextField } from '@mui/material'
import { UserSighUpProps } from '@common/models'
import { GenosPrimaryButtonText } from '@common/components/ButtonText'
import { ButtonContainer, Container, Imagem } from './styles'

export const SignUpComponent = () => {
    const router = useRouter()
    const { emmitSuccess, emmitError } = useNotification()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<UserSighUpProps>()

    const handleSignUp: SubmitHandler<UserSighUpProps> = async (payload) => {
        try {
            payload.isManager = false
            payload.isAdmin = false
            payload.id = uuidv4()
            payload.credits = 0
            const resp = await CreateAuth(payload) //==> Cria novo usuário no firebase/auth

            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { password, ...payloadWithoutPassword } = payload

            if (resp.status === 201) {
                const respData = await WriteData(payloadWithoutPassword, 'users') //==> Cria novo usuário no firestore
                if (respData?.status === 201) emmitSuccess(resp?.message)
                if (respData?.status !== 201) emmitError(resp?.message)
                router.push('/')
            } else {
                emmitError('message: ' + `${resp.message}`)
            }
        } catch (error) {
            emmitError(`${error}`)
        }
    }

    return (
        <Container>
            <Imagem src={mainLogo} alt="Main-logo" />
            <form onSubmit={handleSubmit(handleSignUp)}>
                <TextField
                    label="Primeiro Nome"
                    slotProps={{
                        inputLabel: {
                            shrink: true,
                        },
                    }}
                    size="small"
                    variant="outlined"
                    style={{ width: '260px' }}
                    {...register('firstName', { required: true })}
                    error={!!errors.firstName}
                    helperText={errors.firstName && 'O primeiro nome é obrigatório'}
                    margin="normal"
                />
                <TextField
                    label="Último Nome"
                    slotProps={{
                        inputLabel: {
                            shrink: true,
                        },
                    }}
                    size="small"
                    variant="outlined"
                    style={{ width: '260px' }}
                    {...register('lastName', { required: true })}
                    error={!!errors.lastName}
                    helperText={errors.lastName && 'O último nome é obrigatório'}
                    margin="normal"
                />
                <TextField
                    label="CPF"
                    placeholder="12345678910"
                    slotProps={{
                        inputLabel: {
                            shrink: true,
                        },
                    }}
                    size="small"
                    variant="outlined"
                    style={{ width: '260px' }}
                    {...register('cpf', { required: false })}
                    margin="normal"
                />
                <TextField
                    label="Telefone"
                    placeholder="16999998888"
                    slotProps={{
                        inputLabel: {
                            shrink: true,
                        },
                    }}
                    size="small"
                    variant="outlined"
                    style={{ width: '260px' }}
                    {...register('phone', { required: true })}
                    error={!!errors.phone}
                    helperText={errors.phone && 'Telefone é obrigatório'}
                    margin="normal"
                />
                <TextField
                    label="Email"
                    placeholder="exemplo@email.com"
                    slotProps={{
                        inputLabel: {
                            shrink: true,
                        },
                    }}
                    size="small"
                    variant="outlined"
                    style={{ width: '260px' }}
                    {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
                    error={!!errors.email}
                    helperText={errors.email && 'Email é obrigatório'}
                    margin="normal"
                />
                <TextField
                    label="Senha"
                    placeholder="******"
                    slotProps={{
                        inputLabel: {
                            shrink: true,
                        },
                    }}
                    type="password"
                    size="small"
                    variant="outlined"
                    style={{ width: '260px' }}
                    {...register('password', { required: true })}
                    error={!!errors.password}
                    helperText={errors.password && 'Senha é obrigatória'}
                    margin="normal"
                />
                <ButtonContainer>
                    <FilledPrimaryButton title="Cadastre-se" type="submit" />
                </ButtonContainer>
            </form>
            <GenosPrimaryButtonText title="Voltar para agenda" size="small" onClick={() => router.push('/')} />
        </Container>
    )
}
