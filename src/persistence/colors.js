import { COLORS_ENDPOINT } from "../config/configuration";
import axios from "axios";
import { useQuery } from "react-query";

const getColors = async () => {
    const assetUrl = `${COLORS_ENDPOINT}`;
    const url = new URL(assetUrl);

    const response = await axios.get(url.href);
    if (response.data) {
        return response.data;
    }
    return [];
}

export const useQueryGetColors = () =>
    useQuery(
        ['getColors'],
        () => getColors(),
        {
            retry: false,
            onError: (error) => {
                return error;
            }
        },
    );