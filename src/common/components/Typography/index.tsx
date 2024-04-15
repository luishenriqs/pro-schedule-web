import {
    TitleContainer,
    Text_Primary_25_bold,
    Text_Primary_20_bold,
    Text_Primary_16_bold,
    Text_Primary_16_medium,
    Text_Secondary_25_bold,
    Text_Secondary_20_bold,
    Text_Secondary_16_bold,
    Text_Secondary_16_medium,
} from './styles'

export const TextPrimary25bold = ({ text }: any) => {
    return (
        <TitleContainer>
            <Text_Primary_25_bold>{text}</Text_Primary_25_bold>
        </TitleContainer>
    )
}

export const TextPrimary20bold = ({ text }: any) => {
    return (
        <TitleContainer>
            <Text_Primary_20_bold>{text}</Text_Primary_20_bold>
        </TitleContainer>
    )
}

export const TextPrimary16bold = ({ text }: any) => {
    return (
        <TitleContainer>
            <Text_Primary_16_bold>{text}</Text_Primary_16_bold>
        </TitleContainer>
    )
}

export const TextPrimary16medium = ({ text }: any) => {
    return (
        <TitleContainer>
            <Text_Primary_16_medium>{text}</Text_Primary_16_medium>
        </TitleContainer>
    )
}

export const TextSecondary25bold = (text: any) => {
    return (
        <TitleContainer>
            <Text_Secondary_25_bold>{text}</Text_Secondary_25_bold>
        </TitleContainer>
    )
}

export const TextSecondary20bold = ({ text }: any) => {
    return (
        <TitleContainer>
            <Text_Secondary_20_bold>{text}</Text_Secondary_20_bold>
        </TitleContainer>
    )
}

export const TextSecondary16bold = ({ text }: any) => {
    return (
        <TitleContainer>
            <Text_Secondary_16_bold>{text}</Text_Secondary_16_bold>
        </TitleContainer>
    )
}

export const TextSecondary16medium = ({ text }: any) => {
    return (
        <TitleContainer>
            <Text_Secondary_16_medium>{text}</Text_Secondary_16_medium>
        </TitleContainer>
    )
}
