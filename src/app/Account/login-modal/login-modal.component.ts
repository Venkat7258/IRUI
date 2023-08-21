import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent implements OnInit {
  @Input() name;
  constructor(public activeModal: NgbActiveModal, private modalService: NgbModal, private router: Router) { }
  ngOnInit(): void {
  }
  navigateToComponent(path) {
    this.activeModal.close();
    if (path == "Food")
      this.router.navigate(['/food/dashboard']);
    else
      this.router.navigate(['/cosmetics/dashboard']);
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}