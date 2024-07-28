import axios from "axios";

const server = process.env.REACT_APP_API_URL;

export const loginAPI = async (email, password) => {
    try{
        const response = await axios.get(
            `${server}/api/auth/login?email=${email}&password=${password}`
        );
        return response.data;
    } catch(err) {
        console.log(err);
    }
};

export const logoutAPI = async () => {
    try{
        const response = await axios.post(
            `${server}/api/logout`, {}, { withCredentials: true }
        );
        return response.data;
    } catch (err) {
        console.log(err);
    }
};

// 회원가입
export const registerAPI = async (email, name) => {
    try{
        const response = await axios.post(
            `${server}/api/`
        );
        return response.data;
    } catch (err) {
        console.log(err);
    }
};

// 회원정보 업데이트
export const updateUserInfo = async (intro) => {
    try{
        const response = await axios.patch(
            `${server}/api/`
        );
        return response.data;
    } catch (err) {
        console.log(err);
    }
};