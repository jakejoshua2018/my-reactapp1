import React from 'react';
import * as BootstrapTable from 'react-bootstrap';


const Table = (props: any) => {
    
  let controlsJSX =  (
    <table>
    <thead>
    <tr>
      <th>#</th>
      {Array.from({ length: props.tableLength }).map((_, index) => (
        <th key={index}>Table heading</th>
      ))}
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      {Array.from({ length: props.tableLength }).map((_, index) => (
        <td key={index}>Table cell {index}</td>
      ))}
    </tr>
    <tr>
      <td>2</td>
      {Array.from({ length: props.tableLength }).map((_, index) => (
        <td key={index}>Table cell {index}</td>
      ))}
    </tr>
    <tr>
      <td>3</td>
      {Array.from({ length: props.tableLength }).map((_, index) => (
        <td key={index}>Table cell {index}</td>
      ))}
    </tr>
  </tbody>
  </table>
  );

 

  return (
    <BootstrapTable.Table responsive>
        { controlsJSX }     
    </BootstrapTable.Table>
  );
}

export default Table;
