import {
    ConfirmBoxOverlay,
    ConfirmBoxContainer,
    Message,
    FormGroup,
} from "./ConfirmBoxElements";
import { Button } from "../";

const ConfirmBox = ({ message, cb, isShown, closeConfirmBox }) => {
    return (
        <>
            <ConfirmBoxOverlay isShown={isShown} onClick={closeConfirmBox} />
            <ConfirmBoxContainer isShown={isShown}>
                <Message>{message}</Message>

                <FormGroup>
                    <Button
                        label="Confirm"
                        onClick={() => {
                            cb();
                            closeConfirmBox();
                        }}
                        medium
                        whiteText
                        blueBackground
                        borderRounded
                    />
                    <Button
                        label="Cancel"
                        onClick={closeConfirmBox}
                        medium
                        whiteText
                        borderRounded
                    />
                </FormGroup>
            </ConfirmBoxContainer>
        </>
    );
};

export default ConfirmBox;
