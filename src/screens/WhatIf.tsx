import React, { useState } from 'react';
import { Row, Col } from 'antd';
import { Header, Uploader } from '../components';
import { RcFile } from 'antd/lib/upload';

export interface iWhatIfContextState {
    preview: string;
    choice: string;
    uploadFile: boolean | RcFile;
}

export interface iWhatIfContext extends iWhatIfContextState {
    updateContext: React.Dispatch<React.SetStateAction<iWhatIfContextState>>;
}

const initialContextState = {
    preview: '',
    choice: '',
    uploadFile: false,
};

const WhatIf = () => {
    const [state, setState] = useState<iWhatIfContextState>(
        initialContextState
    );

    const Context: React.Context<iWhatIfContext> = React.createContext({
        ...state,
        updateContext: setState,
    });

    return (
        <Context.Provider value={{ ...state, updateContext: setState }}>
            <Row style={{ width: '100%' }} justify="center">
                <Col xs={24} lg={24} xl={20} xxl={15}>
                    <Row>
                        <Col xs={24}>
                            <Context.Consumer>
                                {(value) => <Header context={value} />}
                            </Context.Consumer>
                        </Col>
                        <Col xs={12}>
                            <Context.Consumer>
                                {(value) => <Uploader context={value} />}
                            </Context.Consumer>
                        </Col>
                        <Col xs={12}>{/* here will be our preview */}</Col>
                    </Row>
                </Col>
            </Row>
        </Context.Provider>
    );
};

export default WhatIf;
