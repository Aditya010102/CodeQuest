import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionPalette } from './question-palette';

describe('QuestionPalette', () => {
  let component: QuestionPalette;
  let fixture: ComponentFixture<QuestionPalette>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestionPalette]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionPalette);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
