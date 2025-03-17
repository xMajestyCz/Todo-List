import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: false
})
export class HeaderComponent  implements OnInit {

  @Input() public showBackButton: boolean = true;
  @Input() public showTrashButton: boolean = false;
  @Output() trashClicked = new EventEmitter<void>();

  constructor(private location: Location, private router: Router) { }

  ngOnInit() {}

  public goBack(): void{
    this.router.events.subscribe(() => {
      this.showTrashButton = this.router.url.includes('/edit');
    });
		this.location.back();
	}
  TrashTask() {
    this.trashClicked.emit();
  }
}
