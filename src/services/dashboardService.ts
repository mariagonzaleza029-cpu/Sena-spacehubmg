import { apiFetch } from './api';

export interface AmbienteDetalle {
  nombre: string;
  cantidad: number;
}

export interface DashboardStats {
  totalEquipos: number;
  equiposOperativos: number;
  equiposMantenimiento: number;
  ambientes: number;
  porcentajeOperativos: number;
  porcentajeMantenimiento: number;
  ambientesDetalle: AmbienteDetalle[];
}

export const getDashboardStats = async (): Promise<DashboardStats> => {
  return await apiFetch<DashboardStats>('/dashboard/stats');
};