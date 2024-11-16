import React from 'react'
import mainLogo from '../../../assets/Massaro/main-logo-removebg.png'
import { useForm, SubmitHandler } from 'react-hook-form'
import { v4 as uuidv4 } from 'uuid'
import { useRouter } from 'next/router'
import { useNotification } from '@common/hooks/useNotification'
import { CreateAuth, UseWriteData } from '@common/api'
import { FilledPrimaryButton } from '@common/components/Button'
import { TextField } from '@mui/material'
import { FormValues } from '@common/models'
import { GenosPrimaryButtonText } from '@common/components/ButtonText'
import { ButtonContainer, Container, Imagem } from './styles'

export const SignUpComponent = () => {
    const router = useRouter()
    const { emmitSuccess, emmitError } = useNotification()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>()

    const handleSignUp: SubmitHandler<FormValues> = async (payload) => {
        try {
            payload.isOwner = false
            payload.isManager = false
            payload.isAdmin = false
            payload.id = uuidv4()
            const resp = await CreateAuth(payload) //==> Cria novo usuário no firebase/auth

            if (resp.status === 201) {
                const respData = await UseWriteData(payload, 'users') //==> Cria novo usuário no firestore
                if (respData?.status === 201) emmitSuccess(resp?.message)
                if (respData?.status !== 201) emmitError(resp?.message)
                router.push('/SignIn')
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
            {/* <FormContainer> */}
            <form onSubmit={handleSubmit(handleSignUp)}>
                <TextField
                    label="Primeiro Nome"
                    InputLabelProps={{ shrink: true }}
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
                    InputLabelProps={{ shrink: true }}
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
                    InputLabelProps={{ shrink: true }}
                    size="small"
                    variant="outlined"
                    style={{ width: '260px' }}
                    {...register('cpf', { required: false })}
                    margin="normal"
                />
                <TextField
                    label="Telefone"
                    placeholder="16999998888"
                    InputLabelProps={{ shrink: true }}
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
                    InputLabelProps={{ shrink: true }}
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
                    InputLabelProps={{ shrink: true }}
                    type="password"
                    size="small"
                    variant="outlined"
                    style={{ width: '260px' }}
                    {...register('password', { required: true })}
                    error={!!errors.password}
                    helperText={errors.password && 'Senha é obrigatória'}
                    margin="normal"
                />

                {/* Options for a complete form */}
                {/* <TextField
                        label="Data de Nascimento"
                        InputLabelProps={{ shrink: true }}
                        type="date"
                        size="small"
                        variant="outlined"
                        style={{ width: '260px' }}
                        {...register('birthday', { required: false })}
                        margin="normal"
                    />
                    <TextField
                        label="CEP"
                        InputLabelProps={{ shrink: true }}
                        size="small"
                        variant="outlined"
                        style={{ width: '260px' }}
                        {...register('cep', { required: false })}
                        margin="normal"
                    />
                    <TextField
                        label="Rua/Avenida"
                        InputLabelProps={{ shrink: true }}
                        size="small"
                        variant="outlined"
                        style={{ width: '260px' }}
                        {...register('address', { required: false })}
                        margin="normal"
                    />
                    <TextField
                        label="Complemento"
                        InputLabelProps={{ shrink: true }}
                        size="small"
                        variant="outlined"
                        style={{ width: '260px' }}
                        {...register('complement', { required: false })}
                        margin="normal"
                    />
                    <TextField
                        label="Bairro"
                        InputLabelProps={{ shrink: true }}
                        size="small"
                        variant="outlined"
                        style={{ width: '260px' }}
                        {...register('neighborhood', { required: false })}
                        margin="normal"
                    />
                    <TextField
                        label="Cidade"
                        InputLabelProps={{ shrink: true }}
                        size="small"
                        variant="outlined"
                        style={{ width: '260px' }}
                        {...register('city', { required: false })}
                        margin="normal"
                    />
                    <TextField
                        label="Estado"
                        InputLabelProps={{ shrink: true }}
                        size="small"
                        variant="outlined"
                        style={{ width: '260px' }}
                        {...register('state', { required: false })}
                        margin="normal"
                    /> */}
                <ButtonContainer>
                    <FilledPrimaryButton title="Cadastre-se" type="submit" />
                </ButtonContainer>
            </form>
            {/* </FormContainer> */}
            <GenosPrimaryButtonText title="Voltar para agenda" size="small" onClick={() => router.push('/')} />
        </Container>
    )
}
