import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BloqueosPage } from './bloqueos.page';

describe('BloqueosPage', () => {
  let component: BloqueosPage;
  let fixture: ComponentFixture<BloqueosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BloqueosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BloqueosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
