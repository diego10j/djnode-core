import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HoraComponent } from './hora.component';

describe('HoraComponent', () => {
  let component: HoraComponent;
  let fixture: ComponentFixture<HoraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HoraComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
