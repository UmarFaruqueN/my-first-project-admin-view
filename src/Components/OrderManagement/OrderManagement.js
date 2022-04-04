import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";

import { setOrders } from "../../Redux";
import { getAllOrder } from "./index";
import OrderTable from "./Components/OrderTable";
import FilterAndPrint from "./Components/FilterAndPrint";

const OrderManagement = () => {
     const [data, setData] = useState(false);
     const dispatch = useDispatch();
     const allOrders = useSelector((state) => state.orders.value);

     useEffect(() => {
          axios.get(getAllOrder, { headers: { "Content-Type": "application/json" } })
               .then((response) => {
                    console.log("success");
                    console.log(response.data.allOrders);
                    dispatch(setOrders({ orders: response.data.allOrders }));
               })
               .catch((error) => {
                    console.log(error);
               });
     }, [dispatch]);

     console.log(allOrders);

     const FilterByMonth = (month) => {
          setData(allOrders.filter((order) => order.month === month));
          console.log(data);
     };

     const columns = [
          { title: "name", field: "name" },
          { title: "phone", field: "phone" },
          { title: "order id", field: "_id" },
          { title: "amount", field: "total", type: "numeric" },
          
     ];

     const  DownloadPdf = () => {
          console.log(allOrders);
          const doc = new jsPDF();
          doc.text("Order Report", 20, 10);
          doc.autoTable({
               columns: columns.map((col) => ({ ...col, datakey: col.field })),
               body:allOrders,
          });

          doc.save("report.pdf");
     };
     return (
          <>
               <FilterAndPrint DownloadPdf={DownloadPdf} data={data} setData={setData} FilterByMonth={FilterByMonth} />
               <OrderTable data={data ? data : allOrders} />
          </>
     );
};

export default OrderManagement;
