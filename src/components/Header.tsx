import React from 'react';
import {Row, Typography} from "antd";
import {iWhatIfContext} from "../screens/WhatIf"

const {Title} = Typography;

interface iProps {
    context : iWhatIfContext
}

const Header:React.FC<iProps> = (props) => {
    const {context} = props;

    return (
     <Row justify="center">
         <Title level={3} style={{textAlign: "center"}}>What if you are {context.choice}</Title>
     </Row>
    )
};

export default Header