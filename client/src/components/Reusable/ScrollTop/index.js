import { useEffect, useState } from "react";

import { ScrollTop } from "./ScrollTopElements";

import { AngleUpIcon } from "../../../svg";

const ScrollTopComponent = (props) => {
    const [isShown, setIsShown] = useState(false);

    useEffect(() => {
        window.addEventListener("scroll", (e) => {
            if (window.pageYOffset > window.innerHeight / 2) {
                setIsShown(true);
            } else {
                setIsShown(false);
            }
        });
    }, []);

    return (
        <ScrollTop
            isShown={isShown}
            onClick={() => {
                document.body.scrollTop = 0;
                document.documentElement.scrollTop = 0;
            }}
            {...props}
        >
            <AngleUpIcon />
        </ScrollTop>
    );
};

export default ScrollTopComponent;
