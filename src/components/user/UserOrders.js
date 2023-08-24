import styled from "styled-components"
import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {useEffect, } from "react";
import { ordersFetchUser } from "../../features/ordersSlice";
import moment from "moment";
import {useSelector, useDispatch} from "react-redux";
import {NavLink, } from "react-router-dom";



export default function UserOrders() {
    const dispatch = useDispatch()
    const userId = localStorage.getItem("user-id")

    const { orderListUser }  = useSelector(state => state.orders)

    useEffect( ()=>{
        dispatch(ordersFetchUser(userId))
    },[dispatch])


    const rows = orderListUser?.map( order => {
        return {
            id : order._id,
            cName : order.products[0].description,
            amount : (order.total / 100)?.toLocaleString(),
            dStatus : order.delivery_status,
            data : moment(order.createdAt).fromNow()
        }
    })

    const columns  = [
        {
            field: 'id',
            headerName: 'ID',
            width: 220
        },
        {
            field: 'cName',
            headerName: 'Name',
            width: 120
        },
        {
            field: 'amount',
            headerName: 'Amount($)',
            width: 100
        },
        {
            field: 'dStatus',
            headerName: 'Status',
            width: 100,
            renderCell: (params) => {
                return (
                    <div>
                        {params.row.dStatus === "pending" ? <Pending> Pending </Pending> :
                            params.row.dStatus === "dispatched" ? <Dispatched> Received </Dispatched> :
                                params.row.dStatus = "delivered" ? <Delivered> Delivered </Delivered> : "error"
                        }
                    </div>
                )}
        },
        {
            field: 'data',
            headerName: 'Data',
            width: 120
        },
        {
            field: 'actions',
            headerName: 'Actions',
            sortable: false,
            width: 220,
            renderCell: (params) => {
                return (
                    <Actions>
                        <NavLink to={`/order/${params.row.id}`}>
                        <View> View </View>
                        </NavLink>
                    </Actions>
                )},
        }
    ];

    return (
        <div style={{ height: 400, width: '800px' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    }
                }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
                disableColumnFilter
                disableRowSelectionOnClick
            />
        </div>
    );
}

const Actions = styled.div`
  max-width: 100%;
  width: 600px;
  display: flex;
  justify-content: space-around;
  margin-bottom: 10px;
  button{
    border: none;
    outline: none;
    padding: 3px 5px;
    color: white;
    border-radius: 3px;
    cursor: pointer;
  }
`

const View = styled.button`
  background-color: rgb(114, 225, 40)
`
const Pending = styled.div`
  color: rgb(253,181,40);
  background: rgb(253, 181, 40, 0.12);
  padding: 3px 5px;
  border-radius: 3px;
  font-size: 14px;
`;
const Dispatched = styled.div`
  color: rgb(38, 198, 249);
  background-color: rgba(38, 198, 249, 0.12);
  padding: 3px 5px;
  font-size: 14px;
`;
const Delivered = styled.div`
  color: rgb(102, 108, 255);
  background-color: rgba(102, 108, 255, 0.12);
  padding: 3px 5px;
  border-radius: 3px;
  font-size: 14px;
`;
