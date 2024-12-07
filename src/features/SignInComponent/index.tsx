import React, { useState } from 'react'
import { useRouter } from 'next/router'
import mainLogo from '../../../assets/Massaro/main-logo-removebg.png'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useNotification } from '@common/hooks/useNotification'
import { useUser } from '@common/hooks/contexts/UserContext'
import { RecoverPassword, UseSignIn } from '@common/api'
import { FilledPrimaryButton } from '@common/components/Button'
import { TextField } from '@mui/material'
import { GenosPrimaryButtonText, GenosSecondaryButtonText } from '@common/components/ButtonText'
import { Questrial_Secondary_16_500 } from '@common/components/Typography'
import { UserSighInProps } from '@common/models'
import { Container, Imagem, SignUpContainer } from './styles'

export const SignInComponent = () => {
    const router = useRouter()
    const { emmitSuccess, emmitError, emmitAlert } = useNotification()
    const { saveUser } = useUser()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<UserSighInProps>()

    const [email, setEmail] = useState<string>('')

    const handleSignIn: SubmitHandler<UserSighInProps> = async (data) => {
        try {
            const resp = await UseSignIn(data) //==> Valida autenticação do usuário
            if (resp?.status === 200) {
                if (resp.user) saveUser(resp.user) // Persiste usuário logado no contexto
                emmitSuccess(resp?.message)
                if (resp.user?.isAdmin) {
                    router.push('/MyAgenda')
                } else {
                    router.push('/')
                }
            }
            if (resp?.status !== 200) emmitError(resp?.message)
        } catch (error) {
            emmitError(`${error}`)
        }
    }

    const handleRecoverPassword = async () => {
        if (!email) {
            emmitAlert('Informe seu email!')
        } else {
            const resp = await RecoverPassword(email)
            if (resp?.status === 200) emmitSuccess(resp?.message)
            if (resp?.status !== 200) emmitError(resp?.message)
        }
    }

    return (
        <Container>
            <Imagem src={mainLogo} alt="Main-logo" />
            <form onSubmit={handleSubmit(handleSignIn)}>
                <TextField
                    label="Email"
                    slotProps={{
                        inputLabel: {
                            shrink: true,
                        },
                    }}
                    type="email"
                    size="small"
                    variant="outlined"
                    style={{ width: '260px' }}
                    {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
                    error={!!errors.email}
                    helperText={errors.email && 'Email inválido'}
                    margin="normal"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    label="Senha"
                    slotProps={{
                        inputLabel: {
                            shrink: true,
                        },
                    }}
                    type="password"
                    size="small"
                    variant="outlined"
                    style={{ width: '260px' }}
                    {...register('password', { required: true, minLength: 6 })}
                    error={!!errors.password}
                    helperText={
                        errors.password &&
                        (errors.password.type === 'required'
                            ? 'Senha é obrigatória'
                            : 'Senha deve ter no mínimo 6 caracteres')
                    }
                    margin="normal"
                />
                <FilledPrimaryButton title="Login" type="submit" />
            </form>
            <SignUpContainer>
                <Questrial_Secondary_16_500 text="Ainda não possui uma conta?" />
                <GenosSecondaryButtonText title="Cadastre-se" size="medium" onClick={() => router.push('/SignUp')} />
            </SignUpContainer>
            <GenosPrimaryButtonText title="Recuperar senha" size="small" onClick={() => handleRecoverPassword()} />
            <GenosPrimaryButtonText title="Voltar para agenda" size="small" onClick={() => router.push('/')} />
        </Container>
    )
}
