import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import React, { useState } from 'react';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});


function Row({solution, url}) {
    const [open, setOpen] = React.useState(true);
    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [open3, setOpen3] = useState(false);
    const classes = useRowStyles();
  
    return (
      <React.Fragment>
        <TableRow className={classes.root}>
          <TableCell>
            <IconButton aria-label="expand row" size="small" onClick={() => setOpen2(!open2)}>
              {open2 ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
              <Typography variant="h6"> Giải pháp</Typography>
          </TableCell>
         
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open2} timeout="auto" unmountOnExit>
              <Box margin={1}>
                <Typography variant="h7" gutterBottom component="div">
                  {solution}
                </Typography>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
        <TableRow className={classes.root}>
          <TableCell>
            <IconButton aria-label="expand row" size="small" onClick={() => setOpen3(!open3)}>
              {open3 ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
              <Typography variant="h6"> Link tham khảo</Typography>
          </TableCell>
         
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open3} timeout="auto" unmountOnExit>
              <Box margin={1}>
                <Typography variant="h7" gutterBottom component="div">
               {url}
                </Typography>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }

  

function Detail({solution, url}) {
    return (
        <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableBody>        
              <Row solution={solution} url={url}  />
          </TableBody>
        </Table>
      </TableContainer>
    );
}

export default Detail;