import React from 'react';
import { CSVLink } from "react-csv";

export default function ButtonExportCSV({data  , headers , filename , children }) {
    
    const csvReport = {
        data: data,
        headers: headers,
        filename: filename,
    };
    return (
        
        <CSVLink {...csvReport} style={{ textDecoration : 'none' }}>
            { children }
        </CSVLink>
    );
}

