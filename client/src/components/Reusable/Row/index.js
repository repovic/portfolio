import { Row } from "./RowElements";

const RowComponent = ({ children, ...rest }) => {
    return <Row {...rest}>{children}</Row>;
};

export default RowComponent;
