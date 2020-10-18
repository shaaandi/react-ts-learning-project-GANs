import React from 'react';
import { Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { iWhatIfContext } from '../screens/WhatIf';

interface iProps {
    context: iWhatIfContext;
}

const Uploader: React.FC<iProps> = (props) => {
    return (
        <Upload.Dragger name="files" beforeUpload={(e) => false}>
            <p className="ant-upload-drag-icon">
                <InboxOutlined />
            </p>
            <p className="ant-upload-text">
                Click or drag file to this area to upload
            </p>
            <p className="ant-upload-hint">
                Support for a single or bulk upload.
            </p>
        </Upload.Dragger>
    );
};

export default Uploader;
