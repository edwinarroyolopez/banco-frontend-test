// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { HomeComponent } from './home.component';
// import { FilterComponent } from '../../shared/filter/filter.component';
// import { TableComponent } from '../../shared/table/table.component';
// import { ModalComponent } from '../../shared/modal/modal.component';
// import { By } from '@angular/platform-browser';
// import { CommonModule } from '@angular/common';

// describe('HomeComponent', () => {
//   let component: HomeComponent;
//   let fixture: ComponentFixture<HomeComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [
//         CommonModule,
//         HomeComponent,
//         FilterComponent,
//         TableComponent,
//         ModalComponent
//       ]
//     }).compileComponents();

//     fixture = TestBed.createComponent(HomeComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should open modal when openModal is called', () => {
//     component.openModal();
//     expect(component.isModalOpen).toBeTrue();
//   });

//   it('should close modal when closeModal is called', () => {
//     component.openModal(); // Open it first
//     component.closeModal();
//     expect(component.isModalOpen).toBeFalse();
//   });

//   it('should display modal when isModalOpen is true', () => {
//     component.openModal();
//     fixture.detectChanges();
//     const modalElement = fixture.debugElement.query(By.css('app-modal'));
//     expect(modalElement).not.toBeNull();
//   });

//   it('should hide modal when isModalOpen is false', () => {
//     component.closeModal();
//     fixture.detectChanges();
//     const modalElement = fixture.debugElement.query(By.css('app-modal'));
//     expect(modalElement).toBeNull();
//   });

//   it('should call openModal method when Add button is clicked', () => {
//     spyOn(component, 'openModal');
//     const button = fixture.debugElement.query(By.css('button')).nativeElement;
//     button.click();
//     fixture.detectChanges();
//     expect(component.openModal).toHaveBeenCalled();
//   });
// });
