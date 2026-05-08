"use client";

import React, { Children, isValidElement } from "react";

/**
 * Mobile-friendly table replacement for MDX.
 * Desktop: styled table. Mobile: stacked cards with header labels.
 */

function extractText(node: React.ReactNode): string {
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (!isValidElement(node)) return "";
  const children = (node.props as { children?: React.ReactNode }).children;
  if (!children) return "";
  return Children.toArray(children).map(extractText).join("");
}

function collectCells(row: React.ReactElement): string[] {
  const children = (row.props as { children?: React.ReactNode }).children;
  return Children.toArray(children)
    .filter(isValidElement)
    .map((cell) => extractText(cell));
}

export default function MdxTable({ children }: { children: React.ReactNode }) {
  const headers: string[] = [];
  const rows: string[][] = [];

  Children.forEach(children, (section) => {
    if (!isValidElement(section)) return;
    const tag = section.type as string;
    const sectionChildren = (section.props as { children?: React.ReactNode }).children;

    if (tag === "thead") {
      Children.forEach(sectionChildren, (tr) => {
        if (isValidElement(tr)) headers.push(...collectCells(tr));
      });
    }
    if (tag === "tbody") {
      Children.forEach(sectionChildren, (tr) => {
        if (isValidElement(tr)) rows.push(collectCells(tr));
      });
    }
  });

  return (
    <div className="my-5">
      {/* Desktop: clean styled table */}
      <table
        className="hidden sm:table w-full text-sm"
        style={{ borderCollapse: "separate", borderSpacing: 0 }}
      >
        <thead>
          <tr>
            {headers.map((h, i) => (
              <th
                key={i}
                className="text-left text-xs font-bold uppercase tracking-wider px-4 py-3"
                style={{
                  color: "var(--module-color, #1368CE)",
                  borderBottom: "2px solid var(--module-color, rgba(19,104,206,0.3))",
                  background: "rgba(255,255,255,0.02)",
                }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td
                  key={j}
                  className="px-4 py-3 text-[#F0EFEB]/75"
                  style={{
                    borderBottom: "1px solid rgba(255,255,255,0.06)",
                    fontWeight: j === 0 ? 500 : 400,
                    color: j === 0 ? "rgba(240,239,235,0.9)" : undefined,
                  }}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Mobile: stacked cards */}
      <div className="sm:hidden space-y-2">
        {rows.map((row, i) => (
          <div
            key={i}
            className="rounded-xl p-4"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            {row.map((cell, j) => (
              <div key={j} className={j > 0 ? "mt-1.5" : ""}>
                {headers[j] && (
                  <span
                    className="text-[10px] font-bold uppercase tracking-wider block"
                    style={{ color: "var(--module-color, #1368CE)", opacity: 0.7 }}
                  >
                    {headers[j]}
                  </span>
                )}
                <span
                  className="text-sm leading-snug"
                  style={{
                    color: j === 0 ? "rgba(240,239,235,0.95)" : "rgba(240,239,235,0.65)",
                    fontWeight: j === 0 ? 500 : 400,
                  }}
                >
                  {cell}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
