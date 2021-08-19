import React, {forwardRef} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import MaterialTable from 'material-table'

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import Switch from '@material-ui/core/Switch';
import { Link } from '@material-ui/core';
const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function SimpleTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
       <p className="text-2xl font-bold text text-center pt-4 ">Admin Management</p>      
         <Divider /><br/>
      <AppBar position="static" color="default">
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="List of User" {...a11yProps(0)} />
          <Tab label="List of Posts" {...a11yProps(1)} />
          <Tab label="List of Orders" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>

      <MaterialTable
        icons={tableIcons}
        title="r/football community members"
        columns={[
          { title: 'Avatar', field: 'imageUrl', render: rowData => <img src={rowData.imageUrl} style={{width: 40, borderRadius: '50%'}}/> },
          { title: 'Name', field: 'name' },
          { title: 'Gmail', field: 'gmail' },
          { title: 'Join Date', field: 'joinDate', type: 'date' },
          {
            title: 'Action', field: 'active', render: rowData =>  <Switch
            checked= {rowData.active}
            // onChange={handleChange}
            name="checkedA"
            inputProps={{ 'aria-label': 'secondary checkbox' }}
          /> 
          },
        ]}
        data={[
          { name: 'Mehmet', gmail: 'superdev5597@gmail.com', joinDate: '2021-8-2', active: true, imageUrl: 'https://avatars0.githubusercontent.com/u/7895451?s=460&v=4' },
          { name: 'Zerya Betül', gmail: 'demo3@gmail.com', joinDate: '2021-8-3', active: false, imageUrl: 'https://avatars0.githubusercontent.com/u/7895451?s=460&v=4' },
        ]}        
      />
      </TabPanel>
      <TabPanel value={value} index={1}>
      <MaterialTable
        icons={tableIcons}
        title="r/football community posts"
        columns={[
          { title: 'Title', field: 'title' ,
            render: rowData =>  <Link to="#">{rowData.title}</Link> },
          { title: 'Published Date', field: 'publishedDate' },
          { title: 'comments', field: 'comments'},
          {
            title: 'Action', field: 'active', render: rowData =>  <Switch
            checked= {rowData.active}
            // onChange={handleChange}
            name="checkedA"
            inputProps={{ 'aria-label': 'secondary checkbox' }}
          /> 
          },
        ]}
        data={[
          { title: 'Mehmet', comments: 0, publishedDate: '2021-8-2', active: true },
          { title: 'Zerya Betül', comments: 0, publishedDate: '2021-8-3', active: false },
        ]}        
      />
      </TabPanel>
      <TabPanel value={value} index={2}>
      <MaterialTable
        icons={tableIcons}
        title="Orders"
        columns={[
          { title: 'Title', field: 'title' ,
            render: rowData =>  <Link to="#">{rowData.title}</Link> },
          { title: 'Published Date', field: 'publishedDate' },
          { title: 'Price', field: 'comments'},
          { title: 'State', field: 'state'},
         
        ]}
        data={[
          { title: 'Mehmet', comments: 0, publishedDate: '2021-8-2', state: "preparing" },
          { title: 'Zerya Betül', comments: 0, publishedDate: '2021-8-3', state: "shiped" },
        ]}        
      />
      </TabPanel>
    </div>
  );
}