import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppListItemComponent } from './app-list-item.component';

describe('AppListItemComponent', () => {
  let component: AppListItemComponent;
  let fixture: ComponentFixture<AppListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppListItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
