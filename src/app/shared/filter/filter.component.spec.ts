import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FilterComponent } from './filter.component';
import { DataService } from '../../core/data.service';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

class MockDataService {
  filterData(filterValue: string) {}
}

describe('FilterComponent', () => {
  let component: FilterComponent;
  let fixture: ComponentFixture<FilterComponent>;
  let mockDataService: MockDataService;

  beforeEach(async () => {
    mockDataService = new MockDataService();

    await TestBed.configureTestingModule({
      imports: [FilterComponent, NoopAnimationsModule],
      providers: [
        { provide: DataService, useValue: mockDataService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call dataService.filterData when input event is fired', () => {
    const inputElement = fixture.debugElement.query(By.css('.search-box')).nativeElement;
    const filterSpy = spyOn(mockDataService, 'filterData');

    inputElement.value = 'test';
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(filterSpy).toHaveBeenCalledWith('test');
  });
});
