import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearIComponent } from './crear-i.component';

describe('CrearIComponent', () => {
  let component: CrearIComponent;
  let fixture: ComponentFixture<CrearIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearIComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
