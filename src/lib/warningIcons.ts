// Maps HKO warnings/signals to their official signal graphics.
// Uses the high-resolution PNG set under /images/HKOWarningSymbols/
// (the same artwork the Observatory's own homepage uses), in preference to
// the older low-resolution .gif icons. Filenames discovered from the HKO
// homepage bundle (js/menu.js); some contain a literal space, encoded here.

const IMAGE_BASE = "https://www.hko.gov.hk/images/HKOWarningSymbols";

// Specific signal codes (warnsum entry `.code`) → graphic filename.
const BY_CODE: Record<string, string> = {
  // Tropical cyclone warning signals
  TC1: "warn800_01_tc1.png",
  TC3: "warn800_02_tc3.png",
  TC8NE: "warn800_03_tc08ne.png",
  TC8NW: "warn800_04_tc08nw.png",
  TC8SE: "warn800_05_tc08se.png",
  TC8SW: "warn800_06_tc08sw.png",
  TC9: "warn800_07_tc09.png",
  TC10: "warn800_08_tc10.png",
  // Rainstorm warnings
  WRAINA: "warn800_09_rain%20amber.png",
  WRAINR: "warn800_10_rain%20red.png",
  WRAINB: "warn800_11_rain%20black.png",
  // Fire danger warnings
  WFIREY: "warn800_17_fire%20yellow.png",
  WFIRER: "warn800_18_fire%20red.png",
};

// Warning statement codes (warnsum key) → graphic filename. Used when there is
// no per-level `.code`, since these signals have a single graphic.
const BY_STATEMENT: Record<string, string> = {
  WTS: "warn800_12_ts.png", // Thunderstorm Warning
  WFNTSA: "warn800_13_northflood.png", // Flooding in the northern New Territories
  WL: "warn800_14_ls.png", // Landslip Warning
  WMSGNL: "warn800_15_sms.png", // Strong Monsoon Signal
  WFROST: "warn800_16_frost.png", // Frost Warning
  WCOLD: "warn800_19_cold.png", // Cold Weather Warning
  WHOT: "warn800_20_hot.png", // Very Hot Weather Warning
};

/**
 * Resolve the official HKO signal graphic for a warning.
 *
 * @param statementCode The warnsum key (e.g. "WTCSGNL", "WRAIN", "WFIRE").
 * @param code          The entry's specific `.code` (e.g. "TC8NE", "WRAINR").
 * @param type          The entry's `type` (e.g. "Y" / "R" for fire danger).
 * @returns Fully-qualified graphic URL, or null when no graphic applies.
 */
export function warningIconUrl(
  statementCode: string,
  code?: string,
  type?: string,
): string | null {
  const c = code?.toUpperCase();
  if (c && BY_CODE[c]) return `${IMAGE_BASE}/${BY_CODE[c]}`;

  const s = statementCode.toUpperCase();

  // Fire danger may arrive as WFIRE with type "Y"/"R" instead of a WFIREx code.
  if (s.startsWith("WFIRE")) {
    const t = type?.toUpperCase();
    if (t === "R") return `${IMAGE_BASE}/${BY_CODE.WFIRER}`;
    if (t === "Y") return `${IMAGE_BASE}/${BY_CODE.WFIREY}`;
  }

  if (BY_STATEMENT[s]) return `${IMAGE_BASE}/${BY_STATEMENT[s]}`;
  return null;
}
