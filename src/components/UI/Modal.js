import React from 'react'
import ReactDOM from 'react-dom'
import classes from './Modal.module.css'

const Backdrop=props=>{
    return <div className={classes.backdrop} onClick={props.onClick}/>

}

const ModalOverlay=props=>{
    return <div className={classes.modal}>
        <div className={classes.content}>{props.children}</div>
    </div>
}

const Modal = (props) => {
  return (
    <>
    {ReactDOM.createPortal(<Backdrop onClick={props.onClose}/>,document.getElementById('overlay'))}
    {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>,document.getElementById('overlay'))}
    </>
  )
}

export default Modal
