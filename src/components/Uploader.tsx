import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { Upload, Row, Col, Button, Spin } from 'antd';
import ImgCrop from 'antd-img-crop';
import { InboxOutlined } from '@ant-design/icons';
import { iWhatIfContext } from '../screens/WhatIf';
import { RcFile } from 'antd/lib/upload';

interface iProps {
    context: iWhatIfContext;
}

interface iPreviewImg {
    show: boolean;
}

const PreviewImg = styled.image<iPreviewImg>`
    display: ${({ show }) => (show ? 'block' : 'none')};
`;

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
    const previewRef = useRef(null);

    // const onPreview = async (file: any) => {
    // let src = file.url;
    // if (!src) {
    //     src = await new Promise((resolve) => {
    //         const reader = new FileReader();
    //         reader.readAsDataURL(file.originFileObj);
    //         reader.onload = () => resolve(reader.result);
    //     });
    // }
    //     const image = new Image();
    //     image.src = src;
    //     const imgWindow = window.open(src)!;
    //     imgWindow.document.write(image.outerHTML);
    // };

    useEffect(() => {
        if (uploadFile) {
            const image = document.getElementById('output');
            (image as HTMLImageElement).src = URL.createObjectURL(uploadFile);
        }
    }, [uploadFile]);

    const handleUpload = async (choice: string) => {
        // const formData = new FormData();
        // formData.append('file', uploadFile);
        // formData.append('choice', choice);
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
            layout: { xs: 8 },
            onClick: () => handleUpload('male'),
        },
        {
            title: 'Female',
            id: 'female',
            layout: { xs: 8 },
            onClick: () => handleUpload('female'),
        },
        {
            title: 'Old',
            id: 'old',
            layout: { xs: 8 },
            onClick: () => handleUpload('old'),
        },
    ];

    return (
        <Row>
            <Col xs={24} style={{ marginBottom: '20px' }}>
                <Row justify="center">
                    {uploadFile && (
                        <img id="output" width="60%" alt="uploaded preview" />
                    )}
                    {true && (
                        <div style={{ width: '60%' }}>
                            <ImgCrop rotate>
                                <Upload
                                    fileList={
                                        uploadFile ? [uploadFile as RcFile] : []
                                    }
                                    beforeUpload={handleLoadImage}
                                    onRemove={handleRemove}
                                >
                                    {!uploadFile && '+ Upload'}
                                </Upload>
                            </ImgCrop>
                        </div>
                    )}
                </Row>
            </Col>
            {submitButtons.map(({ title, id, onClick, layout }) => (
                <Col {...layout} key={id}>
                    <Button
                        type="primary"
                        onClick={onClick}
                        disabled={!uploadFile}
                        style={{
                            margin: '15px 0px',
                        }}
                        block
                    >
                        {title}
                    </Button>
                </Col>
            ))}
        </Row>
    );
};

export default Uploader;
