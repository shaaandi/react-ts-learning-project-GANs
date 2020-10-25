import React from 'react';
import { Button } from 'antd';
import { Choice } from '../contexts/Upload';
import {
    useLoadingContext,
    usePreviewContext,
    useUploadContext,
} from '../contexts/hooks';
import { RcFile } from 'antd/lib/upload';

interface iProps {
    id: Choice;
    title: string;
}

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

const fakeImagesMap = {
    [Choice.MALE]:
        'https://cdn.pixabay.com/photo/2018/07/21/03/55/girl-3551832_960_720.jpg',
    [Choice.FEMALE]:
        'https://cdn.pixabay.com/photo/2016/11/29/03/36/beautiful-1867093_960_720.jpg',
    [Choice.AGED]:
        'https://cdn.pixabay.com/photo/2013/04/04/06/42/woman-100343_960_720.jpg',
};

const Submit: React.FC<iProps> = ({ id, title }) => {
    const { file: uploadFile, updateContext } = useUploadContext();
    const { updateContext: updateContextPreview } = usePreviewContext();
    const { updateContext: updateContextLoading } = useLoadingContext();

    const handleUpload = async (choice: Choice) => {
        if (uploadFile && choice) {
            const formData = new FormData();
            formData.append('file', uploadFile as RcFile);
            formData.append('choice', choice);
            // setLoading(true);
            updateContextLoading({ loading: true });
            fakeFetch().then(() => {
                // here we can fake the request;
                // we retuned with a url of the result
                // setLoading(false);
                updateContext((p) => ({ ...p, choice }));
                updateContextPreview({
                    preview: fakeImagesMap[choice],
                });
                updateContextLoading({ loading: false });
            });
        }
    };

    return (
        <Button disabled={!uploadFile} onClick={() => handleUpload(id)}>
            {title}
        </Button>
    );
};

export default Submit;
