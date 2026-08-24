import { Link } from "@tanstack/react-router";
import { asset } from "@/content/assets";
import pages from "@/content/pages.json";

export type LinkItem = { t: "link"; text: string; file?: string; to?: string; href?: string };
export type Block =
  | { t: "h"; level: number; text: string }
  | { t: "p"; text: string }
  | { t: "list"; ordered: boolean; items: string[] }
  | { t: "links"; items: LinkItem[] }
  | { t: "table"; rows: string[][] };

const knownPaths = new Set(Object.keys(pages as Record<string, unknown>));

function LinkRow({ item }: { item: LinkItem }) {
  const cls = "text-brand underline decoration-accent/60 underline-offset-2 hover:text-accent-strong";
  const file = item.file ? asset(item.file) : undefined;
  if (file) {
    return (
      <a href={file} className={cls} target="_blank" rel="noreferrer">
        {item.text}
      </a>
    );
  }
  if (item.href) {
    return (
      <a href={item.href} className={cls} target="_blank" rel="noreferrer">
        {item.text}
      </a>
    );
  }
  if (item.to && knownPaths.has(item.to)) {
    return (
      <Link to={item.to} className={cls}>
        {item.text}
      </Link>
    );
  }
  if (/^https?:\/\//.test(item.text)) {
    return (
      <a href={item.text} className={cls} target="_blank" rel="noreferrer">
        {item.text}
      </a>
    );
  }
  return <span className="text-foreground">{item.text}</span>;
}

export function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <div className="space-y-5">
      {blocks.map((b, i) => {
        if (b.t === "h") {
          const size =
            b.level <= 2 ? "text-xl sm:text-2xl" : b.level === 3 ? "text-lg" : "text-base";
          return (
            <h2
              key={i}
              className={`font-display font-semibold text-brand ${size} ${i > 0 ? "pt-2" : ""}`}
            >
              {b.text}
            </h2>
          );
        }
        if (b.t === "p") {
          return (
            <p key={i} className="text-[15px] leading-7 text-foreground/90">
              {b.text}
            </p>
          );
        }
        if (b.t === "list") {
          const Tag = b.ordered ? "ol" : "ul";
          return (
            <Tag
              key={i}
              className={`ml-5 space-y-1.5 text-[15px] leading-7 text-foreground/90 ${
                b.ordered ? "list-decimal" : "list-disc"
              }`}
            >
              {b.items.map((it, j) => (
                <li key={j}>{it}</li>
              ))}
            </Tag>
          );
        }
        if (b.t === "links") {
          return (
            <ul key={i} className="divide-y divide-border rounded border border-border bg-card">
              {b.items.map((it, j) => (
                <li key={j} className="px-4 py-2.5 text-[14.5px]">
                  <LinkRow item={it} />
                </li>
              ))}
            </ul>
          );
        }
        return (
          <div key={i} className="overflow-x-auto">
            <table className="w-full border-collapse text-[14px]">
              <tbody>
                {b.rows.map((row, r) => (
                  <tr key={r} className={r % 2 ? "bg-muted/60" : ""}>
                    {row.map((cell, c) => (
                      <td key={c} className="border border-border px-3 py-2 align-top">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      })}
    </div>
  );
}
