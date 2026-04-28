"use client";
import { useState } from "react";

function parseJianpuV2(input) {
  const lines = input.split("\n");

  let measures = [];
  let currentMeasure = [];
  let currentChord = null;

  lines.forEach(line => {
    if (!line.trim()) return;

    const tokens = line.split(" ");

    tokens.forEach(token => {

      if (token === "|") {
        measures.push(currentMeasure);
        currentMeasure = [];
        return;
      }

      if (token.startsWith("[")) {
        currentChord = token.replace("[", "").replace("]", "");
        return;
      }

      if (/^[0-7\-]+$/.test(token)) {
        currentMeasure.push({
          note: token,
          chord: currentChord,
          lyric: ""
        });
        currentChord = null;
        return;
      }

      if (currentMeasure.length > 0) {
        currentMeasure[currentMeasure.length - 1].lyric = token;
      }

    });
  });

  if (currentMeasure.length) measures.push(currentMeasure);

  return measures;
}

function ScoreV2({ measures }) {
  return (
    <div style={{ padding: 20 }}>
      {measures.map((measure, mi) => (
        <div key={mi} style={{
          display: "inline-flex",
          borderRight: "2px solid black",
          marginRight: 10,
          paddingRight: 5
        }}>
          {measure.map((cell, ci) => (
            <div key={ci} style={{
              width: 40,
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}>
              
              <div style={{ fontSize: 12, height: 20 }}>
                {cell.chord}
              </div>

              <div style={{ fontSize: 20, fontWeight: "bold" }}>
                {cell.note}
              </div>

              <div style={{ fontSize: 12 }}>
                {cell.lyric}
              </div>

            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default function Page() {
  const [text, setText] = useState(`[Bb] 0 0 5 1 3 | 3 2 3 2 4 3 |
[F] 2 1 7 6 7 1 | 1 - - - |

无 数 幽 暗 长 夜 |
床 前 轻 声 细 语 |`);

  const measures = parseJianpuV2(text);

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", height: "100vh" }}>
      
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ padding: 20 }}
      />

      <div style={{ background: "#f5f5f5", overflow: "auto" }}>
        <ScoreV2 measures={measures} />
      </div>

    </div>
  );
}
