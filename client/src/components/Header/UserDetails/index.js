import { useContext } from "react";
import router from "next/router";
import { UserContext } from "../../../context/";

import {
    UserDetailsOverlay,
    UserDetails,
    ProfileDetails,
    DisplayName,
    Username,
    UserAvatar,
    ProfileOptions,
    ProfileOption,
} from "./UserDetailsElements";

import { PasswordIcon, ViewIcon, SignOutIcon } from "../../../svg";

const UserDetailsComponent = ({
    isUserDetailsOpen,
    closeUserDetails,
    ...rest
}) => {
    const { user, signOut } = useContext(UserContext);

    if (user.authToken) {
        const openAdminPanel = () => {
            router.push(`/admin/`);
        };
        const openProfile = () => {
            router.push(`/profile`);
        };

        return (
            <>
                <UserDetailsOverlay
                    isUserDetailsOpen={isUserDetailsOpen}
                    onClick={closeUserDetails}
                />
                <UserDetails isUserDetailsOpen={isUserDetailsOpen} {...rest}>
                    <ProfileDetails>
                        <div>
                            <DisplayName>{user.data.displayName}</DisplayName>
                            <Username>@{user.data.username}</Username>
                        </div>
                        <UserAvatar
                            src={user.data.avatarUrl}
                            alt={user.data.displayName + " - Avatar"}
                        />
                    </ProfileDetails>
                    <ProfileOptions>
                        {user.data.role == "Administrator" ? (
                            <ProfileOption onClick={openAdminPanel}>
                                <PasswordIcon />
                                Admin Dashboard
                            </ProfileOption>
                        ) : null}
                        <ProfileOption onClick={openProfile}>
                            <ViewIcon />
                            User Profile
                        </ProfileOption>
                        <ProfileOption onClick={signOut}>
                            <SignOutIcon />
                            Sign Out
                        </ProfileOption>
                    </ProfileOptions>
                </UserDetails>
            </>
        );
    }
    return null;
};

export default UserDetailsComponent;
