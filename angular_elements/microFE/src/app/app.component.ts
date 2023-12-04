import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs';
import data from './assets/questions.json'
interface IQuestion {
  
  correct:string;
  title: string;
  category:string,
  answers:string[];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  @ViewChild('cats') cats!: ElementRef;
  catSelected:string = '';
  message!:string
  categories:string[] = ['sport','scienze','gossip'];
  questions: IQuestion[] = {} as any;
  filterQuestions:any;
  
  onSelected(){
    this.catSelected = this.cats.nativeElement.value;
    this.filterQuestions = this.questions.filter((q) => {
    
      return q.category === this.catSelected;
    
    })
    this.sendData();
  }
  ngOnInit(): void {
    this.questions = data;
    
    fromEvent(window,'parentEvent').subscribe((event:any) => {
      this.message = event.detail;
    })
  }
  title = 'microFE';
  sendData(){
    const event = new CustomEvent('updateCounter',{detail:this.filterQuestions});
    window.dispatchEvent(event);
  }
}
