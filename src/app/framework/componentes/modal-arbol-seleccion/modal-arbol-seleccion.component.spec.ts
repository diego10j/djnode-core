import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalArbolSeleccionComponent } from './modal-arbol-seleccion.component';

describe('ModalArbolSeleccionComponent', () => {
  let component: ModalArbolSeleccionComponent;
  let fixture: ComponentFixture<ModalArbolSeleccionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalArbolSeleccionComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalArbolSeleccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
