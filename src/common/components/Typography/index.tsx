import {
    TitleContainer,
    GenosPrimary16_500,
    GenosSecondary16_500,
    GenosPrimary20_500,
    GenosSecondary20_500,
    QuestrialPrimary16_500,
    QuestrialSecondary16_500,
    QuestrialPrimary20_500,
    QuestrialSecondary20_500,
} from './styles'


// PRIMARY
export const Genos_Primary_20_500 = ({ text }: any) => {
    return (
        <TitleContainer>
            <GenosPrimary20_500>{text}</GenosPrimary20_500>
        </TitleContainer>
    )
}

export const Questrial_Primary_20_500 = ({ text }: any) => {
    return (
        <TitleContainer>
            <QuestrialPrimary20_500>{text}</QuestrialPrimary20_500>
        </TitleContainer>
    )
}

export const Genos_Primary_16_500 = ({ text }: any) => {
    return (
        <TitleContainer>
            <GenosPrimary16_500>{text}</GenosPrimary16_500>
        </TitleContainer>
    )
}

export const Questrial_Primary_16_500 = ({ text }: any) => {
    return (
        <TitleContainer>
            <QuestrialPrimary16_500>{text}</QuestrialPrimary16_500>
        </TitleContainer>
    )
}

// SECONDARY
export const Genos_Secondary_20_500 = ({ text }: any) => {
    return (
        <TitleContainer>
            <GenosSecondary20_500>{text}</GenosSecondary20_500>
        </TitleContainer>
    )
}

export const Questrial_Secondary_20_500 = ({ text }: any) => {
    return (
        <TitleContainer>
            <QuestrialSecondary20_500>{text}</QuestrialSecondary20_500>
        </TitleContainer>
    )
}

export const Genos_Secondary_16_500 = ({ text }: any) => {
    return (
        <TitleContainer>
            <GenosSecondary16_500>{text}</GenosSecondary16_500>
        </TitleContainer>
    )
}

export const Questrial_Secondary_16_500 = ({ text }: any) => {
    return (
        <TitleContainer>
            <QuestrialSecondary16_500>{text}</QuestrialSecondary16_500>
        </TitleContainer>
    )
}
