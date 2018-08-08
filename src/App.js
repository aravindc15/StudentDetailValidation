import React, { Component } from 'react'
import logo from './logo.svg';
import './App.css';
import Dropzone from 'react-dropzone'
import XLSX from 'xlsx'
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

class App extends Component {
constructor(props){
super(props)
this.state={
filesToBeSent:[]
}
}
 styles = theme => ({
	root: {
	  width: '100%',
	  marginTop: theme.spacing.unit * 3,
	  overflowX: 'auto',
	},
	table: {
	  minWidth: 700,
	},
	row: {
	  '&:nth-of-type(odd)': {
		backgroundColor: theme.palette.background.default,
	  },
	},
  });
 checkIfNumberExists(arr, num) {
   console.log(arr)
  var inArray = false;
  arr.map(function(key){
         //console.log(key) 
      if (key.Phone === num){
          inArray++
      }
  });
  return inArray>1;
}
onDrop(acceptedFiles) {
	let data;
	acceptedFiles.forEach(file => {
        const reader = new FileReader();
        reader.onload = () => {
            const fileAsBinaryString = reader.result;
			// Get the binary file and read 
			var workbook = XLSX.read(fileAsBinaryString, {type:"binary"})	
			var first_sheet_name = workbook.SheetNames[0];
 	  /* Get worksheet */
			var worksheet = workbook.Sheets[first_sheet_name];
			this.setState({filesToBeSent:XLSX.utils.sheet_to_json(worksheet,{raw:true})});
			console.log(this.state.filesToBeSent);
		};
	
		 
        reader.readAsBinaryString(file);
    })
}
render() {
   
return (
<div className="App">

<Dropzone onDrop={(files) => this.onDrop(files)}>
Click here to upload file
</Dropzone>

<Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell numeric>Phone</TableCell>
            <TableCell >Email</TableCell>
            <TableCell numeric>Date of Birth</TableCell>
            <TableCell numeric>Referred By</TableCell>
            <TableCell >Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.state.filesToBeSent.map(n => {
            var status;
            if(this.checkIfNumberExists(this.state.filesToBeSent,n.Phone)){
              status="Repeated"
            }
            else{
              status="Not Repeated"
            }
            return (
              <TableRow >
                <TableCell>
              {n.Name}
                </TableCell>
                <TableCell numeric>{n.Phone}</TableCell>
                <TableCell >{n.Email}</TableCell>
                <TableCell numeric>{n.DateofBirth}</TableCell>
                <TableCell >{n.ReferredBy}</TableCell>
                <TableCell >{status}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  </div>
);
}
}
export default App;
