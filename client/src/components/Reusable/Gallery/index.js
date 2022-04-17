import { useState } from "react";

import {
    Gallery,
    Title,
    ImagesContainer,
    Image,
    OpenedImage,
    OpenedImageOverlay,
} from "./GalleryElements";

const GalleryComponent = ({ images, ...rest }) => {
    const [openedImage, setOpenedImage] = useState(null);

    const closeImage = () => {
        setOpenedImage(null);
    };

    return (
        <>
            {images.length > 0 && (
                <Gallery openedImage={openedImage} id="gallery" {...rest}>
                    <Title>Gallery ({images.length})</Title>
                    <ImagesContainer>
                        {images.map((image, index) => (
                            <Image
                                src={image}
                                loading={"lazy"}
                                key={index}
                                onClick={() => {
                                    setOpenedImage(image);
                                }}
                            />
                        ))}
                    </ImagesContainer>
                    <OpenedImage openedImage={openedImage}>
                        <img src={openedImage} draggable={false} />
                    </OpenedImage>
                    <OpenedImageOverlay
                        openedImage={openedImage}
                        onClick={closeImage}
                    />
                </Gallery>
            )}
        </>
    );
};

export default GalleryComponent;
