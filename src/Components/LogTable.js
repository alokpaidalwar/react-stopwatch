import React from "react";
import { Table } from "antd";
import moment from "moment";

function LogTable(props){

    const columns = [
        {
            title: 'Created At',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: date => <span>{moment(date).local().format('DD-MM-YYYY HH:mm:ss')}</span>
        },
        {
            title: 'Button Type',
            dataIndex: 'buttonType',
            key: 'buttonType',
        },
        {
            title: 'Log',
            dataIndex: 'log',
            key: 'log',
        },
    ]
   
    const onPageChange = ({current}) => {
        console.log(current)
        props.getTableData(current);
    }

    return (
        <div>
            <Table 
                dataSource={props.dataSource} 
                columns={columns}
                rowKey="_id"
                pagination={{total:props.total, pageSize: props.perPage, showSizeChanger: false, current:props.current}}
                onChange={onPageChange}
            /> 
        </div>
    )
}

export default LogTable;