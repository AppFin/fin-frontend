import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SearchDialogComponent } from './search-dialog.component';

describe('SearchDialogComponent', () => {
    let component: SearchDialogComponent;
    let fixture: ComponentFixture<SearchDialogComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [SearchDialogComponent, NoopAnimationsModule],
            providers: [
                {
                    provide: MatDialogRef,
                    useValue: {
                        close: jasmine.createSpy('close')
                    }
                }
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(SearchDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
