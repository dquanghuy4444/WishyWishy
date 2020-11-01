import React from 'react';
import exportFromJSON from 'export-from-json';

export default function ButtonExportJSON({data , children }) {
    
    const onClickDownloadJsonFile = async () =>{ 
        const fileName = 'download';
        const exportType = 'json';
         
        await exportFromJSON({ data, fileName, exportType })
      }
    return (      
        <div onClick={ onClickDownloadJsonFile } style={{ cursor : "pointer"}}>
            { children }
        </div>
    );
}
