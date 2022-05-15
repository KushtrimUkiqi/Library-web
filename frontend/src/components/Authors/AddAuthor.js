import React from 'react'

//hooks
import { useState, useEffect, useRef} from 'react';

//api service
import HttpClientService from '../../services/HttpClient';

//notification manager
import NotificationManager from 'react-notifications/lib/NotificationManager';

export default function AddAuthor({name,surname,countryID}) {
  
  const[countries,setCountries] = useState([])
  const [authorData,setAuthorData] = useState(generateAuthorDataObject(name,surname,countryID))

  function generateAuthorDataObject(name = undefined,surname = undefined, countryID = undefined)
  {
    return {
      name: name,
      surname: surname,
      countryID: countryID
    }
  }

  function checkAuthorValidityData()
  {
    return authorData
  }

  let loading = false;

  async function fetchCountries()
  { 
    HttpClientService.fetchCountries(0,100)
      .then(
        response => {
          setCountries(response.data.map(element => {
            { return {value: `${element.id}`, label: `${element.name}`}}
          }));
        }
      )
  }

    async function submitform(){
      loading = true;
      console.log(authorData)
      HttpClientService
        .addAuthor(authorData.name,authorData.surname,authorData.countryID)
          .then(response => {
            loading = false;
            NotificationManager.success('Successfully added new book', '');
          })
          .catch(error => {
            loading = false;
            NotificationManager.error('Could not proccess the request', 'Error!', 2000);
          })
    }

    function submitForm(){
      submitform();
    }


    useEffect(() => {
      fetchCountries()
    },[]);

    const setName = (name) => setAuthorData(generateAuthorDataObject(name,authorData.surname,authorData.countryID));
    const setSurname = (surname) => setAuthorData(generateAuthorDataObject(authorData.name,surname,authorData.countryID));
    const setCountry = (countryId) => setAuthorData(generateAuthorDataObject(authorData.name,authorData.surname,countryId));

  return (
    <div className="modal show" data-bs-backdrop="static" id="addAuthor" tabIndex="-1" aria-labelledby="addAuthor" aria-hidden="true">
    <div className="modal-dialog modal-lg">
      <div className="modal-content">
        <div className="modal-header" style={{backgroundColor: ''}}>
          <h5 className="modal-title" id="exampleModalLabel">Add new author</h5>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div>
        {loading && <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div> }
        <div  style={{padding: '0 10px'}}>
        <div className="mb-3">
              <label htmlFor="authorname" className="form-label">Author name:</label>
              <input  id='authorName'  className="form-control form-select-sm" type="text" onChange={(event) => setName(event.target.value)} />
        </div>
        <div className="mb-3">
              <label htmlFor="authorSurname" className="form-label">Author surname:</label>
              <input  id='authorSurname'  className="form-control form-select-sm" type="text" onChange={(event) => setSurname(event.target.value)}/>
        </div>
        <div className="mb-3">
              <label htmlFor="bookName" className="form-label">Country</label>
              <select className="form-select form-select-sm" aria-label=".form-select-sm example" onChange={(event) => setCountry(event.target.value)}>
                  <option selected></option>
                  {countries.map((country,index) => <option key={index} value={country.value}>{country.label}</option>)}
              </select>
        </div>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button onClick={() => submitForm()} style={{backgroundColor: 'rgba(2,18,43,255)'}} type="button" className="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>
    </div>
  </div>
  )
}
