import React, {useEffect, useState} from 'react';
import agent from '../../agent'
import { useSelector, useDispatch } from 'react-redux'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import AssignmentTurnedInOutlinedIcon from '@material-ui/icons/AssignmentTurnedInOutlined';
import IconButton from '@material-ui/core/IconButton';
import Select from 'react-select'
import { SUCCESS } from '../../constants/actionTypes'
const options = [
  { value: 1, label: 'Chocolate' },
  { value: 2, label: 'Strawberry' },
  { value: 3, label: 'Vanilla' }
]

export default function BasicTable() {
  const dispatch = useDispatch()
  const [data, setData] = useState([])
  const [user, setUser] = useState([])
  const [select, setSelect] = useState([])
  const selectUser = e => {
    console.log(e.value)
    dispatch({type: SUCCESS, payload: {message: `${select} are set as Moderator successfully`}})
  }
  useEffect(async () => {
    // code to run on component mount
    let result =await  agent.Communities.all()
    setData(result.communities)
    let users = await agent.Auth.all()
    setUser(users.users)
    console.log("_______________", users)
    // dispatch({type: common, payload: result})
  //   axios.get('/api/communities')
  //   .then(function (response) {
  //     setData(response.data.communities)
  //     axios.get('/api/user/all')
  //     .then(function (response) {
  //       setUser(response.data.users)
  
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     })
  //   
  //   .catch(function (error) {
  //     console.log(error);
  //   })
  }, [])
  return (
    <>
    <p className="text-2xl font-bold text text-center mt-4 ">Communities</p> <br/>  
      <Table  aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell align="right">Description</TableCell>
            <TableCell align="right" style={{width: 200}}>User</TableCell>
            <TableCell align="right" ></TableCell>
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
              <Select options={user} onChange={e => setSelect(e.label)}/>
             </TableCell>   
             <TableCell align="right">
              <IconButton aria-label="delete" color="primary" onClick={selectUser}>
                  <AssignmentTurnedInOutlinedIcon fontSize="large" />
              </IconButton>
             </TableCell>           
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </>
  );
}