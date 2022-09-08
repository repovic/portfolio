import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import {
    SearchIcon,
    SearchInput,
    SearchMenu,
    SearchMenuContainer,
    SearchMenuOverlay,
} from "./SearchMenuElements";

const SearchMenuComponent = ({
    isSearchMenuOpen,
    closeSearchMenu,
    ...rest
}) => {
    const [searchQuery, setSearchQuery] = useState("");

    const router = useRouter();

    useEffect(() => {
        if (isSearchMenuOpen) {
            document.getElementById("search-input").focus();
        } else {
            document.getElementById("search-input").blur();
        }
    }, [isSearchMenuOpen]);
    return (
        <>
            <SearchMenuOverlay
                isSearchMenuOpen={isSearchMenuOpen}
                onClick={closeSearchMenu}
            />
            <SearchMenu isSearchMenuOpen={isSearchMenuOpen} {...rest}>
                <SearchMenuContainer>
                    <SearchInput
                        placeholder="Search..."
                        id="search-input"
                        inputMode="search"
                        autoComplete="off"
                        autoCorrect="off"
                        autoCapitalize="off"
                        spellCheck="false"
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                        }}
                    />
                    <input
                        type="submit"
                        hidden
                        onClick={(e) => {
                            e.preventDefault();
                            setSearchQuery("");
                            closeSearchMenu();
                            router.push({
                                pathname: `/blog/`,
                                query: {
                                    q: searchQuery,
                                },
                            });
                        }}
                    />
                    <SearchIcon
                        onClick={() => {
                            closeSearchMenu();
                            setSearchQuery("");
                            router.push({
                                pathname: `/blog/`,
                                query: {
                                    q: searchQuery,
                                },
                            });
                        }}
                    />
                </SearchMenuContainer>
            </SearchMenu>
        </>
    );
};

export default SearchMenuComponent;
