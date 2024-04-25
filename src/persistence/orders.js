import { useQuery, useMutation } from "react-query";
import axios from "axios";
import { ORDERS_ENDPOINT } from "../config/configuration";


const getUserOrders = async (id) => {
    const assetUrl = `${ORDERS_ENDPOINT}/${id}`;
    const url = new URL(assetUrl);

    const response = await axios.get(url.href);
    if (response.data) {
        return response.data;
    }
    return [];
}

export const useQueryGetUserOrders = (id) =>
    useQuery(
        ['getUserOrders'],
        () => getUserOrders(id),
        {
            retry: false,
            onError: (error) => {
                return error;
            }
        },
    );

export const useMutationGetUserOrders = () =>
    useMutation(['getOrder'], async (data) => {
        return getUserOrders(data);
    }, {
        onError: (err) => err,
        onSuccess: (data, variables) => {
            return data;
        },
        onMutate: () => { },
    });



const getOrderProducts = async (data) => {
    const assetUrl = `${ORDERS_ENDPOINT}/products/${data.id}`;
    const url = new URL(assetUrl);

    const response = await axios.get(url.href);
    if (response.data) {
        return response.data;
    }
    return [];
}

export const useQueryGetOrderProductsById = () => {
    return useMutation(['getOrder'], async (data) => {
        return getOrderProducts(data);
    }, {
        onError: (err) => err,
        onSuccess: (data, variables) => {
            return data;
        },
        onMutate: () => { },
    });
}

const createOrder = async (data) => {
    const assetUrl = `${ORDERS_ENDPOINT}/new`;
    const url = new URL(assetUrl);

    const response = await axios.post(url.href, data);
    if (response.data) {
        return response.data;
    }
    return [];
}

export const useQueryCreateOrder = () => {
    return useMutation(['getOrder'], createOrder, {
        onError: (err) => err,
        onSuccess: (data, variables) => {
            return data;
        },
        onMutate: () => { },
    });
}