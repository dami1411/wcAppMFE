import React, { useEffect, useState } from "react"
import { useForm } from 'react-hook-form'
import  * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
export const WcComponent = () => {
    const schema = yup.object().shape({
         
       answerSel:yup.string().required("seleziona una risposta")
     })
       
      const { register, handleSubmit, formState:{errors}, reset} = useForm({
        resolver:yupResolver(schema)
    });
    const [message,setMessage] = useState('');
    const [answer,setAnswer] = useState('');
    const [question,setQuestion] = useState({});

    const onSubmit = (data) => {
        console.log("answer get from form: ",data);
        //setMessage(data?.answerSel);
        console.log("answer get onchange:",answer);
        
        const event = new CustomEvent('onAnswer',{detail: data?.answerSel});
        window.dispatchEvent(event);
        console.log("answer sent via custom event:", data?.answerSel);
        reset();
    }
    function getAnswer(data) {
        switch(answer) {
            case data?.answer0:
                return data?.answer0;
            case data?.answer1:
                return data?.answer1;
            case data?.answer2:
                return data?.answer2;
            default:
                break;            
        }
    }
    const handleCustomEvent = (event) => {
        //console.log("Dati ricevuti in react component",event.detail);
        //setMessage(event.detail);
        //setQuestion(event.detail);
        setQuestion(event.detail);
    }
    function handleChange(e) {
        console.log("checcked answer:",e.target.value);
        setAnswer(e.target.value);
    }
    function handleRanking() {
        const event = new CustomEvent('showRanking');
        window.dispatchEvent(event);
    }
    /*useEffect(() => {
        
        window.addEventListener('parentEvent',handleCustomEvent);
        
    },[/*message,question])*/
    useEffect(() => {
     console.log("upadate UI:",question);
    },[question] )

    useEffect(() => {
        window.addEventListener('parentEvent',handleCustomEvent)
    },[])
    return (
    <div style={{width:'90%'}}>
    
    <form onSubmit={handleSubmit(onSubmit)} className="row">    
    <div className={question?.answers?.length > 0 ? "mb-3 mt-1 col-6": 'mb-3 mt-1 col-6 bg-light'} style={{height:'100px'}}>
    {question?.answers?.length > 0 ? <p  className="mb-0">Options:</p> : <div className="d-flex align-items-center h-100"><p  className="mx-auto">Qui potrai scegliere la risposta</p></div> }
    {question?.answers?.length > 0 ? question?.answers.map((ans,i) => { return <div key={i}  className="form-check"><input className="form-check-input" type="radio"   id={i} name="answerRadio" value={ans} onChange={handleChange} key={i} {...register('answerSel')}/><label className="form-check-label" htmlFor={i}>{ans}</label></div>}):''}
    {question?.answers?.length > 0 ? <button className="btn btn-primary mt-1"  type="submit">send</button>: ''}
   </div>
    
     <div className="col-6">
        <h2>Guarda la Classifica</h2>
        <button className="btn btn-success" type="button" onClick={handleRanking}>show</button>
     </div>
     </form>
    </div>
    
    )
    
}