import Link from "next/link";

import { Button } from "./ButtonElements";
/*
    Props: {
        size: small | medium | large,
        text: whiteText | blackText | blueText,
        background: whiteBackground | blackBackground | blueBackground | darkBackground,
        border: whiteBorder | blackBorder | blueBorder,
        borderRounded: true | false,

        hover: {
            text: whiteTextHover | blackTextHover | blueTextHover,
            background: whiteBackgroundHover | blackBackgroundHover | blueBackgroundHover,
            border: whiteBorderHover | blackBorderHover | blueBorderHover,
        },

        hideOnMobile,
    }
*/

const ButtonComponent = ({ label, link, ...rest }) => {
    if (link) {
        return (
            <Link href={link}>
                <Button {...rest}>{label}</Button>
            </Link>
        );
    }
    return <Button {...rest}>{label}</Button>;
};

export default ButtonComponent;
