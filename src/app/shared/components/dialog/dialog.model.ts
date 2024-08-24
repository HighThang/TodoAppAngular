export interface DialogData {
  title: string;
  message?: string;
  onConfirm: () => void;
  onCancel: () => void;
  isConfirmDialog?: boolean;
}