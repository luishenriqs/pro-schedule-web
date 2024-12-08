import React, { useState, useEffect } from 'react'
import main from '../../../../assets/clinic/banners/main.png'
import secondary from '../../../../assets/clinic/banners/secondary.png'
import tertiary from '../../../../assets/clinic/banners/tertiary.png'
import mainMobile from '../../../../assets/clinic/banners/mainMobile.png'
import secondaryMobile from '../../../../assets/clinic/banners/secondaryMobile.png'
import tertiaryMobile from '../../../../assets/clinic/banners/tertiaryMobile.png'
import { BackgroundButtonIcon } from '../ButtonIcon'
import { BannerContainer, Image1, Image2 } from './styles'

export const Banner: React.FC = () => {
    const [currentImage, setCurrentImage] = useState<number>(0)

    useEffect(() => {
        const timer = setInterval(() => {
            nextImage()
        }, 15000)
        return () => clearInterval(timer)
    }, [currentImage])

    const nextImage = () => {
        setCurrentImage((prevImage) => (prevImage + 1) % 3)
    }

    const prevImage = () => {
        setCurrentImage((prevImage) => (prevImage === 0 ? 2 : prevImage - 1))
    }

    const images = [main, secondary, tertiary]

    const imagesMobile = [mainMobile, secondaryMobile, tertiaryMobile]

    return (
        <BannerContainer>
            <BackgroundButtonIcon
                icon={'ArrowBackIosOutlined'}
                onClick={prevImage}
                style={{
                    background: 'rgba(0, 0, 0, 0.1)',
                    marginRight: '-60px',
                    marginTop: '-50px',
                }}
            />
            <>
                <Image1 src={images[currentImage]} alt="Banner Image" />
                <Image2 src={imagesMobile[currentImage]} alt="Banner Image" />
            </>
            <BackgroundButtonIcon
                icon={'ArrowForwardIosOutlined'}
                onClick={prevImage}
                style={{
                    background: 'rgba(0, 0, 0, 0.1)',
                    marginLeft: '-60px',
                    marginTop: '-50px',
                }}
            />
        </BannerContainer>
    )
}
