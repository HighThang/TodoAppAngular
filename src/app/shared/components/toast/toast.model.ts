export interface Toast {
    id: number;
    title: string;
    message: string;
    type: 'success' | 'danger' | 'primary' | 'warning';
}