import React from 'react'
import Select from 'react-select'
import { useState } from 'react'

//stateActions
import { useSelector,useDispatch } from 'react-redux';
import { setPageSize } from '../../state/BookPages';

//url paths
import urls from '../../configurations/urlPaths';

//components
import ExcelExport from '../shared/ExcelExport/ExcelExport';
import MainButton from '../shared/Buttons/MainButton/MainButton';

export default function BooksTopBar({categories}) {
  

  const getFilename =  () => 
  {
    var today = new Date(),
    date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    return `books${date}`
  } 

  const categoriesList = useSelector((state) => state.categories.value.length > 0 ? 
                                                state.categories.value 
                                                  .map((element) => {
                                                    return {
                                                      value: element,
                                                      label: element
                                                    }
                                                  }) :
                                                  []
                                                  );
  const dispatch = useDispatch();

  const [selectedCategories,setSelectedCategories] = useState([{}]);
  const [selectedPageSize,setSelectedPageSize] = useState(useSelector(state => 
    state.bookPages.pageSize));

  const pageSizeList = [{value: 12 , label: '12'},{value: 24 , label: '24'},{value: 36 , label: '36'}];


  return (
    <div className='container col-10' style={{display: 'flex',paddingTop: '2vh',alignItems: 'stretch',justifyContent: 'space-between',borderBottom: '1px solid gray',paddingBottom: '7px'}}>
        <div className='d-flex'>
          <MainButton modalTarget='#addBook' text='Add new book'>
          </MainButton>
          <ExcelExport url={urls.books.exportToExcelAllBooks()} filename={getFilename()}>
          </ExcelExport>
        </div>
        <div style={{width: '700px', height: '42px',padding: 0}}>
          <Select 
            onChange={setSelectedCategories}
            loseMenuOnSelect={false}
            isMulti
            options={categoriesList}
            placeholder='Select one or multiple book categories'
          />
        </div>
        <div style={{width: '100px', height: '42px'}}>
          <Select placeholder='Show'
            defaultValue={pageSizeList.find(x => x.value === selectedPageSize)}
            onChange={change => {setSelectedPageSize(change); dispatch(setPageSize(change.value));}}
            options={pageSizeList}
          />
        </div>
    </div>
  )
}
