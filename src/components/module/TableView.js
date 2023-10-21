import { Table } from 'antd'
import {useState,useEffect} from 'react'

const TableView = ({columns,api,method,items,styles}) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState([]);
    const [tableParams, setTableParams] = useState({
        pagination: {
          current: 1,
          pageSize: 10,
        },
    });


    const getData = async () => {
        let x = items;
        const y = getRandomuserParams(tableParams);
        x.results = y.results;
        x.page = y.page;
        x.pagination = y.pagination;

        setLoading(true);
        const res = await fetch(api,{
            method:method,
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(items)
        });
        const data = await res.json();
        setLoading(false);
          if(res.status === 200){
            setData(data.data)
          }else{
              alert(data.error)
          }
        
    }

    const getRandomuserParams = (params) => ({
        results: params.pagination?.pageSize,
        page: params.pagination?.current,
        ...params,
    });

    const handleTableChange = (pagination, filters, sorter) => {
        setTableParams({
          pagination,
          filters,
          ...sorter,
        });
    
        // `dataSource` is useless since `pageSize` changed
        if (pagination.pageSize !== tableParams.pagination?.pageSize) {
          setData([]);
        }
    };

    useEffect(() => {
        getData()
    }, [])
    
    console.log(data)

  return (
    <Table 
    columns={columns} 
    dataSource={data} 
    pagination={tableParams.pagination}
    onChange={handleTableChange}
    loading={loading}
    direction={"rtl"}
    style={styles}
    />
  )
}

export default TableView