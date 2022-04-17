import styled from "styled-components";

export const LineBreak = styled.hr`
    width: 50%;
    height: 5px;
    margin: 10px 0;
    background: ${({ whiteBackground }) =>
        whiteBackground
            ? ({ theme }) => theme.white
            : ({ blackBackground }) =>
                  blackBackground
                      ? ({ theme }) => theme.black
                      : ({ blueBackground }) =>
                            blueBackground
                                ? ({ theme }) => theme.blue
                                : "none"};
    border: none;
`;
