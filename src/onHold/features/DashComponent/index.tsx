import React, { useState } from 'react'
import Header from '@common/components/Header'
import modelOffice from '../../../assets/photos/clinic/model-office-1x1.png'
import serviceTitle from '../../../assets/photos/clinic/serviceTitle1.png'
import serviceTitle2 from '../../../assets/photos/clinic/serviceTitle2.png'
import serviceTitle3 from '../../../assets/photos/clinic/serviceTitle3.png'
import { LoadingComponent } from '@common/components/Loading'
import { Banner } from '@common/components/banner'
import { OutlinePrimaryButton } from '@common/components/Button'
import { PrimaryButtonIcon } from '@common/components/ButtonIcon'
import { Genos_Primary_28_500, Genos_Primary_34_500, Questrial_Primary_20_500 } from '@common/components/Typography'
import {
    Container,
    DashContent,
    Imagem,
    PresentationContainer,
    MessageMobileContainer,
    MessageContainer,
    TextContent,
    MessageTitleContainer,
    MessageContent,
    ServicesContainer,
    Card,
} from './styles'

export const DashComponent = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [openDescription, setOpenDescription] = useState(false)

    const message =
        '"Vejo os tratamentos estéticos como um marco na vida de qualquer pessoa, um verdadeiro divisor de águas. Os pacientes geralmente chegam tristes, sem auto-estima; após nossos tratamentos, parecem outras pessoas, muito mais felizes e confiantes! É inspirador e inegavelmente muito gratificante."'

    const invite =
        'A dra. Joyce atualmente atende presencialmente em sua clínica, mas também realiza avaliações on-line.'

    setTimeout(() => {
        setIsLoading(false)
    }, 100)

    return (
        <>
            {isLoading ? (
                <LoadingComponent />
            ) : (
                <Container>
                    <Header />
                    <DashContent>
                        <Banner />
                        <PresentationContainer>
                            <Imagem src={modelOffice} alt="model office" />
                            <MessageMobileContainer>
                                <MessageTitleContainer>
                                    <Genos_Primary_28_500 text="Dra. Joyce Schwartz" />
                                    {openDescription ? (
                                        <PrimaryButtonIcon
                                            icon={'KeyboardArrowUpOutlined'}
                                            onClick={() => setOpenDescription(false)}
                                            style={{
                                                marginLeft: '10px',
                                            }}
                                        />
                                    ) : (
                                        <PrimaryButtonIcon
                                            icon={'KeyboardArrowDown'}
                                            onClick={() => setOpenDescription(true)}
                                            style={{
                                                marginLeft: '10px',
                                            }}
                                        />
                                    )}
                                </MessageTitleContainer>
                                {openDescription && (
                                    <MessageContent>
                                        <TextContent>
                                            <Questrial_Primary_20_500 text={message} />
                                        </TextContent>
                                        <TextContent>
                                            <Questrial_Primary_20_500 text={invite} />
                                        </TextContent>
                                    </MessageContent>
                                )}
                                <OutlinePrimaryButton title="Saiba mais" />
                            </MessageMobileContainer>
                            <MessageContainer>
                                <Genos_Primary_34_500 text="Dra. Joyce Schwartz" />
                                <TextContent>
                                    <Questrial_Primary_20_500 text={message} />
                                </TextContent>
                                <TextContent>
                                    <Questrial_Primary_20_500 text={invite} />
                                </TextContent>
                                <OutlinePrimaryButton title="Saiba mais" />
                            </MessageContainer>
                        </PresentationContainer>
                        <ServicesContainer>
                            <Card>
                                <Imagem src={serviceTitle} alt="Service Title" />
                            </Card>
                            <Card>
                                <Imagem src={serviceTitle2} alt="Service Title" />
                            </Card>
                            <Card>
                                <Imagem src={serviceTitle3} alt="Service Title" />
                            </Card>
                        </ServicesContainer>
                    </DashContent>
                </Container>
            )}
        </>
    )
}
