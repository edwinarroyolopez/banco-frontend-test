import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { FilterComponent } from '../../shared/filter/filter.component';
import { TableComponent } from '../../shared/table/table.component';
import { ModalComponent } from '../../shared/modal/modal.component';
import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DataService } from '../../core/data.service';
import { By } from '@angular/platform-browser';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HomeComponent,
        FilterComponent,
        TableComponent,
        ModalComponent,
        CommonModule,
        HttpClientTestingModule
      ],
      providers: [
        DataService
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should open the modal when the button is clicked', () => {
    const button = fixture.debugElement.query(By.css('button'));
    button.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(component.isModalOpen).toBeTrue();
    const modal = fixture.debugElement.query(By.css('app-modal'));
    expect(modal).toBeTruthy();
  });

  it('should close the modal when closeModal is called', () => {
    component.isModalOpen = true;
    fixture.detectChanges();
    component.closeModal();
    fixture.detectChanges();
    expect(component.isModalOpen).toBeFalse();
    const modal = fixture.debugElement.query(By.css('app-modal'));
    expect(modal).toBeFalsy();
  });
});
