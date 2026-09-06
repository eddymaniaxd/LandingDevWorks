export interface TechnologyGroup {
  /** Clave usada para buscar el nombre traducido del grupo en
   * src/i18n/translations/*.ts (t.technology.groups[id]). Los nombres de
   * tecnologías (items) son nombres propios y no se traducen. */
  id: "frontend" | "backend" | "data" | "infra";
  items: string[];
}

export const technologies: TechnologyGroup[] = [
  { id: "frontend", items: ["Astro", "Next.js", "React", "TypeScript", "Tailwind CSS"] },
  { id: "backend", items: ["Node.js", "Laravel", "PHP"] },
  { id: "data", items: ["PostgreSQL", "MySQL", "MongoDB"] },
  { id: "infra", items: ["Docker", "AWS", "Nginx", "GitHub"] },
];
