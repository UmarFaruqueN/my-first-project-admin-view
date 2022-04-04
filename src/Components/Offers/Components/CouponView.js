import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useSelector } from "react-redux";
import { IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";

function createData(name, calories, fat, carbs, protein) {
     return { name, calories, fat, carbs, protein };
}

const rows = [
     createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
     createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
     createData("Eclair", 262, 16.0, 24, 6.0),
     createData("Cupcake", 305, 3.7, 67, 4.3),
     createData("Gingerbread", 356, 16.0, 49, 3.9),
];

const CouponView = () => {
     const offerData = useSelector((state) => state.offers.value);
     return (
          <TableContainer component={Paper}>
               <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                         <TableRow>
                              <TableCell align="left">Type</TableCell>
                              <TableCell align="left">Offer</TableCell>
                              <TableCell align="left">Minimum Purchase</TableCell>
                              <TableCell align="left">Code</TableCell>
                              <TableCell align="left">Expire On</TableCell>
                              <TableCell align="left"></TableCell>

                         </TableRow>
                    </TableHead>
                    <TableBody>
                         {offerData.map((obj) => (
                              <TableRow key={obj._id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                                   <TableCell align="left">{obj.type}</TableCell>
                                   <TableCell align="left">{obj.offerAmount}</TableCell>
                                   <TableCell align="left">{obj.minimumPurchase}</TableCell>
                                   <TableCell align="left">{obj.type === "Coupon Code" ? obj._id : "N/A"}</TableCell>
                                   <TableCell align="left">{"N/A"}</TableCell>
                                   <TableCell align="left">
                                       <IconButton>
                                           <Delete color="error"/>
                                       </IconButton>
                                   </TableCell>
                              </TableRow>
                         ))}
                    </TableBody>
               </Table>
          </TableContainer>
     );
};

export default CouponView;
