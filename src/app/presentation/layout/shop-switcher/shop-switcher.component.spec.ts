import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopSwitcherComponent } from './shop-switcher.component';

describe('ShopSwitcherComponent', () => {
  let component: ShopSwitcherComponent;
  let fixture: ComponentFixture<ShopSwitcherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShopSwitcherComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopSwitcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
