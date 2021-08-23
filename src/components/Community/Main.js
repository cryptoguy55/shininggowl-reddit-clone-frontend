import React, {useEffect, useState} from 'react';
import axios from "axios"
import { useSelector, useDispatch} from 'react-redux'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Switch from '@material-ui/core/Switch';
import {SUCCESS, ADD_COMMUNITY, DELETE_COMMUNITY} from '../../constants/actionTypes'



export default function BasicTable() {
  const dispatch = useDispatch()
  const [data, setData] = useState([])
  const handleChange = e => {
    if (e.target.checked) {
      dispatch({type: SUCCESS, payload: {message: "Joined successfully"}})
      dispatch({type: DELETE_COMMUNITY, payload: e.target.value})
      console.log(e.target.value)

    } else {
      dispatch({type: SUCCESS, payload: {message: "Quitted successfully"}})
      dispatch({type: DELETE_COMMUNITY, payload: e.target.value})
    }
  }
  useEffect(() => {
    // code to run on component mount
    // let result = agent.Communities.all()
    // console.log("_______________",result.Communities)
    // dispatch({type: common, payload: result})
    axios.get('/api/communities')
    .then(function (response) {
      setData(response.data.communities)
    })
    .catch(function (error) {
      console.log(error);
    })
    .then(function () {
      // always executed
    });  
  }, [])
  return (
    <>
    <p className="text-2xl font-bold text text-center mt-4 ">Communities</p> <br/>  
      <Table  aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell align="right">Description</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.ID}>
              <TableCell component="th" scope="row">
                {row.Name}
              </TableCell>
              <TableCell align="right">{row.description}</TableCell>
              <TableCell align="right">
                  Join<Switch
                  key={row.ID}
                  defaultChecked
                  value={row.ID}
                   // checked={state.checkedA}
                   onChange={handleChange}
                    
                  />Quit
             </TableCell>              
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </>
  );
}