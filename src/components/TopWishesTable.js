import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import VisibilityIcon from '@material-ui/icons/Visibility';
import ButtonShowDialog from '../components/ButtonShowDialog';

export default function TopWishesTable({ topWishes }) {

    const showTopWishes = () =>{
        return topWishes.map((wish , index) => (
            <TableRow key={ index }>
                <TableCell align="right">
                    { index + 1 }
                </TableCell>
                <TableCell component="th" scope="row">
                    { wish.author_name }
                </TableCell>
                <TableCell align="right">
                    { wish.interactive_dropheart }
                </TableCell>
                <TableCell align="right">
                    <ButtonShowDialog wish={ wish } icon={ <VisibilityIcon></VisibilityIcon> }></ButtonShowDialog>
                </TableCell>
            </TableRow>
        ));
    }

    const showTableTopWishes = () =>{
        if(topWishes && topWishes.length > 0){
            return (
                <>
                    <h3 style={{ textAlign : "center" , fontWeight : "500" }}> 
                        Top { topWishes.length } điều ước có lượt yêu thích cao nhất
                    </h3>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                            <TableRow style={{ margin : "8px 0"}}>
                                <TableCell>STT</TableCell>
                                <TableCell align="right">Tên tác giả</TableCell>
                                <TableCell align="right">Số Yêu Thích</TableCell>
                                <TableCell align="right">Chi tiết</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                                { showTopWishes() }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </>

            )
        }
        return <></>;
    }

    return showTableTopWishes();
}
