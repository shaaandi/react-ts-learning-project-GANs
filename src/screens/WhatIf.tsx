import React from 'react';
import { Row, Col, Divider } from 'antd';
import { Header, Uploader, Preview, SubmitButtons } from '../components';
import { UploadProvider } from '../contexts/Upload';
import { PreviewProvider } from '../contexts/Preview';
import { LoadingProvider } from '../contexts/Loading';

const WhatIf = () => {
    return (
        <LoadingProvider>
            <PreviewProvider>
                <UploadProvider>
                    <Row style={{ width: '100%' }} justify="center">
                        <Col xs={24} lg={24} xl={20} xxl={15}>
                            <Row>
                                <Col xs={24}>
                                    <Header />
                                </Col>
                                <Col xs={11}>
                                    <Uploader />
                                </Col>
                                <Col
                                    xs={2}
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <Divider
                                        type="vertical"
                                        style={{
                                            borderWidth: '2px',
                                            height: '100%',
                                        }}
                                    />
                                </Col>
                                <Col xs={11}>
                                    <Preview />
                                </Col>
                                <Col xs={11}>
                                    <SubmitButtons />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </UploadProvider>
            </PreviewProvider>
        </LoadingProvider>
    );
};

export default WhatIf;
