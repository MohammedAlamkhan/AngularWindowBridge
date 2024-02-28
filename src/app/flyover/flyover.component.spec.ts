import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlyoverComponent } from './flyover.component';

describe('FlyoverComponent', () => {
  let component: FlyoverComponent;
  let fixture: ComponentFixture<FlyoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlyoverComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FlyoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
