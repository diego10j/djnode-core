import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalTablaSeleccionComponent } from './modal-tabla-seleccion.component';

describe('ModalTablaSeleccionComponent', () => {
  let component: ModalTablaSeleccionComponent;
  let fixture: ComponentFixture<ModalTablaSeleccionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalTablaSeleccionComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalTablaSeleccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
