/**
* Created on 12/09/19.
* Author : Swapnil Patil
* Details :  Coordinate maps functional component
*/

import React from 'react';

/**
* MapsTable function.
* @function MapsTable
* @description Function to show coordinates in tabular format with click functionality.
*/
const MapsTable = (props) => {

    const {columns, rows} = props.data;

    /**
	* return function 
	* @method MapsTable#return
	* @description returning MapsTable component.
	*/
    return (
        <div>
            <table className="table table-bordered table-hover" width="100%">
                <thead>
                    <tr>
                        {
                            columns.map(function(column, index) {
                                return <th key={index}>{column}</th>; })
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        rows.map( (row, index) => {
                            return (
                                    <tr onClick={()=>props.onTableRowClick(row)} key={index}>
                                        {
                                            columns.map(function(column,index) {
                                            return <td key={index}>{row[column]}</td>; })
                                        }
                                    </tr>
                                )
                        })
                    }
                </tbody>
            </table>
        </div>
    );
}

export default MapsTable;
