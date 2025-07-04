import {ChangeDetectionStrategy, Component, input, output} from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponent {
  header = input<string>('');
  save = output();
  cancel = output();

  onCancel() {
    this.cancel.emit();
  }

  onSave() {
    this.save.emit();
  }
}
