

import './App.css';
import { useEffect } from 'react';
import { useState } from 'react';
import Modal from "react-bootstrap/Modal";
function App() {
  const [allQuestion,setAllQuestion] = useState([]);
  const [question, setQuestion] = useState()
  const [answer,setAnswer] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [correct,setCorrect] = useState(false);

  const showModal = () => {
    setIsOpen(true);
  };

  const hideModal = () => {
    setIsOpen(false);
    if(isCorrect()) {
      console.log("ha indovinato, l'utente può scegliere un altra domanda");
      changeQuiz();
    } 
    else {
      setAnswer(undefined);
      console.log("non ha indovinato, può continuare");}
  
  };
  function isCorrect() {
    
    return answer?.toLowerCase() === question?.correct?.toLowerCase();

  }
  function changeQuiz() {
    let random = Math.floor(Math.random() * allQuestion.length);
    setQuestion(allQuestion[random]);
    console.log("all question: ",allQuestion);
    setAnswer(undefined);
    const eventParent = new CustomEvent('parentEvent',{detail: allQuestion[random]});
    window.dispatchEvent(eventParent);
    setIsOpen(false);
  }

  function handleQuestion(event) {
    
    console.log("sono qui");
      setAllQuestion(event.detail);
      console.log("domande: ",event.detail);
      let random = Math.floor(Math.random() * event.detail.length);
      setQuestion(event.detail[random]);
      console.log("question",event.detail[random]);
      const eventParent = new CustomEvent('parentEvent',{detail: event.detail[random]});
      window.dispatchEvent(eventParent);
      
    
  }  
    function handleAnswer(event) {
      console.log("sono qui");
      
        setAnswer(event.detail);
        console.log("answer",event.detail);
        
    } 
    
  useEffect(() => {
    console.log("initial value ",question);
    
    window.addEventListener('updateCounter',handleQuestion);
  },[question,allQuestion]);

  useEffect(() => {
    console.log("initial value ",answer);
    window.addEventListener('onAnswer',handleAnswer);
    if(answer) {
      showModal();   
    }
  },[answer]);
  
  
  return (
		<>
		<nav className="navbar navbar-expand-lg navbar-light bg-primary py-2">
		<a className="navbar-brand">Web Component</a>
		<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
			<span className="navbar-toggler-icon"></span>
		</button>
		
	</nav>
    <div className='container'>
		
    <div className="row">
      <div className='col-9 mx-auto'>
      <app-mfe-1></app-mfe-1>
      </div>
      <div className='col-9 mx-auto bg-light' id="chat">
      
      <div className='row'>  
      <div className='col-6' style={{height:'100px'}} >
        <div className='mx-auto mt-5' style={{width:'100%'}}>
        {question ? <p className='my-auto mx-auto rounded-pill bg-info p-2 text-black fw-bolder text-wrap' style={{width:'100%',display:'inline',minWidth:'150px'}}>Domanda: {question.title}</p> : <p></p>}
        </div>   
      </div>
      <div className='col-6'></div>
      </div>
      
      <div className='col-12'>
        <p className='text-center'> { !question? 'Genera una domanda e rispondi correttamente':''}</p>
      </div>
      <div className='row'>
      <div className='col-6' style={{height:'100px'}}>
      
      </div>
      <div className='col-6 text-end' style={{height:'100px'}}>
       <div className='mt-3 me-3'> 
      {answer ? <p className='my-auto rounded-pill bg-primary p-2 text-black fw-bolder text-wrap' style={{display:'inline',minWidth:'150px'}}id='answer'>you: {answer}</p>: <p></p>}
      </div>
      </div>
      </div>
      <Modal show={isOpen}>
      <Modal.Header>Quiz</Modal.Header>
      <Modal.Body> {isCorrect() ? <p>Risposta<span className='text-success' > CORRETTA</span>!🥳</p> : <p>Risposta <span className='text-danger'>ERRATA</span>...ritenta🙄</p>}</Modal.Body>
      <Modal.Footer>
        <button className='btn btn-primary' onClick={hideModal}>RETRY</button>
        <button className='btn btn-success' onClick={changeQuiz}>NEXT</button>
      </Modal.Footer>
    </Modal> 
      </div>
      <div className='col-9 mx-auto'>
      <r2w-component></r2w-component>
      </div>
    </div>
    </div>
		</>
  );
}

export default App;
