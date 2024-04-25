import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";
import { PRODUCTS_ENDPOINT } from "../config/configuration";


const getFavourites = async (id) => {
    const assetUrl = `${PRODUCTS_ENDPOINT}/favourites/${id}`;
    const url = new URL(assetUrl);

    const response = await axios.get(url.href);
    if (response.data) {
        return response.data;
    }
    return [];
}

export const useQueryGetFavourites = (id) =>
    useQuery(
        ['getFavourites'],
        () => getFavourites(id),
        {
            retry: false,
            onError: (error) => {
                return error;
            }
        },
    );

const addLike = async (data) => {
    const assetUrl = `${PRODUCTS_ENDPOINT}/likes/${data.idProduct}/${data.idUser}`;
    const url = new URL(assetUrl);

    const response = await axios.post(url.href);
    if (response.data) {
        return response.data;
    }
    return [];
}

export const useQueryAddLike = () => {
    const queryClient = useQueryClient();

    return useMutation(['addLike'], addLike, {
        onError: (err) => err,
        onSuccess: (data, variables) => {
            void queryClient.invalidateQueries('getFavourites');
        },
        onMutate: () => {},
      });
}

const deleteLike = async (data) => {
    const assetUrl = `${PRODUCTS_ENDPOINT}/likes/${data.idProduct}/${data.idUser}`;
    const url = new URL(assetUrl);

    const response = await axios.delete(url.href);
    if (response.data) {
        return response.data;
    }
    return [];
}

export const useQueryDeleteLike = () => {
    const queryClient = useQueryClient();

    return useMutation(['addLike'], deleteLike, {
        onError: (err) => err,
        onSuccess: (data, variables) => {
            void queryClient.invalidateQueries('getFavourites');
        },
        onMutate: () => {},
      });
}

const getLikeStatus = async ({ idProduct, idUser }) => {
    const assetUrl = `${PRODUCTS_ENDPOINT}/likes/${idProduct}/${idUser}`;
    const url = new URL(assetUrl);

    const response = await axios.get(url.href);
    if (response.data) {
        return response.data;
    }
    return [];
}

export const useQueryGetLikeStatus = () => {

    return useMutation(['getLikeStatus'], getLikeStatus, {
        onError: (err) => err,
        onMutate: () => {},
        });
}