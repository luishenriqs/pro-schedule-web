import React, { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useRouter } from 'next/router'
import { useNotification } from '@common/hooks/useNotification'
import { RecoverPassword, SignIn } from '@common/api'
import { FilledPrimaryButton } from '@common/components/Button'
import { TextField } from '@mui/material'
import { PrimaryButtonText, SecondaryButtonText } from '@common/components/ButtonText'
import { Questrial_Primary_16_500 } from '@common/components/Typography'
import { Container, Imagem, SignUpContainer } from './styles'

type FormValues = {
    email: string
    password: string
}

export const SignInComponent = () => {
    const router = useRouter()
    const { emmitSuccess, emmitError, emmitAlert } = useNotification()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>()

    const [email, setEmail] = useState<string>('')

    const handleSignIn: SubmitHandler<FormValues> = async (data) => {
        try {
            const resp = await SignIn(data) //==> Valida autenticação do usuário
            if (resp?.status === 200) emmitSuccess(resp?.message)
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
            <Imagem src={require('../../../assets/pro-schedule-logo.png')} alt={'Pro-Schedule-logo'} />
            <form onSubmit={handleSubmit(handleSignIn)}>
                <TextField
                    label="Email"
                    InputLabelProps={{ shrink: true }}
                    type="email"
                    size="small"
                    variant="outlined"
                    style={{ width: '250px' }}
                    {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
                    error={!!errors.email}
                    helperText={errors.email && 'Email inválido'}
                    margin="normal"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    label="Senha"
                    InputLabelProps={{ shrink: true }}
                    type="password"
                    size="small"
                    variant="outlined"
                    style={{ width: '250px' }}
                    {...register('password', { required: true, minLength: 6 })}
                    error={!!errors.password}
                    helperText={
                        errors.password &&
                        (errors.password.type === 'required'
                            ? 'Senha é obrigatória'
                            : 'Senha deve ter no mínimo 6 caracteres')
                    }
                />
                <FilledPrimaryButton title="Login" type="submit" />
            </form>
            <SignUpContainer>
                <Questrial_Primary_16_500 text="Ainda não possui uma conta?" />
                <SecondaryButtonText title="Cadastre-se" size="medium" onClick={() => router.push('/SignUp')} />
            </SignUpContainer>
            <PrimaryButtonText title="Recuperar senha" size="small" onClick={() => handleRecoverPassword()} />
        </Container>
    )
}
