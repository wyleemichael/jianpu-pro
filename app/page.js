"use client";
import { useState } from "react";

function parseJianpu(input) {
  const lines = input.split("\n");

  let measures = [];
  let currentMeasure = [];

  lines.forEach((line) => {
    if (!line.trim()) return;

    const tokens = line.split(" ");

    tokens.forEach((token) => {
      if (token === "|") {
        measures.push(currentMeasure);
        currentMeasure = [];
        return;
      }

      let chord = null;
      let note = null;
      let lyric = null;

      if (token.startsWith("[")) {
        chord = token.replace("[", "").replace("]", "");
      } else if (/^[0-7\-]+$/.test(token)) {
        note = token;
      } else {
        lyric = token;
      }

      currentMeasure.push({
        chord,
        note,
        lyric,
      });
    });
  });

  if (currentMeasure.length > 0) {
    measures.push(currentMeasure);
  }

  return measures;
}

function Score({ measures }) {
  return (
    <div style={{ padding: 20 }}>
      {measures.map((measure, mi) => (
        <div key={mi} style={{ display: "inline-flex", marginRight: 20, borderRight: "2px solid black", paddingRight: 10 }}>
          {measure.map((cell, ci) => (
            <div key={ci} style={{ width: 40, textAlign: "center" }}>
              <div style={{ fontSize: 12, height: 20 }}>{cell.chord}</div>
              <div style={{ fontSize: 20, fontWeight: "bold" }}>{cell.note}</div>
              <div style={{ fontSize: 12 }}>{cell.lyric}</div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default function Home() {
  const [text, setText] = useState(`[Bb] 0 0 5 1 3 | 3 2 3 2 4 3 |
[F] 2 1 7 6 7 1 | 1 - - - |

无 数 幽 暗 长 夜 |
床 前 轻 声 细 语 |`);

  const measures = parseJianpu(text);

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", height: "100vh" }}>
      <textarea
        style={{ padding: 20 }}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div style={{ background: "#f5f5f5", overflow: "auto" }}>
        <Score measures={measures} />
      </div>
    </div>
  );
}
