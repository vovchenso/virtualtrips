import qs from "query-string";

export const composePathQuery = (path: string, params?: IParams): string => {
    return path + (params ? `?${qs.stringify(params)}` : "");
};
