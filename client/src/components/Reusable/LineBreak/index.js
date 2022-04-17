import { LineBreak } from "./LineBreakElements";
/*
    Props: {
        background: whiteBackground | blackBackground | blueBackground
    }
*/

const LineBreakComponent = ({ ...rest }) => {
    return <LineBreak {...rest}></LineBreak>;
};

export default LineBreakComponent;
