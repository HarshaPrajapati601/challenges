import { Component, OnInit } from '@angular/core';
import { NgForm , FormBuilder , Validators, FormGroup} from '@angular/forms';
import { ChallengDataService } from '../_service/challeng-data.service';

@Component({
  selector: 'app-challenges',
  templateUrl: './challenges.component.html',
  styleUrls: ['./challenges.component.css']
})
export class ChallengesComponent implements OnInit {
  challengeFormGroup : FormGroup;
  loading = false;
  submitted = false;
  constructor(
    private fb : FormBuilder,
    private challengeService : ChallengDataService
  ) { }

  ngOnInit() {
    this.challengeFormGroup = this.fb.group({
      challangeName: ['',[Validators.required , Validators.maxLength(10)]],
      description:   ['',[Validators.required, Validators.maxLength(500)]],
      tag     :    ['', Validators.required]
     });
  }
  get f(){
    return this.challengeFormGroup.controls;
  }

  onSubmit(){
    console.log(this.challengeFormGroup.value);
    this.submitted = true;
    this.challengeService.addChallenges(this.f.challangeName.value , this.f.description.value , this.f.tag.value)
    
  }

}


