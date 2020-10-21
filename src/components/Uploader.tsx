import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Upload, Row, Col, Button, Spin } from 'antd';
import ImgCrop from 'antd-img-crop';
import { iWhatIfContext } from '../screens/WhatIf';
import { RcFile } from 'antd/lib/upload';

interface iProps {
    context: iWhatIfContext;
}

const UploadWrapper = styled.div``;

var same = function (str: string, callback: (a: string) => void) {
    setTimeout(function () {
        callback(str);
    }, 3000);
};

let fakeFetch = () => {
    return new Promise((res, rej) => {
        same('full', (s: string) => res(s));
    });
};

const Uploader: React.FC<iProps> = ({ context }) => {
    const { uploadFile } = context;
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (uploadFile) {
            const image = document.getElementById('output');
            (image as HTMLImageElement).src = URL.createObjectURL(uploadFile);
        }
    }, [uploadFile]);

    const handleUpload = async (choice: string) => {
        if (uploadFile && choice) {
            const formData = new FormData();
            formData.append('file', context.uploadFile as RcFile);
            formData.append('choice', choice);
            setLoading(true);
            fakeFetch().then(() => {
                // here we can fake the request;
                // we retuned with a url of the result
                setLoading(false);
                context.updateContext((p) => ({
                    ...p,
                    choice,
                    preview:
                        'https://cdn.pixabay.com/photo/2017/10/31/07/49/horses-2904536_960_720.jpg',
                }));
            });
        }
    };

    const handleLoadImage = (file: RcFile) => {
        context.updateContext((p) => ({ ...p, uploadFile: file }));
        return false;
    };

    const handleRemove = () => {
        context.updateContext((p) => ({ ...p, uploadFile: false }));
    };

    const submitButtons = [
        {
            title: 'Male',
            id: 'male',
            layout: { xs: 5 },
            onClick: () => handleUpload('male'),
        },
        {
            title: 'Female',
            id: 'female',
            layout: { xs: 5 },
            onClick: () => handleUpload('female'),
        },
        {
            title: 'Old',
            id: 'old',
            layout: { xs: 5 },
            onClick: () => handleUpload('old'),
        },
    ];

    return (
        <Row>
            <Col xs={24} style={{ marginBottom: '20px' }}>
                <Row
                    align="middle"
                    style={{
                        flexDirection: 'column',
                        ...(!uploadFile
                            ? {
                                  height: '250px',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                              }
                            : {}),
                    }}
                >
                    {uploadFile && (
                        <img id="output" width="60%" alt="uploaded preview" />
                    )}
                    <UploadWrapper>
                        <ImgCrop rotate>
                            <Upload
                                fileList={
                                    uploadFile ? [uploadFile as RcFile] : []
                                }
                                beforeUpload={handleLoadImage}
                                onRemove={handleRemove}
                            >
                                {!uploadFile && (
                                    <Button disabled={loading}>+ Upload</Button>
                                )}
                            </Upload>
                        </ImgCrop>
                    </UploadWrapper>
                </Row>
            </Col>
            <Col xs={24}>
                <Row justify="center">
                    {submitButtons.map(({ title, id, onClick, layout }) => (
                        <Col
                            {...layout}
                            key={id}
                            style={{
                                margin: '15px 10px',
                            }}
                        >
                            <Button
                                type="primary"
                                onClick={onClick}
                                disabled={!uploadFile || loading}
                                block
                            >
                                {title}
                            </Button>
                        </Col>
                    ))}
                </Row>
            </Col>
        </Row>
    );
};

export default Uploader;
