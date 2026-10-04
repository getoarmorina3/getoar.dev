"use client";

import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent,
} from "react";
import { site } from "@/content/site";
import { Sprite, type SpriteId } from "@/components/sprites";
import styles from "./cafe-booth.module.css";

type Regular = {
  id: SpriteId;
  name: string;
  greeting: string;
  whoami: string;
  cs: string;
};

const regulars: Regular[] = [
  {
    id: "getoar",
    name: "me, age 9",
    greeting: "welcome back. your homework is still open. type help.",
    whoami: "getoar. grew up in this chair. builds interfaces for a living now.",
    cs: "counter-terrorists win. homework loses.",
  },
  {
    id: "kid",
    name: "cs kid",
    greeting: "de_dust2 loading... type help (or just cs).",
    whoami: "xX_h3adsh0t_Xx. mom thinks i'm at school.",
    cs: "headshot. 27 kills. it's 11pm and mom is standing outside.",
  },
  {
    id: "dad",
    name: "dad",
    greeting: "this is my chair, but fine. type help.",
    whoami: "the owner. we close at 11. no exceptions. (there are exceptions.)",
    cs: "who left this running? *closes it*",
  },
];

const RATE_PER_HOUR = 1.5;
const KEY_COUNT = 36;

type Line = { text: string; input?: boolean; href?: string };
type Phase = "idle" | "boot" | "on";

const bootLines = [
  "café os 2003",
  "ram check... 256mb ok",
  "dial-up: krrrsshhhh ✓",
];

function randomInt(max: number) {
  return Math.floor(Math.random() * max);
}

function formatTime(seconds: number) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return [h, m, s].map((n) => String(n).padStart(2, "0")).join(":");
}

