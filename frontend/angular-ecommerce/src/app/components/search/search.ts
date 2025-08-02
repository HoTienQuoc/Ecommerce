import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  imports: [],
  templateUrl: './search.html',
  styleUrl: './search.scss'
})
export class Search implements OnInit{
  constructor(private router: Router){}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  doSearch(value: string){
    this.router.navigateByUrl(`/search/${value}`)
  }

}
