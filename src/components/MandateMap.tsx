import type { Institution, InstitutionRole, GovernmentLevel } from "../types";

const ROLE_ORDER: InstitutionRole[] = [
  "policy_maker",
  "regulator",
  "asset_owner",
  "service_provider",
  "basin_org",
  "user_rep",
];

const ROLE_LABEL: Record<InstitutionRole, string> = {
  policy_maker: "Policy maker",
  regulator: "Regulator",
  asset_owner: "Asset owner",
  service_provider: "Service provider",
  basin_org: "Basin organisation",
  user_rep: "User representation",
};

const ROLE_STYLE: Record<InstitutionRole, string> = {
  policy_maker: "bg-indigo-50 text-indigo-900 ring-indigo-200",
  regulator: "bg-orange-50 text-orange-900 ring-orange-200",
  asset_owner: "bg-slate-50 text-slate-900 ring-slate-200",
  service_provider: "bg-emerald-50 text-emerald-900 ring-emerald-200",
  basin_org: "bg-teal-50 text-teal-900 ring-teal-200",
  user_rep: "bg-purple-50 text-purple-900 ring-purple-200",
};

const LEVEL_LABEL: Record<GovernmentLevel, string> = {
  national: "National",
  state: "State",
  local: "Local",
  basin: "Basin",
};

const LEVEL_STYLE: Record<GovernmentLevel, string> = {
  national: "bg-slate-900 text-white",
  state: "bg-slate-700 text-white",
  local: "bg-slate-500 text-white",
  basin: "bg-teal-700 text-white",
};

interface Props {
  institutions: Institution[];
}

export function MandateMap({ institutions }: Props) {
  if (institutions.length === 0) {
    return (
      <div className="rounded-md border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-500">
        No institutions mapped yet for this dimension.
      </div>
    );
  }

  const grouped = ROLE_ORDER.map((role) => ({
    role,
    items: institutions.filter((i) => i.role === role),
  })).filter((g) => g.items.length > 0);

  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
      {grouped.map((g) => (
        <div key={g.role} className="rounded-md border border-slate-200 bg-white">
          <div className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wide ${ROLE_STYLE[g.role]} ring-1 ring-inset rounded-t-md`}>
            {ROLE_LABEL[g.role]}
          </div>
          <ul className="divide-y divide-slate-100 p-2">
            {g.items.map((inst, i) => (
              <li key={`${inst.name}-${i}`} className="flex items-start justify-between gap-2 py-1.5 px-1">
                <div className="text-sm leading-snug text-slate-800">
                  {inst.url ? (
                    <a
                      href={inst.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      {inst.name}
                    </a>
                  ) : (
                    inst.name
                  )}
                  {inst.acronym && inst.acronym !== inst.name && (
                    <span className="ml-1 text-slate-400">({inst.acronym})</span>
                  )}
                </div>
                <span
                  className={`shrink-0 rounded px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide ${LEVEL_STYLE[inst.level]}`}
                >
                  {LEVEL_LABEL[inst.level]}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
