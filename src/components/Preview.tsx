import React from 'react';
import { Row, Image } from 'antd';
import { iWhatIfContext } from '../screens/WhatIf';

interface iProps {
    context: iWhatIfContext;
}

const Preview: React.FC<iProps> = ({ context }) => {
    const { preview } = context;
    return (
        <Row style={{ margin: '10px' }}>
            {preview && <Image width={'100%'} src={context.preview} />}
        </Row>
    );
};

export default Preview;
