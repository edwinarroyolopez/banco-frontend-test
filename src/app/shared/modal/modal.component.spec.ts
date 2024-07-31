import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalComponent } from './modal.component';
import { ModalService } from '../../core/modal.service';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;
  let modalServiceSpy: jasmine.SpyObj<ModalService>;

  beforeEach(async () => {

    const spy = jasmine.createSpyObj('ModalService', ['confirm', 'closeModal'], {
      message$: of('Test message')
    });

    await TestBed.configureTestingModule({
      imports: [ModalComponent, CommonModule, FormsModule],
      providers: [
        { provide: ModalService, useValue: spy }
      ]
    }).compileComponents();

    modalServiceSpy = TestBed.inject(ModalService) as jasmine.SpyObj<ModalService>;

    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should display the message when message$ emits a value', () => {
    fixture.detectChanges();
    const messageElement: HTMLElement = fixture.nativeElement.querySelector('.message')!;
    expect(messageElement.textContent).toBe('Test message');
  });

  it('should call confirm method of ModalService when Confirmar button is clicked', () => {
    fixture.detectChanges();

    const confirmButton = fixture.nativeElement.querySelector('.confirm-button')!;
    confirmButton.click();

    expect(modalServiceSpy.confirm).toHaveBeenCalled();
  });

  it('should call closeModal method of ModalService when Cancelar button is clicked', () => {
    fixture.detectChanges();

    const cancelButton = fixture.nativeElement.querySelector('.cancel-button')!;
    cancelButton.click();

    expect(modalServiceSpy.closeModal).toHaveBeenCalled();
  });

  it('should hide the modal when the message is empty', () => {
    modalServiceSpy.message$ = of('');
    fixture.detectChanges();
    const modalElement: HTMLElement = fixture.nativeElement.querySelector('.modal')!;
    expect(modalElement).toBeTruthy();
  });
});
