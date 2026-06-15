import type {
  CurrentWeather,
  Lang,
  WarningInfo,
  WarningSummary,
} from "../api/types";
import { formatUpdateTime } from "../lib/format";
import { warningIconUrl } from "../lib/warningIcons";

interface Props {
  warnings: WarningSummary | null;
  info: WarningInfo | null;
  current: CurrentWeather | null;
  lang: Lang;
}

type Severity = "amber" | "red" | "black";

/** Infer a display severity from an HKO warning code. */
function severityOf(code: string | undefined): Severity {
  if (!code) return "amber";
  const c = code.toUpperCase();
  // Rainstorm: WRAINA (amber) / WRAINR (red) / WRAINB (black)
  if (c.startsWith("WRAIN")) {
    if (c.endsWith("B")) return "black";
    if (c.endsWith("R")) return "red";
    return "amber";
  }
  // Tropical cyclone signals: TC1, TC3, TC8*, TC9, TC10
  if (c.startsWith("TC")) {
    if (c.includes("10") || c.includes("9")) return "black";
    if (c.includes("8")) return "red";
    return "amber";
  }
  // Fire danger: red vs yellow
  if (c.startsWith("WFIRE")) return c.endsWith("R") ? "red" : "amber";
  // Landslip, flooding, tsunami → high severity
  if (c.startsWith("WL") || c.startsWith("WTMW")) return "red";
  return "amber";
}

function toLines(value: string | string[] | undefined): string[] {
  if (!value) return [];
  return (Array.isArray(value) ? value : [value]).filter(Boolean);
}

function Chevron() {
  return (
    <svg
      className="warning__chev"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

interface ItemProps {
  sev: Severity;
  name: string;
  type?: string;
  time?: string;
  /** Official HKO signal graphic URL, shown in place of the dot when present. */
  icon?: string | null;
  /** Detailed advisory paragraphs; when present the item is expandable. */
  body: string[];
  lang: Lang;
}

function WarningItem({ sev, name, type, time, icon, body, lang }: ItemProps) {
  const summary = (
    <>
      {icon ? (
        <img className="warning__icon" src={icon} alt="" aria-hidden="true" />
      ) : (
        <span className="warning__dot" />
      )}
      <span className="warning__name">{name}</span>
      {type ? <span className="warning__type">{type}</span> : null}
      <span className="warning__right">
        {time ? (
          <time className="warning__time">{formatUpdateTime(time, lang)}</time>
        ) : null}
        {body.length > 0 ? <Chevron /> : null}
      </span>
    </>
  );

  if (body.length === 0) {
    return (
      <div className={`warning warning--${sev}`}>
        <div className="warning__summary">{summary}</div>
      </div>
    );
  }

  return (
    <details className={`warning warning--${sev}`}>
      <summary className="warning__summary">{summary}</summary>
      <div className="warning__body">
        {body.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    </details>
  );
}

export function WarningBanner({ warnings, info, current, lang }: Props) {
  const summaryEntries = warnings ? Object.entries(warnings) : [];
  const active = summaryEntries.filter(([, e]) => e.actionCode !== "CANCEL");

  // Detailed advisory text, keyed by statement code (matches warnsum keys).
  const details = info?.details ?? [];
  const detailByCode = new Map(
    details.map((d) => [d.warningStatementCode, d.contents ?? []]),
  );

  // warningInfo entries with no matching summary chip (e.g. the WTCPRE8
  // pre-No.8 announcement) — surface them so nothing is dropped.
  const activeCodes = new Set(active.map(([code]) => code));
  const extraDetails = details.filter(
    (d) => !activeCodes.has(d.warningStatementCode) && (d.contents?.length ?? 0) > 0,
  );

  const tips = [
    ...toLines(current?.specialWxTips),
  ];

  if (active.length === 0 && extraDetails.length === 0 && tips.length === 0) {
    return null;
  }

  return (
    <div className="warnings reveal">
      {active.map(([code, w]) => (
        <WarningItem
          key={code}
          sev={severityOf(w.code)}
          name={w.name}
          type={w.type}
          time={w.issueTime}
          icon={warningIconUrl(code, w.code, w.type)}
          body={detailByCode.get(code) ?? []}
          lang={lang}
        />
      ))}

      {extraDetails.map((d) => {
        const [title, ...rest] = d.contents;
        return (
          <WarningItem
            key={d.warningStatementCode}
            sev="amber"
            name={title}
            time={d.updateTime}
            body={rest}
            lang={lang}
          />
        );
      })}

      {tips.length > 0 ? (
        <div className="tips">
          {tips.map((tip, i) => (
            <p key={i}>{tip}</p>
          ))}
        </div>
      ) : null}
    </div>
  );
}
