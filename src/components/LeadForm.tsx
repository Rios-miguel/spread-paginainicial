"use client";

import { useActionState, useEffect, useRef } from "react";
import { submitLead, type LeadState } from "@/app/actions";
import { CORPORATE_EMAIL_PATTERN, LIMITS, type LeadField } from "@/lib/lead";

const initialState: LeadState = { status: "idle" };

type FieldDef = {
  name: LeadField;
  label: string;
  type: "text" | "email";
  autoComplete: string;
  placeholder: string;
  hint?: string;
  clientError: string;
  extra?: React.InputHTMLAttributes<HTMLInputElement>;
};

const fields: FieldDef[] = [
  {
    name: "name",
    label: "Nome",
    type: "text",
    autoComplete: "name",
    placeholder: "Seu nome completo",
    clientError: "Informe seu nome completo.",
    extra: { minLength: LIMITS.name.min, maxLength: LIMITS.name.max, enterKeyHint: "next" },
  },
  {
    name: "email",
    label: "E-mail corporativo",
    type: "email",
    autoComplete: "email",
    placeholder: "nome@empresa.com.br",
    hint: "Não aceitamos Gmail, Hotmail e outros e-mails pessoais.",
    clientError: "Use seu e-mail corporativo (ex.: nome@empresa.com.br).",
    extra: {
      pattern: CORPORATE_EMAIL_PATTERN,
      maxLength: LIMITS.email.max,
      autoCapitalize: "off",
      autoCorrect: "off",
      spellCheck: false,
      enterKeyHint: "next",
    },
  },
  {
    name: "company",
    label: "Empresa",
    type: "text",
    autoComplete: "organization",
    placeholder: "Exchange, fintech ou banco",
    clientError: "Informe o nome da empresa.",
    extra: { minLength: LIMITS.company.min, maxLength: LIMITS.company.max, enterKeyHint: "send" },
  },
];

export function LeadForm() {
  const [state, formAction, pending] = useActionState(submitLead, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  // Mantém aria-invalid em sincronia com o estado visual :user-invalid (erro só depois da interação)
  useEffect(() => {
    const form = formRef.current;
    if (!form) return;
    const sync = (e: Event) => {
      const el = e.target as HTMLInputElement;
      if (!el.matches?.(".lead-input")) return;
      if (e.type === "input" && el.getAttribute("aria-invalid") !== "true") return;
      if (el.matches(":user-invalid")) el.setAttribute("aria-invalid", "true");
      else el.removeAttribute("aria-invalid");
    };
    form.addEventListener("blur", sync, true);
    form.addEventListener("input", sync);
    return () => {
      form.removeEventListener("blur", sync, true);
      form.removeEventListener("input", sync);
    };
  }, [state.status]);

  useEffect(() => {
    if (state.status === "success") statusRef.current?.focus();
  }, [state.status]);

  if (state.status === "success") {
    return (
      <div
        ref={statusRef}
        tabIndex={-1}
        role="status"
        className="flex min-h-[26rem] flex-col items-center justify-center rounded-3xl border border-brand/30 bg-surface/80 p-10 text-center outline-none"
      >
        <span className="grid size-14 place-items-center rounded-full bg-brand text-ink">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="size-7" aria-hidden="true">
            <path d="m5 12.5 4.5 4.5L19 7.5" />
          </svg>
        </span>
        <h3 className="mt-6 text-2xl font-semibold">Recebemos seu contato</h3>
        <p className="mt-3 max-w-sm text-muted">
          Nosso time de especialistas responde em até um dia útil para agendar a demonstração.
        </p>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      action={formAction}
      aria-labelledby="form-title"
      className="relative rounded-3xl border border-white/10 bg-surface/80 p-7 shadow-[0_30px_80px_-30px_rgb(0_0_0/0.6)] sm:p-9"
    >
      <h3 id="form-title" className="text-xl font-semibold">
        Agende uma demo
      </h3>
      <p className="mt-1 text-sm text-muted">Todos os campos são obrigatórios.</p>

      <div className="mt-7 space-y-5">
        {fields.map((f) => {
          const serverError = state.errors?.[f.name];
          const hintId = f.hint ? `${f.name}-hint` : undefined;
          const errorId = `${f.name}-error`;
          return (
            <div key={f.name}>
              <label htmlFor={f.name} className="block text-sm font-medium text-white/90">
                {f.label}
              </label>
              {f.hint && (
                <span id={hintId} className="mt-0.5 block text-xs text-muted">
                  {f.hint}
                </span>
              )}
              <input
                id={f.name}
                name={f.name}
                type={f.type}
                required
                autoComplete={f.autoComplete}
                placeholder={f.placeholder}
                defaultValue={state.values?.[f.name] ?? ""}
                aria-describedby={[hintId, serverError ? errorId : undefined].filter(Boolean).join(" ") || undefined}
                aria-errormessage={errorId}
                aria-invalid={serverError ? true : undefined}
                className="lead-input mt-2 block min-h-12 w-full rounded-xl border border-white/10 bg-ink/70 px-4 text-base text-white placeholder:text-white/30 transition-colors focus:border-brand focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 focus-visible:outline-none"
                {...f.extra}
              />
              <p id={errorId} data-server={serverError ? "true" : undefined} className="field-error mt-2 items-center gap-1.5 text-sm text-danger">
                <svg viewBox="0 0 20 20" fill="currentColor" className="size-4 shrink-0" aria-hidden="true">
                  <path fillRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-8-5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0v-4.5A.75.75 0 0 1 10 5Zm0 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clipRule="evenodd" />
                </svg>
                {serverError ?? f.clientError}
              </p>
            </div>
          );
        })}

        {/* honeypot: fora da tela e fora da ordem de tabulação */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <label htmlFor="website">Site</label>
          <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
        </div>
      </div>

      <button
        type="submit"
        disabled={pending}
        className="mt-8 inline-flex min-h-13 w-full items-center justify-center gap-2 rounded-full bg-brand px-8 text-base font-semibold text-ink transition hover:bg-brand-light hover:shadow-[0_0_40px_rgb(242_106_27/0.5)] disabled:cursor-wait disabled:opacity-70"
      >
        {pending ? (
          <>
            <svg viewBox="0 0 24 24" className="size-5 animate-spin motion-reduce:animate-none" fill="none" aria-hidden="true">
              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.25" strokeWidth="3" />
              <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            </svg>
            Enviando…
          </>
        ) : (
          "Quero agendar uma demo"
        )}
      </button>

      <div aria-live="polite" className="mt-4 min-h-5 text-center text-sm">
        {state.status === "error" && state.message && <p className="text-danger">{state.message}</p>}
      </div>

      <p className="text-center text-xs text-muted">
        Usamos seus dados só para falar sobre a Spread. Nada de spam, nada repassado a terceiros.
      </p>
    </form>
  );
}
