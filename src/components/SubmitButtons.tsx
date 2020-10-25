import React from 'react';
import { Row, Col } from 'antd';
import Submit from './Submit';
import { Choice } from '../contexts/Upload';
import { useLoadingContext } from '../contexts/Loading';
import { RectGraduallyShowLoading } from 'react-loadingg';

interface buttonProps {
    title: string;
    id: Choice;
    layout: {};
}

const submitButtons: buttonProps[] = [
    {
        title: 'Male',
        id: Choice.MALE,
        layout: { xs: 5 },
    },
    {
        title: 'Female',
        id: Choice.FEMALE,
        layout: { xs: 5 },
    },
    {
        title: 'Old',
        id: Choice.AGED,
        layout: { xs: 5 },
    },
];

const SubmitButtons: React.FC = () => {
    const { loading } = useLoadingContext();
    return (
        <Row justify="center">
            {!loading &&
                submitButtons.map(({ title, id, layout }) => (
                    <Col
                        {...layout}
                        key={id}
                        style={{
                            margin: '15px 10px',
                        }}
                    >
                        <Submit title={title} id={id} />
                    </Col>
                ))}
            {loading && <RectGraduallyShowLoading />}
        </Row>
    );
};

export default SubmitButtons;
