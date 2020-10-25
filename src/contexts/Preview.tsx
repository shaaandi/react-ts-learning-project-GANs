import React, { useState, createContext, useContext } from 'react';

export interface iPreviewState {
    preview: string;
}

export interface iPreviewContext extends iPreviewState {
    updateContext: React.Dispatch<React.SetStateAction<iPreviewState>>;
}

const initialState: iPreviewState = {
    preview: '',
};

const initialContext: iPreviewContext = {
    ...initialState,
    updateContext: () => {},
};

const PreviewContext = createContext<iPreviewContext>(initialContext);

export const usePreviewContext = () => {
    const store = useContext(PreviewContext);

    if (!store) {
        throw new Error(
            'Cannot use `usePreviewContext` outside of a UploadProvider'
        );
    }

    return store;
};

const PreviewStore = () => {
    const [{ preview }, setState] = useState<iPreviewState>(initialState);

    return {
        preview,
        updateContext: setState,
    };
};

export const PreviewProvider: React.FC = (children) => {
    return <PreviewContext.Provider value={PreviewStore()} {...children} />;
};
