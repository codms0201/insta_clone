import { atom } from 'recoil';

export const UserData = atom({
    key: 'UserData',
    default: {
        user_id : "",
        name : "",
        email : "",
        nickname : ""
    },
});

export const P_Data = atom({
    key: 'P_Data',
    default: {
        user_id : "",
        name : "",
        email : ""
    },
});

export const LoginState = atom({
    key: 'LoginState',
    default: false,
    // effects_UNSTABLE: [persistAtom],
});

export const PostCount = atom({
    key: 'PostCount',
    default: 0,
});

export const Increased = atom({
    key: 'Increased',
    default: false,
});