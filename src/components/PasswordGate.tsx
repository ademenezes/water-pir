import { useEffect, useState, type FormEvent } from "react";
import { PipeNetwork } from "./brand/PipeNetwork";
import { Logo } from "./brand/Logo";

/**
 * Soft password gate. The bundle carries a SHA-256 hash of the password, not
 * the plaintext, so casual visitors can't read it in the JS. This is NOT real
 * authentication. Anyone who opens DevTools and brute-forces the hash, or
 * pulls the password out of the source repo, can bypass it. Good enough to
 * keep a work-in-progress out of search-engine indexes and curious passers-by.
 */

const PASSWORD_HASH =
  "964652200ed837e7aeacc3f6c183912e8c085245611109a5659d1295e4b583bd";
const STORAGE_KEY = "water-pir.unlocked";

async function sha256Hex(input: string): Promise<string> {
  const enc = new TextEncoder().encode(input);
  const buf = await crypto.subtle.digest("SHA-256", enc);
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export function PasswordGate({ children }: { children: React.ReactNode }) {
  const [unlocked, setUnlocked] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.localStorage.getItem(STORAGE_KEY) === "1";
  });
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [checking, setChecking] = useState(false);

  // Lock the page if the storage key is removed in another tab.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) {
        setUnlocked(e.newValue === "1");
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  if (unlocked) return <>{children}</>;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setChecking(true);
    setError(null);
    try {
      const hash = await sha256Hex(value);
      if (hash === PASSWORD_HASH) {
        window.localStorage.setItem(STORAGE_KEY, "1");
        setUnlocked(true);
      } else {
        setError("That password isn't right.");
      }
    } catch {
      setError("Could not verify password. Try again.");
    } finally {
      setChecking(false);
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-brand-teal text-brand-ink">
      <div className="absolute inset-0 -z-10 text-brand-ink/95">
        <div className="absolute right-[-8%] top-[-4%] h-[120%] w-[68%] opacity-95">
          <PipeNetwork className="h-full w-full" />
        </div>
      </div>

      <div className="mx-auto flex min-h-screen max-w-[88rem] flex-col px-8 py-10">
        <header>
          <Logo size={36} />
        </header>

        <main className="flex flex-1 items-center">
          <div className="grid w-full grid-cols-12 gap-8">
            <div className="col-span-12 md:col-span-7">
              <div className="eyebrow-ink text-brand-ink/80">
                Water&nbsp;·&nbsp;Policies, Institutions, Regulation
              </div>
              <h1 className="display-hero mt-6 text-[clamp(40px,6vw,80px)]">
                Water reform starts
                <br />
                with the law.
              </h1>
              <p className="prose-editorial mt-7 max-w-[34rem] text-[21px] italic text-brand-ink/85">
                This is a private preview while the curation pipeline is still
                being built. Enter the access password to continue.
              </p>

              <form
                onSubmit={handleSubmit}
                className="mt-10 max-w-[28rem] border-t border-brand-ink/30 pt-6"
                aria-label="Access password"
              >
                <label
                  htmlFor="pw"
                  className="eyebrow-ink text-brand-ink/75"
                >
                  Access password
                </label>
                <div className="mt-3 flex items-baseline gap-4">
                  <input
                    id="pw"
                    type="password"
                    autoFocus
                    autoComplete="current-password"
                    value={value}
                    onChange={(e) => {
                      setValue(e.target.value);
                      setError(null);
                    }}
                    className="flex-1 border-b-2 border-brand-ink/40 bg-transparent pb-2 font-display text-[20px] tracking-[0.04em] text-brand-ink outline-none placeholder:text-brand-ink/35 focus:border-brand-ink"
                    placeholder="••••••••"
                    aria-invalid={!!error}
                    aria-describedby={error ? "pw-error" : undefined}
                  />
                  <button
                    type="submit"
                    disabled={checking || value.length === 0}
                    className="font-serif italic text-[20px] text-brand-ink underline decoration-brand-ink/40 decoration-2 underline-offset-[8px] transition-colors hover:decoration-brand-ink disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:decoration-brand-ink/40"
                  >
                    {checking ? "Checking…" : "Enter →"}
                  </button>
                </div>
                {error && (
                  <p
                    id="pw-error"
                    className="mt-3 font-serif text-[15px] text-rose-700"
                  >
                    {error}
                  </p>
                )}
                <p className="mt-6 font-serif italic text-[14px] text-brand-ink/70">
                  Don't have the password?{" "}
                  <a
                    href="mailto:ademenezes1@worldbank.org"
                    className="underline decoration-brand-ink/40 underline-offset-[5px] hover:decoration-brand-ink"
                  >
                    ademenezes1@worldbank.org
                  </a>
                </p>
              </form>
            </div>
          </div>
        </main>

        <footer className="eyebrow-ink text-brand-ink/55 mt-8">
          Private preview
        </footer>
      </div>
    </div>
  );
}
