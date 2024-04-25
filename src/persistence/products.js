import { PRODUCTS_ENDPOINT } from "../config/configuration";
import axios from "axios";
import { useQuery, useMutation } from "react-query";

const getProducts = async () => {
    const assetUrl = `${PRODUCTS_ENDPOINT}`;
    const url = new URL(assetUrl);

    const response = await axios.get(url.href);
    if (response.data) {
        return response.data;
    }
    return [];
}

export const useQueryGetProducts = () =>
    useQuery(
        ['getProducts'],
        () => getProducts(),
        {
            retry: false,
            onError: (error) => {
                return error;
            }
        },
    );

const getRelatedProducts = async (type) => {
    const assetUrl = `${PRODUCTS_ENDPOINT}/type/${type}`;
    const url = new URL(assetUrl);

    const response = await axios.get(url.href);
    if (response.data) {
        return response.data;
    }
    return [];
}

export const useQueryGetRelatedProducts = (type) =>
    useQuery(
        ['getRelatedProducts'],
        () => getRelatedProducts(type),
        {
            retry: false,
            onError: (error) => {
                return error;
            }
        },
    );


const getProductById = async ({ id }) => {
    const assetUrl = `${PRODUCTS_ENDPOINT}/${id}`;
    const url = new URL(assetUrl);

    const response = await axios.get(url.href);
    if (response.data) {
        return response.data;
    }
    return [];
}

export const useQueryGetProductById = () => {

    return useMutation(['getProductById'], getProductById, {
        onError: (err) => err,
        onMutate: () => {},
        });
}