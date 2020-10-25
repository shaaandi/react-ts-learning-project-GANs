import React, { useState, createContext, useContext } from 'react';
import { RcFile } from 'antd/lib/upload';

export enum Choice {
    NOT_SELECTED = '',
    MALE = 'MALE',
    FEMALE = 'FEMALE',
    AGED = 'AGED',
}

export interface iUploadState {
    choice: Choice;
    file: RcFile | boolean;
}

export interface iUploadContext extends iUploadState {
    updateContext: React.Dispatch<React.SetStateAction<iUploadState>>;
}

const initialState: iUploadState = {
    choice: Choice.NOT_SELECTED,
    file: false,
};

const initialContext: iUploadContext = {
    ...initialState,
    updateContext: () => {},
};

const UploadContext = createContext<iUploadContext>(initialContext);

export const useUploadContext = () => {
    const store = useContext(UploadContext);

    if (!store) {
        throw new Error(
            'Cannot use `useUploadContext` outside of a UploadProvider'
        );
    }

    return store;
};

const UploadStore = () => {
    const [{ choice, file }, setState] = useState<iUploadState>(initialState);

    return {
        choice,
        file,
        updateContext: setState,
    };
};

export const UploadProvider: React.FC = (children) => {
    return <UploadContext.Provider value={UploadStore()} {...children} />;
};
