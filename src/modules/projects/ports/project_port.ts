import type { ProjectReference } from "../domain/types";

/**
 * Puerto hacia el módulo de proyectos.
 * Unidades no importa services/projects: solo esta interfaz.
 * Cuando modularices proyectos, cambia el adapter y el resto no se toca.
 */
export interface ProjectLookup {
  findById(id: string): Promise<ProjectReference | null>;
  findByCodigo(codigo: string): Promise<ProjectReference | null>;
}
