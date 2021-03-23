import ApiConfig from "src/configs/api";
import { composePathQuery } from "src/utils/url";

const composeUrl = (path: string, params: any = null) => {
    return ApiConfig.API_ROOT + composePathQuery(path, params);
};

const makeCall = async <T>(url: string, method = "GET", data: any = null): Promise<T> => {
    const response = await fetch(url, { method });
    return response.json();
};

const get = <T>(path: string, params: any = null): Promise<T> => {
    const url = composeUrl(path, params);
    return makeCall<T>(url);
};

export default {
    get
};
