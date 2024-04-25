import { useMutation } from "react-query";
import axios from "axios";
import { USERS_ENDPOINT } from "../config/configuration";

const oAuthLogin = async (data) => {
    const assetUrl = `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${data.access_token}`;
    const url = new URL(assetUrl);

    const response = await axios.get(url.href, {
        headers: {
            Authorization: `Bearer ${data.access_token}`,
            Accept: 'application/json'
        }
    });
    if (response.data) {
        return response.data;
    }
    return [];
}

export const useQueryOAuthLogin = () => {
    return useMutation(['oAuthLogin'], oAuthLogin, {
        onError: (err) => err,
        onMutate: () => { },
    });
}

const saveUser = async (data) => {
    const assetUrl = `${USERS_ENDPOINT}`;
    const url = new URL(assetUrl);

    const response = await axios.post(url.href, data);
    if (response.data) {
        return response.data;
    }
    return [];
}

export const useQuerySaveUser = () => {
    return useMutation(['saveUser'], saveUser, {
        onError: (err) => err,
        onMutate: () => { },
    });
}

const loginUser = async (data) => {
    const assetUrl = `${USERS_ENDPOINT}/verify`;
    const url = new URL(assetUrl);

    const response = await axios.post(url.href, data);
    if (response.data) {
        return response.data;
    }
    return [];
}

export const useQueryLoginUser = () => {
    return useMutation(['loginUser'], loginUser, {
        onError: (err) => err,
        onMutate: () => { },
    });
}