import React, { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Container, Imagem } from './styles'
import { PrimaryButton } from '@common/components/Button'
import { TextField } from '@mui/material'

type FormValues = {
  email: string
  password: string
}

export const SignInComponent = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>()
    const [submitting, setSubmitting] = useState(false)
  
    const onSubmit: SubmitHandler<FormValues> = async (data) => {
      setSubmitting(true);
      // Aqui você pode adicionar lógica para autenticação do usuário
      console.log(data);
      setSubmitting(false)
    }
  
    return (
        <Container>
            <Imagem
                src={require('../../../assets/pro-schedule-logo.png')}
                alt={'Pro-Schedule-logo'}
            />
            <form onSubmit={handleSubmit(onSubmit)}>                
                <TextField
                    label="Email"
                    type="email"
                    {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
                    error={!!errors.email}
                    helperText={errors.email && "Email inválido"}
                    margin="normal"
                />
                <TextField
                    label="Senha"
                    type="password"
                    {...register("password", { required: true, minLength: 6 })}
                    error={!!errors.password}
                    helperText={errors.password && (errors.password.type === "required" ? "Senha é obrigatória" : "Senha deve ter no mínimo 6 caracteres")}
                    margin="normal"
                />
                <PrimaryButton title='Entrar' type="submit"/>
            </form>
        </Container>
    )
}