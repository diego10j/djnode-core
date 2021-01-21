import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TextoComponent } from './texto.component';

describe('TextoComponent', () => {
  let component: TextoComponent;
  let fixture: ComponentFixture<TextoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextoComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TextoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
