// Temperature units. All HKO data arrives in Celsius; we convert at render.

export type TempUnit = "C" | "F";

export function convertTemp(celsius: number, unit: TempUnit): number {
  return unit === "F" ? celsius * (9 / 5) + 32 : celsius;
}

/** Convert from Celsius to the chosen unit and round to a whole degree. */
export function formatTemp(celsius: number, unit: TempUnit): number {
  return Math.round(convertTemp(celsius, unit));
}
