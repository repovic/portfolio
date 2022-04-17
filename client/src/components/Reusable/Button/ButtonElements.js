import styled from "styled-components";

export const Button = styled.a`
    position: relative;

    width: auto;

    font-size: 1.1rem;
    text-align: center;

    color: ${({ whiteText }) =>
        whiteText
            ? ({ theme }) => theme.white
            : ({ blackText }) =>
                  blackText
                      ? ({ theme }) => theme.black
                      : ({ blueText }) =>
                            blueText ? ({ theme }) => theme.blue : "none"};
    text-decoration: none;

    background: ${({ whiteBackground }) =>
        whiteBackground
            ? ({ theme }) => theme.white
            : ({ blackBackground }) =>
                  blackBackground
                      ? ({ theme }) => theme.black
                      : ({ blueBackground }) =>
                            blueBackground
                                ? ({ theme }) => theme.blue
                                : ({ darkBackground }) =>
                                      darkBackground
                                          ? ({ theme }) => theme.dark
                                          : "none"};

    padding: ${({ small }) =>
        small
            ? "12px 24px"
            : ({ medium }) =>
                  medium
                      ? "15px 30px"
                      : ({ large }) => (large ? "20px 40px" : "none")};

    border: 1px
        ${({ whiteBorder }) =>
            whiteBorder
                ? ({ theme }) => theme.white
                : ({ blackBorder }) =>
                      blackBorder
                          ? ({ theme }) => theme.black
                          : ({ blueBorder }) =>
                                blueBorder ? ({ theme }) => theme.blue : "none"}
        solid;
    border-radius: ${({ borderRounded }) => (borderRounded ? "15px" : "0")};

    outline: none;
    width: 100%;

    transition: 0.5s all ease-in-out;
    cursor: pointer;

    &:hover {
        color: ${({ whiteTextHover }) =>
            whiteTextHover
                ? ({ theme }) => theme.white
                : ({ blackTextHover }) =>
                      blackTextHover
                          ? ({ theme }) => theme.black
                          : ({ blueTextHover }) =>
                                blueTextHover ? ({ theme }) => theme.blue : ""};

        background: ${({ whiteBackgroundHover }) =>
            whiteBackgroundHover
                ? ({ theme }) => theme.white
                : ({ blackBackgroundHover }) =>
                      blackBackgroundHover
                          ? ({ theme }) => theme.black
                          : ({ blueBackgroundHover }) =>
                                blueBackgroundHover
                                    ? ({ theme }) => theme.blue
                                    : ""};

        border: 1px
            ${({ whiteBorderHover }) =>
                whiteBorderHover
                    ? ({ theme }) => theme.white
                    : ({ blackBorderHover }) =>
                          blackBorderHover
                              ? ({ theme }) => theme.black
                              : ({ blueBorderHover }) =>
                                    blueBorderHover
                                        ? ({ theme }) => theme.blue
                                        : ""};
    }

    @media screen and (max-width: 1000px) {
        font-size: 1rem;
        display: ${({ hideOnMobile }) => (hideOnMobile ? "none" : "block")};
    }
`;
