import { Column } from "./ColumnElements";

const ColumnComponent = ({ children, ...rest }) => {
    return <Column {...rest}>{children}</Column>;
};

export default ColumnComponent;
