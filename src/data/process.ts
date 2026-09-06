export interface ProcessStep {
  /** Clave usada para buscar el título/descripción traducidos en
   * src/i18n/translations/*.ts (t.process.steps[id]). */
  id: "descubrimos" | "disenamos" | "desarrollamos" | "medimos" | "mejoramos";
  number: string;
}

export const processSteps: ProcessStep[] = [
  { id: "descubrimos", number: "01" },
  { id: "disenamos", number: "02" },
  { id: "desarrollamos", number: "03" },
  { id: "medimos", number: "04" },
  { id: "mejoramos", number: "05" },
];
