import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalCalendarioSeleccionComponent } from './modal-calendario-seleccion.component';

describe('ModalCalendarioSeleccionComponent', () => {
  let component: ModalCalendarioSeleccionComponent;
  let fixture: ComponentFixture<ModalCalendarioSeleccionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalCalendarioSeleccionComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalCalendarioSeleccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
