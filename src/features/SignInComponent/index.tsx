import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { useForm, SubmitHandler } from 'react-hook-form'
import { PrimaryButton } from '@common/components/Button'
import { TextField } from '@mui/material'
import { PrimaryButtonIcon, SecondaryButtonIcon } from '@common/components/ButtonIcon'
import { TextPrimary14_500 } from '@common/components/Typography'
import { Container, Imagem, SignUpContainer } from './styles'

type FormValues = {
    email: string
    password: string
}

export const SignInComponent = () => {
    const router = useRouter()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>()

    const [submitting, setSubmitting] = useState(false)

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        setSubmitting(true)
        // Aqui você pode adicionar lógica para autenticação do usuário
        console.log(data)
        setSubmitting(false)
    }

    return (
        <Container>
            <Imagem src={require('../../../assets/pro-schedule-logo.png')} alt={'Pro-Schedule-logo'} />
            <form onSubmit={handleSubmit(onSubmit)}>
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
                <PrimaryButton title="Login" type="submit" />
            </form>
            <SignUpContainer>
                <TextPrimary14_500 text="Ainda não possui uma conta?" />
                <SecondaryButtonIcon title="Cadastre-se" size="medium" onClick={() => router.push('/SignUp')} />
            </SignUpContainer>
            <PrimaryButtonIcon title="Recuperar senha" size="small" onClick={() => console.log('Recuperar senha')} />
        </Container>
    )
}
