import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CitasEnProcesoComponent } from './citas-en-proceso.component';

describe('CitasEnProcesoComponent', () => {
  let component: CitasEnProcesoComponent;
  let fixture: ComponentFixture<CitasEnProcesoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CitasEnProcesoComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CitasEnProcesoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
