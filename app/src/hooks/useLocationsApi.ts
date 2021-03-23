import React from "react";

import ApiConfig from "src/configs/api";
import useDebounce from "src/hooks/useDebounce";
import Api from "src/utils/api";

enum EFetchEnum {
    FETCH_INIT = "FETCH_INIT",
    FETCH_SUCCESS = "FETCH_SUCCESS",
    FETCH_FAILURE = "FETCH_FAILURE"
}

export interface IReducerState {
    data: TLocations;
    loading: boolean;
    error: string | null;
}

interface IFetchInitAction {
    type: EFetchEnum.FETCH_INIT;
}

interface IFetchSuccessAction {
    type: EFetchEnum.FETCH_SUCCESS;
    payload: TLocations;
}

interface IFetchFailureAction {
    type: EFetchEnum.FETCH_FAILURE;
    error: string;
}

type TFetchAction = IFetchInitAction | IFetchSuccessAction | IFetchFailureAction;

const fetchReducer = (
    state: IReducerState,
    action: TFetchAction
): IReducerState => {
    switch (action.type) {
        case EFetchEnum.FETCH_INIT:
            return {
                data: [],
                loading: true,
                error: null,
            };
        case EFetchEnum.FETCH_SUCCESS:
            return {
                loading: false,
                data: action.payload,
                error: null,
            };
        case EFetchEnum.FETCH_FAILURE:
            return {
                loading: false,
                data: [],
                error: null,
            };
        default:
            throw new Error();
    }
};

export default function useLocationsApi(): [data: IReducerState, setQuery: (query: string) => void] {
    const [ query, setQuery ] = React.useState<string>("");
    const debouncedQuery= useDebounce(query);

    const [ state, dispatch ] = React.useReducer<React.Reducer<IReducerState, TFetchAction>>(
        fetchReducer,
        {
            loading: true,
            data: [],
            error: null
        }
    );

    const initAction = React.useCallback(() => {
        dispatch({
            type: EFetchEnum.FETCH_INIT
        });
    }, []);

    const successAction = React.useCallback((payload: TLocations) => {
        dispatch({
            type: EFetchEnum.FETCH_SUCCESS,
            payload
        });
    }, []);

    const errorAction = React.useCallback((payload: TLocations) => {
        dispatch({
            type: EFetchEnum.FETCH_SUCCESS,
            payload
        });
    }, []);

    const loadData = React.useCallback(async () => {
        initAction();
        try {
            const result = await Api.get<TLocations>(ApiConfig.ENDPOINTS.Locations, {q: debouncedQuery});
            successAction(result);
        } catch (e) {
            errorAction(e.message);
        }
    }, [debouncedQuery]);

    React.useEffect(() => {
        if (debouncedQuery.length < 2) {
            successAction([]);
            return;
        }

        loadData();
    }, [ debouncedQuery ]);

    return [ state, setQuery ];
}