export function CafeBooth() {
  const [who, setWho] = useState<Regular | null>(null);
  const [phase, setPhase] = useState<Phase>("idle");
  const [lines, setLines] = useState<Line[]>([]);
  const [input, setInput] = useState("");
  const [seconds, setSeconds] = useState(0);
  const [extras, setExtras] = useState(0);
  const [litKey, setLitKey] = useState<number | null>(null);
  const [drag, setDrag] = useState<{
    id: SpriteId;
    x: number;
    y: number;
    over: boolean;
  } | null>(null);

  const dropRef = useRef<HTMLDivElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const pressRef = useRef<{ x: number; y: number; moved: boolean } | null>(
    null,
  );
  const suppressClick = useRef(false);
  const timers = useRef<number[]>([]);

  const bill = (seconds / 3600) * RATE_PER_HOUR + extras;

  function clearTimers() {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  }

  function later(fn: () => void, ms: number) {
    timers.current.push(window.setTimeout(fn, ms));
  }

  useEffect(() => clearTimers, []);

  useEffect(() => {
    if (phase !== "on") return;
    const id = window.setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => window.clearInterval(id);
  }, [phase]);

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight });
  }, [lines]);

  function seat(regular: Regular) {
    clearTimers();
    setWho(regular);
    setPhase("boot");
    setLines([]);
    setInput("");
    setSeconds(0);
    setExtras(0);
    bootLines.forEach((text, i) => {
      later(() => setLines((l) => [...l, { text }]), 250 + i * 380);
    });
    later(
      () => {
        setPhase("on");
        setLines((l) => [...l, { text: "" }, { text: regular.greeting }]);
        inputRef.current?.focus({ preventScroll: true });
      },
      250 + bootLines.length * 380 + 200,
    );
  }

  function standUp() {
    clearTimers();
    setPhase("idle");
    setWho(null);
    setLines([]);
  }

  function respond(raw: string): Line[] {
    if (!who) return [];
    const cmd = raw.trim().toLowerCase();

    switch (cmd) {
      case "":
        return [];
      case "help":
        return [
          { text: "whoami  ls  cs  msn  winamp  coffee" },
          { text: "bill  github  hi  clear  logout" },
        ];
      case "whoami":
        return [{ text: who.whoami }];
      case "ls":
      case "dir":
        return [
          { text: "counter-strike.exe  msn.exe  winamp.exe" },
          { text: "homework_FINAL_final2.doc" },
        ];
      case "cs":
        return [{ text: who.cs }];
      case "msn":
        return [{ text: "*nudge* · 3 contacts online. nobody replies." }];
      case "winamp":
        return [{ text: "♪ it really whips the llama's ass." }];
      case "coffee":
        if (who.id === "dad") return [{ text: "you own the place. it's free." }];
        setExtras((e) => e + 0.5);
        return [{ text: "a macchiato appears by the keyboard. +€0.50" }];
      case "bill":
        return [{ text: `${formatTime(seconds)} · €${bill.toFixed(2)}` }];
      case "github":
        window.open(site.github, "_blank", "noopener,noreferrer");
        return [{ text: "opening github...", href: site.github }];
      case "hi":
      case "email":
      case "contact":
        return [{ text: site.email, href: `mailto:${site.email}` }];
      case "logout":
      case "exit":
      case "quit":
        later(standUp, 1100);
        return [{ text: `paid €${bill.toFixed(2)}. see you tomorrow.` }];
      default:
        if (cmd.startsWith("sudo")) {
          return [
            {
              text:
                who.id === "dad"
                  ? "you are the admin password."
                  : "nice try. dad has the admin password.",
            },
          ];
        }
        if (cmd.startsWith("rm ")) return [{ text: "dad: no." }];
        return [{ text: `'${cmd}' is not recognized. try help.` }];
    }
  }

  function submit() {
    if (phase !== "on") return;
    if (input.trim().toLowerCase() === "clear") {
      setLines([]);
      setInput("");
      return;
    }
    const out = respond(input);
    setLines((l) => [...l, { text: input, input: true }, ...out]);
    setInput("");
  }

  function onKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    setLitKey(randomInt(KEY_COUNT));
    later(() => setLitKey(null), 110);
    if (event.key === "Enter") submit();
  }

  function onChange(value: string) {
    setInput(value);
  }

  function isOverDrop(x: number, y: number) {
    const rect = dropRef.current?.getBoundingClientRect();
    if (!rect) return false;
    return (
      x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom
    );
  }

  function onPointerDown(event: PointerEvent<HTMLButtonElement>) {
    if (event.button !== 0) return;
    pressRef.current = { x: event.clientX, y: event.clientY, moved: false };
    suppressClick.current = false;
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function onPointerMove(
    event: PointerEvent<HTMLButtonElement>,
    id: SpriteId,
  ) {
    const press = pressRef.current;
    if (!press) return;
    const distance = Math.hypot(
      event.clientX - press.x,
      event.clientY - press.y,
    );
    if (!press.moved && distance < 5) return;
    press.moved = true;
    setDrag({
      id,
      x: event.clientX,
      y: event.clientY,
      over: isOverDrop(event.clientX, event.clientY),
    });
  }

  function onPointerUp(event: PointerEvent<HTMLButtonElement>, regular: Regular) {
    const press = pressRef.current;
    pressRef.current = null;
    if (!press?.moved) return;
    suppressClick.current = true;
    setDrag(null);
    if (isOverDrop(event.clientX, event.clientY)) seat(regular);
  }

  return (
    <section className={styles.booth} aria-label="Internet café booth">
      <p className={styles.sign}>
        <span>internet café</span>
        <span aria-hidden="true">✦</span>
        <span>est. 2003</span>
        <span aria-hidden="true">✦</span>
        <span>€{RATE_PER_HOUR.toFixed(2)}/h</span>
      </p>

      <div
        ref={dropRef}
        className={styles.desk}
        data-drop={drag ? (drag.over ? "over" : "ready") : undefined}
      >
        <div className={styles.station}>
          <div className={styles.monitor}>
            <div
              className={styles.screen}
              onClick={() => inputRef.current?.focus({ preventScroll: true })}
            >
              {phase === "idle" ? (
                <div className={styles.idle}>
                  <span className={styles.saverX}>
                    <span className={styles.saverY}>café 2003</span>
                  </span>
                  <span className={styles.insert}>insert player_</span>
                </div>
              ) : (
                <div className={styles.session}>
                  <div className={styles.bar}>
                    <span>{who?.name}</span>
                    <span>
                      {formatTime(seconds)} · €{bill.toFixed(2)}
                    </span>
                  </div>
                  <div ref={logRef} className={styles.log} aria-live="polite">
                    {lines.map((line, i) => (
                      <p key={i} className={line.input ? styles.in : undefined}>
                        {line.input ? "> " : null}
                        {line.href ? (
                          <a
                            href={line.href}
                            target={
                              line.href.startsWith("http") ? "_blank" : undefined
                            }
                            rel="noopener noreferrer"
                          >
                            {line.text}
                          </a>
                        ) : (
                          line.text || " "
                        )}
                      </p>
                    ))}
                  </div>
                  <label className={styles.prompt}>
                    <span aria-hidden="true">&gt;</span>
                    <input
                      ref={inputRef}
                      value={input}
                      onChange={(e) => onChange(e.target.value)}
                      onKeyDown={onKeyDown}
                      disabled={phase !== "on"}
                      spellCheck={false}
                      autoComplete="off"
                      autoCapitalize="off"
                      aria-label="Type a command"
                      enterKeyHint="send"
                    />
                  </label>
                </div>
              )}
            </div>
          </div>
          <div className={styles.neck} />
          <div className={styles.keyboard} aria-hidden="true">
            {Array.from({ length: KEY_COUNT }, (_, i) => (
              <span key={i} data-lit={litKey === i || undefined} />
            ))}
          </div>
        </div>

        <div className={styles.tower} aria-hidden="true">
          <span className={styles.drive} />
          <span className={styles.drive} />
          <span className={styles.led} data-on={phase !== "idle" || undefined} />
        </div>

        <div className={styles.seat}>
          {who ? (
            <button
              type="button"
              className={styles.seated}
              onClick={standUp}
              aria-label={`${who.name} is seated. Click to stand up.`}
              title="stand up"
            >
              <Sprite id={who.id} size={56} />
            </button>
          ) : (
            <span className={styles.empty}>drop here</span>
          )}
          <span className={styles.stool} aria-hidden="true" />
        </div>
      </div>

      <div className={styles.tray}>
        <p className={styles.trayLabel}>drag a regular to the chair</p>
        <ul className={styles.regulars}>
          {regulars.map((regular) => (
            <li key={regular.id}>
              <button
                type="button"
                className={styles.regular}
                data-active={who?.id === regular.id || undefined}
                data-dragging={drag?.id === regular.id || undefined}
                onPointerDown={onPointerDown}
                onPointerMove={(e) => onPointerMove(e, regular.id)}
                onPointerUp={(e) => onPointerUp(e, regular)}
                onPointerCancel={() => {
                  pressRef.current = null;
                  setDrag(null);
                }}
                onClick={() => {
                  if (suppressClick.current) {
                    suppressClick.current = false;
                    return;
                  }
                  seat(regular);
                }}
                aria-label={`Seat ${regular.name}`}
              >
                <Sprite id={regular.id} size={36} />
                <span>{regular.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {drag ? (
        <div
          className={styles.ghost}
          style={{ translate: `${drag.x}px ${drag.y}px` }}
          aria-hidden="true"
        >
          <Sprite id={drag.id} size={48} />
        </div>
      ) : null}
    </section>
  );
}
