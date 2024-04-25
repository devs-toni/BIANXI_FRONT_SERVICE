import { SIZES_ENDPOINT } from "../config/configuration";
import axios from "axios";
import { useQuery } from "react-query";

const getSizes = async () => {
    const assetUrl = `${SIZES_ENDPOINT}`;
    const url = new URL(assetUrl);

    const response = await axios.get(url.href);
    if (response.data) {
        return response.data;
    }
    return [];
}

export const useQueryGetSizes = () =>
    useQuery(
        ['getSizes'],
        () => getSizes(),
        {
            retry: false,
            onError: (error) => {
                return error;
            }
        },
    );