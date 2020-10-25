import React from 'react';
import { Row, Image } from 'antd';
import { usePreviewContext } from '../contexts/Preview';

const Preview: React.FC = () => {
    const { preview } = usePreviewContext();

    return (
        <Row style={{ margin: '10px' }}>
            <Image width={preview ? '100%' : '0%'} src={preview} />
        </Row>
    );
};

export default Preview;
