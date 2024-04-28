import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useNotification } from '@common/hooks/useNotification'
import { writeData } from '@common/api'
import { ButtonContainer, Container, FormContainer, Imagem } from './styles'
import { PrimaryButton } from '@common/components/Button'
import { TextField } from '@mui/material'

type FormValues = {
    fullName: string
    email: string
    password: string
    phone: string
    birthday: string
    cpf: string
    cep: string
    address: string
    complement: string
    neighborhood: string
    city: string
    state: string
}

export const SignUpComponent = () => {
    const { emmitSuccess, emmitError } = useNotification()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>()

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        try {
            const resp = await writeData(data, 'users')
            if (resp?.status === 200) emmitSuccess('Dados adicionados com sucesso!')
        } catch (error) {
            emmitError('Erro ao adicionar documento!')
        }
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
                        style={{ width: '100%' }}
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
                        style={{ width: '100%' }}
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
                        style={{ width: '100%' }}
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
                        style={{ width: '100%' }}
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
                        style={{ width: '100%' }}
                        {...register('birthday', { required: false })}
                        margin="normal"
                    />
                    <TextField
                        label="CPF"
                        InputLabelProps={{ shrink: true }}
                        size="small"
                        variant="outlined"
                        style={{ width: '100%' }}
                        {...register('cpf', { required: false })}
                        margin="normal"
                    />
                    <TextField
                        label="CEP"
                        InputLabelProps={{ shrink: true }}
                        size="small"
                        variant="outlined"
                        style={{ width: '100%' }}
                        {...register('cep', { required: false })}
                        margin="normal"
                    />
                    <TextField
                        label="Rua/Avenida"
                        InputLabelProps={{ shrink: true }}
                        size="small"
                        variant="outlined"
                        style={{ width: '100%' }}
                        {...register('address', { required: false })}
                        margin="normal"
                    />
                    <TextField
                        label="Complemento"
                        InputLabelProps={{ shrink: true }}
                        size="small"
                        variant="outlined"
                        style={{ width: '100%' }}
                        {...register('complement', { required: false })}
                        margin="normal"
                    />
                    <TextField
                        label="Bairro"
                        InputLabelProps={{ shrink: true }}
                        size="small"
                        variant="outlined"
                        style={{ width: '100%' }}
                        {...register('neighborhood', { required: false })}
                        margin="normal"
                    />
                    <TextField
                        label="Cidade"
                        InputLabelProps={{ shrink: true }}
                        size="small"
                        variant="outlined"
                        style={{ width: '100%' }}
                        {...register('city', { required: false })}
                        margin="normal"
                    />
                    <TextField
                        label="Estado"
                        InputLabelProps={{ shrink: true }}
                        size="small"
                        variant="outlined"
                        style={{ width: '100%' }}
                        {...register('state', { required: false })}
                        margin="normal"
                    />
                    <ButtonContainer>
                        <PrimaryButton title="Cadastre-se" type="submit" />
                    </ButtonContainer>
                </form>
            </FormContainer>
        </Container>
    )
}
