import {React,useRef} from 'react'

//image
import close from '../../images/close.svg'

export default function ReturnBook({book}) {

  const id = useRef(0);
  const name = useRef('');

  return (
    <div className="modal fade" data-bs-backdrop="static" id="returnBook" tabIndex="-1" aria-labelledby="returnBook" aria-hidden="true">
  <div className="modal-dialog modal-lg">
    <div className="modal-content">
    <div className="modal-header" style={{backgroundColor: 'rgba(2,18,43,255)',color: 'white',padding: '2vh 7px',display: 'flex', alignItems: 'flex-end'}}>
                <h6>
                   {`${'RETURN THE BOOK: '} ${book.bookName} - ${book.author}`} 
                </h6>
                <button type="button" data-bs-dismiss="modal" aria-label="Close" style={{backgroundColor: 'var(--main)',border: 'none'}}>
                    <img src={close} alt="close modal" />
                </button>
      </div>
      <div className="modal-body">
      <div className="mb-3">
            <label htmlFor="customer" className="form-label">Customer id:</label>
            <input id='customer' ref={id} className="form-control" type="number" min={0} placeholder="0" aria-label="default input example"/>
        </div>
        <div className="mb-3">
            <label htmlFor="customer" className="form-label">Customer fullname:</label>
            <input id='customer' ref={name} className="form-control" type="text" placeholder="Kushtrim Ukiqi" aria-label="default input example"/>
        </div>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button style={{backgroundColor: 'rgba(2,18,43,255)'}} type="button" className="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
  )
}
