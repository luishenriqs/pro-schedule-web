import React, { useState, useEffect } from 'react'
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

    const images = [
        require('../../../../assets/photos/clinic/main.png'),
        require('../../../../assets/photos/clinic/secondary.png'),
        require('../../../../assets/photos/clinic/tertiary.png'),
    ]

    const imagesMobile = [
        require('../../../../assets/photos/clinic/mainMobile.png'),
        require('../../../../assets/photos/clinic/secondaryMobile.png'),
        require('../../../../assets/photos/clinic/tertiaryMobile.png'),
    ]

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
