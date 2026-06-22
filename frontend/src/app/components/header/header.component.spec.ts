import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    const authService = jasmine.createSpyObj<AuthService>('AuthService', [
      'isAuthenticated',
      'logout',
    ]);
    authService.isAuthenticated.and.returnValue(true);

    await TestBed.configureTestingModule({
      imports: [RouterModule.forRoot([])],
      declarations: [HeaderComponent],
      providers: [{ provide: AuthService, useValue: authService }],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    fixture.detectChanges();
  });

  it('should show the application name', () => {
    expect(fixture.nativeElement.textContent).toContain('Danylo Todo');
  });
});
