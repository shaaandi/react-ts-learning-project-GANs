import React, { useState, createContext, useContext } from 'react';

export interface iLoadingState {
    loading: boolean;
}

export interface iLoadingContext extends iLoadingState {
    updateContext: React.Dispatch<React.SetStateAction<iLoadingState>>;
}

const initialState: iLoadingState = {
    loading: false,
};

const initialContext: iLoadingContext = {
    ...initialState,
    updateContext: () => {},
};

const LoadingContext = createContext<iLoadingContext>(initialContext);

export const useLoadingContext = () => {
    const store = useContext(LoadingContext);

    if (!store) {
        throw new Error(
            'Cannot use `useLoadingContext` outside of a UploadProvider'
        );
    }

    return store;
};

const LoadingStore = () => {
    const [{ loading }, setState] = useState<iLoadingState>(initialState);

    return {
        loading,
        updateContext: setState,
    };
};

export const LoadingProvider: React.FC = (children) => {
    return <LoadingContext.Provider value={LoadingStore()} {...children} />;
};
