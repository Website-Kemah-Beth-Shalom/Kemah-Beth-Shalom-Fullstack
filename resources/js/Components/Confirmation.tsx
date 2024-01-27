import React from 'react';
import { Button, message, Popconfirm } from 'antd';

// const confirm = (e?: React.MouseEvent<HTMLElement, MouseEvent>) => {
//     console.log(e);
//     message.success('Click on Yes');
// };

// const cancel = (e?: React.MouseEvent<HTMLElement, MouseEvent>) => {
//     console.log(e);
//     message.error('Click on No');
// };

type Props = {
    children: React.ReactElement
    onCancel?: () => void,
    onConfirm?: () => void,
    title?: string,
    description?: string,
}


export const Confirmation = ({ children, onCancel, onConfirm, title, description }: Props) => (
    <Popconfirm
        title={title ? title : "Are you sure?"}
        description={description}
        onCancel={onCancel ? onCancel : () => {
            message.error('Click on No');
        }}
        onConfirm={onConfirm}
        okText="Yes"
        cancelText="No"
    >
        {children}
    </Popconfirm>
);


