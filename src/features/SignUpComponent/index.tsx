import React, { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Container, FormContainer, Imagem } from './styles'
import { PrimaryButton } from '@common/components/Button'
import { TextField } from '@mui/material'

type FormValues = {
    fullName: string
    email: string
    password: string
    phone: string
    dob: string
    cpf: string
    cep: string
    address: string
}

export const SignUpComponent = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>()

    const [submitting, setSubmitting] = useState(false)

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        setSubmitting(true)
        // Aqui você pode adicionar lógica para criação do usuário
        console.log(data)
        setSubmitting(false)
    }

    return (
        <Container>
            <Imagem src={require('../../../assets/pro-schedule-logo.png')} alt={'Pro-Schedule-logo'} />
            <FormContainer>
                <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
                    <TextField
                        label="Nome Completo"
                        InputLabelProps={{ shrink: true }}
                        size="small"
                        variant="outlined"
                        style={{ width: '250px' }}
                        {...register('fullName', { required: true })}
                        error={!!errors.fullName}
                        helperText={errors.fullName && 'Nome é obrigatório'}
                        margin="normal"
                    />
                    <TextField
                        label="Email"
                        InputLabelProps={{ shrink: true }}
                        size="small"
                        variant="outlined"
                        style={{ width: '250px' }}
                        {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
                        error={!!errors.email}
                        helperText={errors.email && 'Email é obrigatório'}
                        margin="normal"
                    />
                    <TextField
                        label="Senha"
                        InputLabelProps={{ shrink: true }}
                        type="password"
                        size="small"
                        variant="outlined"
                        style={{ width: '250px' }}
                        {...register('password', { required: true })}
                        error={!!errors.password}
                        helperText={errors.password && 'Senha é obrigatória'}
                        margin="normal"
                    />
                    <TextField
                        label="Telefone"
                        InputLabelProps={{ shrink: true }}
                        size="small"
                        variant="outlined"
                        style={{ width: '250px' }}
                        {...register('phone', { required: true })}
                        error={!!errors.phone}
                        helperText={errors.phone && 'Telefone é obrigatório'}
                        margin="normal"
                    />
                    <TextField
                        label="Data de Nascimento"
                        InputLabelProps={{ shrink: true }}
                        type="date"
                        size="small"
                        variant="outlined"
                        style={{ width: '250px' }}
                        {...register('dob', { required: false })}
                        margin="normal"
                    />
                    <TextField
                        label="CPF"
                        InputLabelProps={{ shrink: true }}
                        size="small"
                        variant="outlined"
                        style={{ width: '250px' }}
                        {...register('cpf', { required: false })}
                        margin="normal"
                    />
                    <TextField
                        label="CEP"
                        InputLabelProps={{ shrink: true }}
                        size="small"
                        variant="outlined"
                        style={{ width: '250px' }}
                        {...register('cep', { required: false })}
                        margin="normal"
                    />
                    <TextField
                        label="Endereço"
                        InputLabelProps={{ shrink: true }}
                        size="small"
                        variant="outlined"
                        style={{ width: '250px' }}
                        {...register('address', { required: false })}
                        margin="normal"
                    />
                    <TextField
                        label="Endereço"
                        InputLabelProps={{ shrink: true }}
                        size="small"
                        variant="outlined"
                        style={{ width: '250px' }}
                        {...register('address', { required: false })}
                        margin="normal"
                    />

                    <PrimaryButton title="Cadastre-se" type="submit" />
                </form>
            </FormContainer>
        </Container>
    )
}
