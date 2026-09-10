import { NbComponentStatus } from '@nebular/theme';

export const TASK_STATUS = {
  PENDING: 0,
  IN_PROGRESS: 1,
  DONE: 2,
} as const;

export type TaskStatus = (typeof TASK_STATUS)[keyof typeof TASK_STATUS];

export function getStatusName(status?: number): string {
  switch (status) {
    case TASK_STATUS.PENDING:
      return 'Pendente';
    case TASK_STATUS.IN_PROGRESS:
      return 'Em andamento';
    case TASK_STATUS.DONE:
      return 'Concluída';
    default:
      return 'Não iniciado';
  }
}

export function getStatusColor(status?: number): NbComponentStatus {
  switch (status) {
    case TASK_STATUS.PENDING:
      return 'warning';
    case TASK_STATUS.IN_PROGRESS:
      return 'info';
    case TASK_STATUS.DONE:
      return 'success';
    default:
      return 'basic';
  }
}

export function getRoleName(role?: string): string {
  switch (role) {
    case 'admin':
      return 'Administrador';
    case 'user':
      return 'Usuário';
    default:
      return 'Desconhecido';
  }
}

export function getRoleColor(role?: string): NbComponentStatus {
  switch (role) {
    case 'admin':
      return 'info';
    case 'user':
      return 'success';
    default:
      return 'basic';
  }
}

export function normalizeText(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}
