import { atom } from 'recoil';

import {recoilPersist} from "recoil-persist";

export const { persistAtom } = recoilPersist({
    key: "userState",
    storage: sessionStorage,
  });

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

export const userState = atom({
    key: 'userState',
    default: null,
    effects_UNSTABLE: [persistAtom],
});
