import React from 'react';
import { Row, Typography } from 'antd';
import { useUploadContext } from '../contexts/Upload';

const { Title } = Typography;

const Header: React.FC = () => {
    const { choice } = useUploadContext();

    return (
        <Row justify="center">
            <Title level={3} style={{ textAlign: 'center' }}>
                What if you are {choice}
            </Title>
        </Row>
    );
};

export default Header;
