import React from 'react';
import styled from 'styled-components';
import { useLoadingContext } from '../contexts/Loading';
import { Spin } from 'antd';

const Loading: React.FC = () => {
    const { loading } = useLoadingContext();
    return <>{loading && <Spin />}</>;
};

export default Loading;
