import React from 'react';

//http api calls
import HttpClientService from '../../../services/HttpClient'

//images
import exportToExcelImage from '../../../images/excel.png'

//notifications
import {NotificationManager} from 'react-notifications';

//file saver library
import fileDownload from 'js-file-download'
import FileSaver from 'file-saver';


const ExcelExport = ({url,filename}) => {

    async function exportToExcel()
    {
    HttpClientService.exportToExcel(url)
        .then((response) => {
            
            FileSaver.saveAs(response.data,`${filename}.xlsx`);
            NotificationManager.success('Successfully downloaded', '');
        })
        .catch(error => {
            NotificationManager.error('Could not proccess the request', 'Error!', 2000);
        })
    }


    return (
        <button className='btn col-2 btn-primary d-flex justify-content-center align-items-center' 
            style={{height: '42px',
                  width: '40px',
                  color: 'white',
                  backgroundColor: 'white',
                  borderColor: 'rgba(2,18,43,255)'}} 
            data-toggle="tooltip" data-html="true" title="Export all books to excel"
            onClick={exportToExcel}>
          
            <img src={exportToExcelImage} width='25px' height='25px' alt='exportToExcel'/>
      
        </button>
    );
}

export default ExcelExport;
