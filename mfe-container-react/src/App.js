

import './App.css';
import { useEffect } from 'react';
import { useState } from 'react';
import Modal from "react-bootstrap/Modal";
function App() {
  const [allQuestion,setAllQuestion] = useState([]);
  const [question, setQuestion] = useState()
  const [answer,setAnswer] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenRank, setIsOpenRank] = useState(false);
  const [score,setScore] = useState([0,0]);
  const [allScore,setAllScore] = useState([]);
  const [ranking,setRanking] = useState([]);
  const [randomQ,setRandomQ] = useState(-1);
  const showModal = () => {
    setIsOpen(true);
    setIsOpenRank(false);
  };
  const showModalRank = () => {
    setIsOpenRank(true);
  }

  const hideModalRank = () => {
    setIsOpenRank(false);
  }

  const hideModal = () => {
    setIsOpen(false);
    setAnswer(undefined);
    /*if(allScore) {
      console.log("l'utente vuole solo guardare la classifica");
      setIsOpen(false);
      //setIsOpenRank(true);
      return;
    }
    setIsOpen(false);
    if(isCorrect()) {
      console.log("ha indovinato, l'utente può scegliere un altra domanda");
      //changeQuiz();
      
    } 
    else {
      
      console.log("non ha indovinato, può continuare");
    }
      setAnswer(undefined);*/
  };
  function isCorrect() {
    
    return answer?.toLowerCase() === question?.correct?.toLowerCase();

  }
  function changeQuiz() {
    let random = Math.floor(Math.random() * allQuestion.length);
    if(randomQ === random) {console.log("sono uguali quindi: ",((random++) % allQuestion.length));random = ((random++) % allQuestion.length);}
    console.log("state random",randomQ);
  
    console.log("random var",random);
    setRandomQ(random);
    setQuestion(allQuestion[random]);
    console.log("all question: ",allQuestion);
    setAnswer(undefined);
    const eventParent = new CustomEvent('parentEvent',{detail: allQuestion[random]});
    window.dispatchEvent(eventParent);
    setIsOpen(false);
    setIsOpenRank(false);
  }

  function handleQuestion(event) {
    
     
      setAllQuestion(event.detail);
      console.log("quizzes: ",event.detail);
      let random = Math.floor(Math.random() * event.detail.length);
      setRandomQ(random);
      setQuestion(event.detail[random]);
      console.log("random quiz:", event.detail[random])
     
      const eventParent = new CustomEvent('parentEvent',{detail: event.detail[random]});
      window.dispatchEvent(eventParent);
      console.log("answers of quiz: ", event.detail[random]);
    }  

    function handleAnswer(event) {
        setAnswer(event.detail);
        console.log("container I received: ",event.detail);
        setIsOpenRank(false);  
        
    } 
    function handleRanking() {
      
      showModalRank();
    }
  /*useEffect(() => {
    console.log("initial value ",question);
    
    window.addEventListener('updateCounter',handleQuestion);
  },[question,allQuestion]);*/
  useEffect(() => {
    window.addEventListener('updateCounter',handleQuestion);
    window.addEventListener('onAnswer',handleAnswer);
    window.addEventListener('showRanking',handleRanking);
    let rankingData = [{name: 'Jefferson01',correct: 2, total:5,scorePlayer: Math.floor((2/5)*100)}, { name:'Peter04',correct: 1, total: 3,scorePlayer:Math.floor((1/3)*100)}, {name:'Pepo03',correct: 5, total:6,scorePlayer:Math.floor((5/6)*100)}]   
    setRanking(rankingData);  
  },[]);

  useEffect(() => {
    console.log("update ui of container: ",question);
  },[allQuestion,question])

  useEffect(() => {
    console.log("update ui of container: ",answer);
    if(answer) {
      showModal(); 
      
      //console.log("answer",event.detail);
      if(isCorrect()) {
        setScore((prevState) => {
          console.log("dentro");
          //incremento le domande corrette e le domande totali
          return [prevState[0]++,prevState[1]++];
           
        })
        
      }
      else {
      
      setScore((prevState) => {
        //incremento soltanto le domande totali
        return [prevState[0],prevState[1]++];
        
      })
    }     
    }
  },[answer])
  /*useEffect(() => {
    console.log("initial value ",answer);
    window.addEventListener('onAnswer',handleAnswer);
    if(answer) {
      showModal();   
    }
  },[answer]);*/
  useEffect(() => {
    console.log("update ui for ranking",ranking);
    setAllScore(ranking);
  },[ranking])
  useEffect(() => {
    console.log("Update Single SCORE:",score);
    setAllScore([...ranking,{name: 'you', correct: score[0], total:score[1],scorePlayer:score[1] > 0 ? Math.floor((score[0]/score[1])*100) : 0}]);
    
  },[score])
  useEffect(() => {
    console.log("update Score:",allScore);
    console.log("dentro allscore ranking:",ranking);
    allScore.sort((a,b) => {return b.scorePlayer - a.scorePlayer});
    allScore.sort((a,b) => {return b.total - a.total});
  },[allScore])
  return (
		<>
		<nav className="navbar navbar-expand-lg navbar-light bg-primary py-2">
		<a className="navbar-brand ms-2" href='#'>Web Component</a>
		<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
			<span className="navbar-toggler-icon"></span>
		</button>
		
	</nav>
    <div className='container'>
		
    <div className="row">
      <div className='col-9 mx-auto'>
       <h2>Quiz APP</h2> 
      <app-mfe-1></app-mfe-1>
      </div>
      <div className='col-9 mx-auto mt-2 bg-light' id="chat">
      
      <div className='row'>
      <div className='col-1'></div>    
      <div className='col-6' style={{height:'100px'}} >
        <div className='mx-auto mt-5 rounded-pill bg-info p-2' style={{width:'100%'}}>
        {question ? <p className='my-auto mx-auto text-black fw-bolder text-wrap' style={{width:'100%',display:'inline',minWidth:'150px',fontSize:'1vw'}}>Domanda: {question.title}</p> : <p></p>}
        </div>   
      </div>
      <div className='col-5'></div>
      </div>
      
      <div className='col-12'>
        <p className='text-center'> { !question? 'Genera una domanda e rispondi correttamente':''}</p>
      </div>
      <div className='row'>
      <div className='col-5' style={{height:'100px'}}>
      
      </div>
      <div className='col-6 text-end' style={{height:'100px'}}>
       <div className='mt-3 me-3 rounded-pill bg-primary p-2 text-start'> 
      {answer ? <p className='my-auto  text-black fw-bolder text-wrap' 
       style={{display:'inline',minWidth:'150px',fontSize:'1vw'}}id='answer'>you: {answer}</p>: <p></p>}
      </div>
      </div>
      <div className='col-1'></div>
      </div>
      {answer ? <Modal show={isOpen}>
      <Modal.Header>Quiz</Modal.Header>
      <Modal.Body> {isCorrect() ? <p>Risposta<span className='text-success' > CORRETTA</span>!🥳</p> : <p>Risposta <span className='text-danger'>ERRATA</span>...ritenta🙄</p>}</Modal.Body>
      <Modal.Footer>
        <button className='btn btn-primary' onClick={hideModal}>RETRY</button>
        <button className='btn btn-success' onClick={changeQuiz}>NEXT</button>
      </Modal.Footer>
    </Modal>:  
    <Modal show={isOpenRank}>
    <Modal.Header>Classifica</Modal.Header>
    <Modal.Body>
    <ul className="list-group"> 
     {allScore.map((s,i) => {
          return s.name?.toLowerCase() === 'you' ? s.total > 0 ? <li key={i} className='list-group-item active'>you:  {s.correct} su {s.total} score: {s.scorePlayer}%</li> : <li key={i} className='list-group-item active'>N.D Prima rispondi almeno a un quiz</li> :<li key={i} className='list-group-item'>{s.name}: {s.correct} su {s.total} score:{s.scorePlayer}%</li>
     })}   
    </ul>

    </Modal.Body>
    <Modal.Footer>
      <button className='btn btn-primary' onClick={hideModalRank}>OK</button>
    </Modal.Footer>
  </Modal>
   } 
      </div>
      <div className='col-9 mt-1 mx-auto'>
      <r2w-component></r2w-component>
      </div>
    </div>
    </div>
		</>
  );
}

export default App;
