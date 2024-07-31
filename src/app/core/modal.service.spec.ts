import { TestBed } from '@angular/core/testing';
import { ModalService } from './modal.service';

describe('ModalService', () => {
  let service: ModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ModalService]
    });

    service = TestBed.inject(ModalService);
  });

  it('should open the modal with the given message and set the confirm action', () => {
    const spyConfirmAction = jasmine.createSpy('confirmAction');
    const testMessage = 'Test message';

    service.openModal(testMessage, spyConfirmAction);

    service.message$.subscribe(message => {
      expect(message).toBe(testMessage);
    });
    expect(spyConfirmAction).not.toHaveBeenCalled();
  });

  it('should call confirm action and close the modal', () => {
    const spyConfirmAction = jasmine.createSpy('confirmAction');
    const testMessage = 'Test message';

    service.openModal(testMessage, spyConfirmAction);
    service.confirm();

    expect(spyConfirmAction).toHaveBeenCalled();
    service.message$.subscribe(message => {
      expect(message).toBe('');
    });
  });

  it('should close the modal and clear the message', () => {
    const spyConfirmAction = jasmine.createSpy('confirmAction');
    const testMessage = 'Test message';

    service.openModal(testMessage, spyConfirmAction);
    service.closeModal();

    service.message$.subscribe(message => {
      expect(message).toBe('');
    });
  });
});
