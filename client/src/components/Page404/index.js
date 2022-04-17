import { Page404, Container, Message } from "./Page404Elements";
import { _404Illustration } from "../../svg";
import { Button } from "..";

const Page404Component = () => {
    return (
        <Page404>
            <Container>
                <img src="/assets/illustrations/404Illustration.svg" />
                <Message>
                    Sorry, the content you requested was not found.
                </Message>
                <Button
                    label="Go Back"
                    link="/"
                    medium
                    whiteText
                    blueBackground
                    borderRounded
                />
            </Container>
        </Page404>
    );
};

export default Page404Component;
