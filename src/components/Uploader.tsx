import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Upload, Row, Col, Button } from 'antd';
import ImgCrop from 'antd-img-crop';
import { RcFile } from 'antd/lib/upload';
import { useUploadContext } from '../contexts/hooks';

const UploadWrapper = styled.div``;

const Uploader: React.FC = () => {
    const { updateContext, file: uploadFile } = useUploadContext();

    useEffect(() => {
        if (uploadFile) {
            const image = document.getElementById('output');
            (image as HTMLImageElement).src = URL.createObjectURL(uploadFile);
        }
    }, [uploadFile]);

    const handleLoadImage = (file: RcFile) => {
        updateContext((p) => ({ ...p, file: file }));
        return false;
    };

    const handleRemove = () => {
        updateContext((p) => ({ ...p, file: false }));
    };

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
                                {!uploadFile && <Button>+ Upload</Button>}
                            </Upload>
                        </ImgCrop>
                    </UploadWrapper>
                </Row>
            </Col>
        </Row>
    );
};

export default Uploader;
