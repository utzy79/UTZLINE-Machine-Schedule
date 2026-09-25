# UTZLINE Machine Schedule — installable app

**Current version: v8** (its own independent version line, separate from every other app in the family — bump this line, and add a dated entry below, every time a new build ships.)

**v8 (2026-09-24):** New "Open item" Joinery Item detail page — Round 3 of the Joinery Item page overhaul, Andrew, verbatim: *"in both scheduler and machine sheduler, all this information needs to be accessible also. (mimic the joinery status page above)."* A full, read-only port of UTZLINE Projects' own Joinery Item page (via this app's own UTZLINE Scheduler fork, which got the identical port in the same round): every row on both the Overall Machine Schedule and per-project Schedule tables now has an "Open item" button (leading the row-actions cell, additive alongside the existing "Open job note" button — not a replacement for it), opening a new detail screen with a meta-grid tailored to this app's own row shape — Level/Room/Description (pulled from `row.rawItem`, since this app's own rows carry no description field directly)/Work order #/Status/Fully machined (with who and when), plus the three Carcase/Colour board/Solid Surface cut states, all reused directly from the row's own already-computed `machinedDone`/`machinedBy`/`machinedAt`/`machiningRec`/`hasSolidSurface` fields — no re-fetch of anything, since this page is only ever opened FROM a table row that already has it all — and read-only cards for Site Measure overlays, Shop drawings, Job notes (reusing this app's own existing job-note reader), ITPs, Rework (Install ITP's rework log, PDF + entries, no inline photos), and Delivery location (a static snapshot thumbnail only, same simplification as the Scheduler sibling).

Deliberately dropped, same as the Scheduler port: "Edit item", "Edit history", the Rework Register click-to-scroll highlight, and any interactive pin-drop jump on the Delivery location card. Ported the family's generic directory-walk helpers and every reader function verbatim from UTZLINE Projects — none needed any changes, since they only ever take a plain projectHandle + {level,room,joineryId} shape. Reused this app's own pre-existing `joineryItemPageKey`/`listJobNotes` rather than duplicating them.

New regression test `run_machine_schedule_joinery_item_page.js` (in `pdftest-projects`) seeds one item with every linked-data type (shop drawing with two revisions, job note, Site Measure overlay, both ITPs at different stages, two rework entries — one pending, one received — plus its cumulative PDF, a Delivery ITP location pin + snapshot, and all three cuts addressed via `machining-flags.json`) and one item with none of it (including no solid surface, confirmed as "N/A (no solid surface)" rather than a blank Pending), and confirms the meta-grid, every card, the correct empty states, the Back button, and "View on plan" all work with zero page errors. `run_machine_schedule_open_job_note.js` updated for the new button now leading every row-actions cell (button count/order shifted by one slot; the job-note button's own behaviour is unchanged and still passes). `run_machine_schedule_mark_complete.js` needed no changes and still passes clean. `service-worker.js` cache bumped to `utzline-machine-schedule-cache-v8`. Does not touch source.html, any ITP app, or UTZLINE Projects in any way.

**v7 (2026-09-24):** Cut lockout — Andrew, verbatim: *"once a joinery item is marked as machined, that button gets locked out on that joinery item, only changeable after that with the users pin. if its marked as machined, NA then comes locked and vice versa."* Confirmed via follow-up: the lock is per-**cut**, not per-item — the moment a single cut (Carcase, Colour board, or Solid Surface) is marked Done or N/A, that cut's own button pair locks, whether or not the item's other cuts are still Pending. The very first time a cut is recorded (Pending → Done/N/A) needs no PIN beyond already being signed in, exactly as before; every change after that — reverting it back to Pending, or swapping Done↔N/A ("vice versa": the lock cuts both ways, not just the revert-to-Pending direction) — now re-confirms the signed-in person's own PIN first, via the same numberpad/`verify()` pattern UTZLINE Projects' "Edit joinery item" gate already uses (checked against that exact name's row in `utzline-users.csv`). Nothing is written until the PIN check resolves true; Cancel leaves the cut completely untouched, a wrong PIN shakes/clears the same way every other PIN step in this app already does.

Both places a cut button lives — the table cells (Overall + per-project Schedule) and the plan-marker cut status panel — share one front door, `performCutAction`, so this needed exactly one change to cover both, no new inconsistency between them. A locked cut also gets a small 🔒 on its meta line and a "Locked — enter your PIN to change" tooltip, so it's clear at a glance a tap will ask for a PIN rather than toggle instantly — the button itself stays fully clickable either way, tapping it is what opens the PIN prompt.

`run_machine_schedule_mark_complete.js` extended to cover: tapping an already-Done cut opens the PIN numberpad instead of reverting instantly; Cancel and a wrong PIN both leave the cut untouched (wrong PIN shakes and lets you retry); the correct PIN completes the change; swapping an already-N/A cut straight to Done needs the PIN too, not just a revert to Pending; and marking a still-Pending cut for the very first time still needs no PIN at all. Full `pdftest-projects/run_all.sh` suite re-confirmed at 91/97 — the same 6 pre-existing, already-documented, unrelated failures as every other round, zero new regressions. `service-worker.js` cache bumped to `utzline-machine-schedule-cache-v7`.

**v6 (2026-09-24):** machining-flags.json v2 — second round of the same rebuild shipped for joinery-status.json in v5 below. Andrew's original scale concern applies directly here: up to 5 machinists could be cutting different items in the same project at the same time, all saving into this app's own `machining-flags.json`, which was still one shared array file rewritten whole on every save — the exact same collision risk, just contained to this one app instead of spread across five. Replaced with one small immutable event file per cut-state change (carcase/colour board/solid surface), filed under `Project Saves/Machining Flags/<Level> - <Room> - <Code>/` — two machinists can never collide, regardless of which cuts or which items they're each working on at the same moment. Current flags are computed by folding an item's own event files together, with the LATEST event for each cut type winning (cuts are last-write-wins, not forward-only — an explicit revert to Pending is a normal, supported correction, exactly as before). The old file is migrated automatically, losslessly, and idempotently the first time this app opens a project after this update, and left in place afterward, untouched. Every observable behaviour is unchanged: the same tri-state Pending/Done/N/A buttons, the same auto-advance to "machined" once every applicable cut is addressed, the same forward-only guarantee on the shared status pipeline, and the same "no record at all" result for an item with nothing set. `run_machine_schedule_mark_complete.js` updated to fold the new event files instead of reading the old shared array. `service-worker.js` cache bumped to `utzline-machine-schedule-cache-v6`.

**v5 (2026-09-24):** joinery-status.json v2 — Andrew, verbatim, on the coming scale: "we will have 30 people using this app in different stages, all coming back to the same database... needs to be foolproof and nevel lose data. some of this will be done via dropbox upload after the fact." The shared `joinery-status.json` used to be one JSON array file, rewritten whole on every save — risky with up to 15 people across five apps, some syncing in late via Dropbox. Replaced with one small immutable event file per status change, filed under `Project Saves/Joinery Status/<Level> - <Room> - <Code>/` — two writers can never collide, and a late Dropbox sync can never overwrite a newer save regardless of arrival order. The old file is migrated automatically and losslessly (once, idempotently) the first time any app in the family opens a project after this update, and left in place afterward, untouched. This app's own `machined` write (the one place in the whole family that sets it, via the carcase/colour-board/solid-surface cut buttons) is unchanged in every observable way — same `{status, updatedAt, updatedBy, history[]}` shape, plus this app's own long-standing `""` (not `null`) no-op-branch quirk on a not-yet-existing record, both preserved exactly. `run_machine_schedule_mark_complete.js` updated to fold the new event files instead of reading the old shared array, and to expect the new `Project Saves` folder as a sibling of the project's other files. `service-worker.js` cache bumped to `utzline-machine-schedule-cache-v5`.

**v4 (2026-09-24):** adds a read-only **"Open job note"** button to both
schedule tables. Andrew, verbatim:

> "on any scheduler, there needs to be a open job note button for each
> joinery item. between delay and view on plan."

**What changed:**

- A new **"Open job note"** button appears as the **first** button in the
  row-actions cell, **before** "View on plan" — on both the Overall
  Machine Schedule and per-project schedule tables.
- Shown **only** on a row whose item actually has one — gated on the
  row's own `jobNote` flag (read off the same `joinery-status.json` record
  this app already reads via `findJoineryStatus`; no new file read for the
  flag itself). An item with no job note gets no button and no dead-end
  empty dialog.
- Clicking it opens a small dialog listing every PDF ever attached to that
  exact item (newest first), each with an "Open" button that opens it in
  a new tab. Ported from UTZLINE Install ITP's own "View job note"
  reference implementation (`joineryItemPageKey`/`getJobNotesDirForItem`/
  `listJobNotes`), restyled to this app's own modal/button classes.
- **Read-only, no new owned file, no new write.** A job note is
  exclusively a PDF (site instructions, a delivery docket, etc.) — there
  is no text body — attached from Site Measure or the Viewer under
  `Project Saves/Job Notes/<key>/`, `key` = the same
  `joineryItemPageKey(level, room, joineryId)` identity used everywhere
  else in the family. This app only ever reads it, exactly like it already
  reads `joinery-items.json`/`joinery-status.json`.

**v3 (2026-09-23):** replaces the single "Mark Machined" action (v1/v2, see
below — **superseded by this entry**) with three independent tri-state
cut trackers. Andrew, verbatim:

> "machining schedule needs a carcase cut and a colour board cut buttons.
> when both are selected in flags machining as complete, these can also
> have a N/A selector so if a joinery item only has colour board, we could
> say N.A on the carcase and vice versa. ... if there is solid surface on
> a joinery item, that needs its own cut button on the machining schedule
> also (only visable if item has solid surface)."

**What changed:**

- **Carcase cut** and **Colour board cut** — always shown, one per item,
  each a tri-state **Pending / Done / N/A** control (a `[Done | N/A]`
  button pair; tapping the already-active button reverts it to Pending —
  the mistake-correction affordance). Pending is plain/neutral, Done is a
  filled green checkmark, N/A is greyed/italic — unambiguous at a glance.
- **Solid Surface cut** — a third, identical tri-state control, shown
  **only** when the item's own `joinery-items.json` record has
  `hasSolidSurface === true` (a field owned and written by UTZLINE
  Projects; this app only ever reads it). Not shown at all for an item
  without solid surface.
- Marking a cut **Done or N/A** requires someone signed in (same shared
  name+PIN identity as before) and stamps `{state, at, by}` — both states
  are equally "addressed" and equally attributed, per Andrew's "All
  traceable by user name" requirement for this whole feature.
- **New owned file, `machining-flags.json`** (a sibling of
  `joinery-items.json`/`joinery-status.json`, owned exclusively by this
  app — see its own header comment in `index.html` for the full shape).
  One record per item with at least one cut flag set, keyed by
  `(level, room, joineryId)`.
- **Auto-advance, unchanged pipeline:** once every currently-applicable
  cut for an item is non-Pending (Done or N/A both count), this app calls
  the exact same `setJoineryStatusForward(..., "machined", ...)` funnel
  the old single-button flow used — Manufacture ITP's "machined" sign-off
  gate keeps working with no changes on its end.
- **Forward-only, consistent with the rest of this family:** reverting a
  cut back to Pending after all three were already addressed does **not**
  retract the "machined" status already written — expected, disclosed
  behavior, not a bug.
- The **Overall/per-project tables** replace the single "Machined" column
  with three columns (**Carcase / Colour board / Solid surface** — the
  third blank/dashed for an item without solid surface), each showing the
  same inline tri-state control. The "Machined or not" filter is now
  "Fully machined or not" (an item counts as fully machined once its
  status has actually advanced to `machined`, i.e. every applicable cut
  was addressed).
- The **plan-marker tap** now opens a small **cut status panel** listing
  every applicable cut for that item (instead of the old single "Mark as
  Machined?" confirm dialog), so a machinist can address every cut for one
  item from a single tap on its plan marker.

**v2 (2026-09-23):** fixes the plan viewer, which shipped in v1 completely
broken. Andrew, verbatim (reporting the same bug against both this app and
UTZLINE Scheduler): "floor plans viewer on both schedules do not work.
rewrite them using the same format as the itp apps."

Root cause: this app's plan-canvas markup
(`<svg id="planCanvasSvg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">`)
carried a leftover `viewBox` — inherited via the UTZLINE Scheduler fork
from UTZLINE Projects' own plan canvas — while every line of this app's
own plan-viewer JS (`planFitToView`, `planClientToWorld`, `planZoomAt`,
the tile/marker `x`/`y`/`width`/`height` attributes) works in raw
image-pixel space and assumes 1 SVG user unit === 1 CSS pixel, exactly
like the ITP apps' own plan viewer (`#levelPlanSvg` in Delivery ITP and
Install ITP), which has **no `viewBox` at all**. With the `viewBox`
present, the browser remapped that 0–100 unit box onto the whole
pixel-sized viewport before the JS's own translate/scale transform was
even applied on top of it — so the floor plan image and its markers
rendered thousands of pixels wide, positioned far outside the visible
viewport. The result was a plain blank/black screen with nothing visible,
and on-screen taps (which read real CSS-pixel coordinates via
`getBoundingClientRect()`) no longer corresponded to marker positions
either.

Fix: dropped `viewBox`/`preserveAspectRatio` from `#planCanvasSvg`
entirely, matching the ITP apps' own format exactly, as Andrew asked —
the SVG's coordinate system is now plain CSS pixels, which is what every
function in the plan-viewer code already assumed. Nothing else about the
rendering/marker/pan/zoom/hit-testing logic changed; it was already
correct, it was just being fed through a mismatched coordinate space.
Verified with a real-browser (Playwright) test that opens the plan via
the actual "View on plan" button (not a test hook), confirms the image
and markers land inside the visible viewport, and performs a real
mouse-pixel click on a marker to confirm the Mark Machined dialog still
opens — see `run_machine_schedule_mark_complete.js` in the test suite,
section G.

**v1 (2026-09-23):** first release. *(Historically accurate for what
shipped in v1: a single "Mark Machined complete" action and a Machined
column. **Superseded by v3 above**, which replaces that single action with
three independent Carcase/Colour board/Solid Surface cut trackers — this
entry is left intact as a record of what v1 actually shipped.)* Andrew,
verbatim:

> "Manufacture status needs to be split up into 2 parts. We need a
> machined and a manufactured tab. All traceable by user name. Machined
> to have its own app. Called machine schedule. This is where the
> machinist can mark off a joinery item as complete. It will add their
> name and date time to the system."

Confirmed follow-up decisions the same day: (1) the pipeline is
sequential — "machined" must come before "manufactured", and UTZLINE
Manufacture ITP (updated separately) now refuses to let its own checklist
be signed off as "manufactured" until an item already has "machined" set;
(2) Manufacture ITP itself gets **no** new tab for this — Machined is
handled entirely by this standalone app; (3) this app's day-to-day UI
mirrors UTZLINE Scheduler's own shell/pattern (project picker,
sortable/filterable tables, a read-only plan viewer), simplified down to
this app's one job.

This folder is the self-contained, installable **UTZLINE Machine
Schedule** app — a brand-new app in the same family as **UTZLINE Site
Measure**, **UTZLINE Viewer**, **UTZLINE Install ITP**, **UTZLINE
Manufacture ITP**, **UTZLINE Delivery ITP**, **UTZLINE Projects**, and
**UTZLINE Scheduler**. It lets a machinist track three independent cuts
per joinery item — **Carcase**, **Colour board**, and (where it applies)
**Solid Surface** — each Pending/Done/N/A, attributed to their name and
the exact moment they did it, and once every applicable cut is addressed
it automatically advances the item to **Machined** in the same shared
status pipeline every other UTZLINE app already reads.

**Forked from UTZLINE Scheduler's own codebase**, not built from scratch
— the whole directory was copied, then cut down and rebuilt around
Machine Schedule's own job instead of Scheduler's own date-scheduling job.
That's why this app's shell looks and behaves identically to Scheduler's
own: same `index.html`-as-the-whole-app structure, same `manifest.json`/
`service-worker.js` installability pattern, same Projects-root folder
picker/reconnect flow, same read-only pan/zoom/reset plan viewer, same
status-history hover popup, and the same shared name+PIN identity system.
What's different: no scheduling dates, no delay flags — just its own
`machining-flags.json` (added in v3) tracking three tri-state cuts per
item, auto-advancing to Machined once they're all addressed.

## What it reads vs. what it writes

Machine Schedule reads the **same Projects folder** every other app in
the family uses, and is **strictly read-only** against every file another
app already owns:

- `joinery-items.json` — the project's joinery item list (read-only),
  including `hasSolidSurface` (owned/written by UTZLINE Projects; this app
  only reads it, to decide whether to show the Solid Surface cut button)
- `joinery-status.json` — the shared, forward-only status pipeline
  (read here to show each item's current status and full history, exactly
  like every other reader app in the family)
- `Project Saves/Floor Plans/<Project> - <Level>.json` (with the same
  legacy per-Level-folder fallback every ITP app and Scheduler already
  use) — a level's floor plan image and its roomlink markers, for the
  read-only plan viewer

**This app owns exactly one file of its own, `machining-flags.json`**
(added in v3) — a sibling of `joinery-items.json`/`joinery-status.json` in
each project folder, read/written EXCLUSIVELY by this app. One record per
item with at least one cut flag set, keyed by `(level, room, joineryId)`:

```json
{ "level": "...", "room": "...", "joineryId": "...",
  "carcase":      { "state": "pending" | "done" | "na", "at": "...", "by": "..." },
  "colourBoard":  { "state": "pending" | "done" | "na", "at": "...", "by": "..." },
  "solidSurface": { "state": "pending" | "done" | "na", "at": "...", "by": "..." }
}
```

`solidSurface` is present only when the item's own `hasSolidSurface` is
`true`. An item with every applicable cut back at `"pending"` has no
record at all.

**Its one other write** is the same forward-only status transition into
the shared `joinery-status.json` — via the identical
`setJoineryStatusForward()` funnel every writer app in this family already
uses — fired automatically once every currently-applicable cut for an
item is non-`"pending"`:

```js
setJoineryStatusForward(projectHandle, level, room, joineryId, "machined", updatedBy);
```

Also, at the **Projects-root level** (a sibling of every project folder,
not inside one), this app reads/writes the same shared
`utzline-users.csv` name+PIN registry every other UTZLINE app uses — this
is where Andrew's **"All traceable by user name"** requirement is
actually enforced: marking any cut Done or N/A requires someone signed in
first (see "Shared name+PIN identity" below).

## The new "machined" stage

Every app in the family converged on the same target shape the same day
this app was built — this app writes the middle rung, every other app
just displays it:

| status            | rank | label            | icon | written by |
|-------------------|------|------------------|------|------------|
| *(unset)*         | 0    | Created          | —    | — |
| `measured`        | 1    | Check measured   | 📏   | Site Measure |
| `in_manufacture`  | 2    | In manufacture   | 🏭   | Manufacture ITP |
| `machined`        | 3    | Machined         | ⚙️   | **this app** |
| `manufactured`    | 4    | Ready to dispatch | 📦  | Manufacture ITP (now refuses until `machined` is set) |
| `delivered`       | 5    | Delivered        | 🚚   | Delivery ITP |
| `installed`       | 6    | Installed        | 🏆   | Install ITP |

The forward-only guard (`newRank <= curRank` → no-op) means auto-advancing
an item to Machined twice, or one that's already progressed further, is
always safe — it simply doesn't move. This also means reverting a cut back
to Pending after all three were already addressed does **not** retract an
already-written "machined" status — expected, disclosed behavior.

## Shared name+PIN identity

Ported unchanged from this app's UTZLINE Scheduler fork (itself copied
verbatim from UTZLINE Delivery ITP's own reference implementation):

- A `<select id="identitySelector">` on the Home screen **is** the button
  — its own dropdown lists every known name plus "+ Add a new name…". No
  separate "Set your name" button or popup.
- Picking an existing name opens a real on-screen 4-digit numberpad to
  verify its PIN — a wrong PIN shakes/clears the pad for another try and
  never changes the signed-in identity; cancelling reverts the selector to
  whoever was previously signed in.
- Picking "+ Add a new name…" asks for the name as plain text first, then
  chooses and confirms a 4-digit PIN via two numberpad rounds, then shows
  a "Show me in" checklist of every UTZLINE app (pre-checked "Machine
  Schedule" — reference only, for Andrew's own admin use; it never
  restricts sign-in anywhere).
- The name+PIN itself lives in `<ProjectsRoot>/utzline-users.csv`
  (`Name,PIN,ShowInApps`, PIN in plain text on purpose — a reference-only
  attribution registry, not a real access-control system) — the exact
  same file every sibling UTZLINE app reads and writes. Who's currently
  signed in on *this device* lives in the same shared `utzline-identity`
  IndexedDB database every sibling app already uses (origin-scoped, so a
  name set in one UTZLINE app shows up in all of them).
- **This app is where "All traceable by user name" is enforced**: every
  cut button (table or plan-marker panel) refuses to record Done or N/A,
  and the plan-marker cut status panel refuses to even open, until someone
  is signed in — there'd be nothing correct to attribute the write to
  otherwise.
- No in-app "forgot PIN" flow, by design — resetting or clearing a PIN, or
  freeing up a name, is a plain file-manager/spreadsheet edit to
  `utzline-users.csv`.

## What it does

1. **Choose the Projects folder** (same one as every other app) — the
   folder handle is remembered, same reconnect-after-permission-reset flow
   the rest of the family uses.
2. **Home** — an "Open Overall Machine Schedule" shortcut, the identity
   selector, and the list of projects found in the folder.
3. **Overall Machine Schedule** — every joinery item, across every
   project, in one full-width sortable table: Project / Level / Room /
   Joinery ID / Work order # / Status / **Carcase / Colour board / Solid
   surface**. Filterable by project, status, fully-machined-or-not, and a
   text search (ID or work order #). Hovering (or tapping, on touch) the
   Status cell opens a popup listing that item's full status history —
   every stage it's passed through, when, and who changed it (same
   interaction as UTZLINE Projects' own Joinery Register and UTZLINE
   Scheduler).
4. **Project Machine Schedule** — the same table scoped to one project (no
   Project column), plus a way to jump straight into any level's plan.
5. **Cut columns** — Carcase and Colour board always show a `[Done | N/A]`
   button pair; Solid surface shows the same pair only when the item's
   `hasSolidSurface` is true, otherwise a plain dash. The active state is
   highlighted (green checkmark for Done, greyed/italic for N/A); tapping
   the already-active button reverts it to Pending. Once every applicable
   cut for an item is Done or N/A, this app automatically advances its
   shared status to Machined.
6. **Level Plan** — a read-only pan/zoom view of a level's saved floor
   plan and its markers (the same rendering the rest of the family already
   uses). Drag to pan; scroll-wheel or pinch to zoom; zoom in/out buttons
   and a **Reset view** button sit in the topbar. **Tap a marker**
   (right-click and press-and-hold/long-press also work, as alternate
   paths) to open the **cut status panel** for that item.
7. **Cut status panel** — lists every applicable cut for the tapped item
   (Carcase / Colour board, plus Solid Surface when it applies) as the
   same `[Done | N/A]` controls the table uses; each tap writes
   immediately and the panel updates in place, so a machinist can address
   every cut for one item from a single tap on its plan marker. Closing
   the panel refreshes the table underneath.

## Known, disclosed limitations

- **Same item-matching caveat as `joinery-status.json` elsewhere in this
  family**: two joinery items that ever collide on the exact same
  `(level, room, joineryId)` triple are treated as one. No stable per-item
  ID exists anywhere in this ecosystem yet to do better.
- **Legacy, not-yet-migrated projects.** The plan viewer reads a level's
  markers from `Project Saves/Floor Plans/<Level>.json`, falling back to
  the older per-Level-folder shape — same dual-path loader every ITP app
  and Scheduler already use. A project not yet touched by either fallback
  path won't offer "View on plan" for a level until one exists, but its
  items still appear correctly in both tables regardless.
- **Tapping the already-active Done/N/A button reverts that cut to
  Pending** — this is the intended mistake-correction affordance, not a
  bug. **Reverting a cut after all three were already addressed does not
  retract an already-written "machined" status** — consistent with this
  whole family's forward-only status pipeline design (see "The new
  'machined' stage" above).

## Accent color

Teal/cyan (`#0e8f8a` / `#3fd9d0`) — the one hue not already used by a
sibling app (Site Measure/Viewer are orange-red, Install ITP is green,
Manufacture ITP is purple, Delivery ITP is amber, UTZLINE Projects is
crimson, UTZLINE Scheduler is blue).

## Tests

`pdftest-projects/run_machine_schedule_mark_complete.js` (Playwright
against a fake File System Access API, same convention as the rest of the
family) — reworked for v3's three-cut model. Seeds a fake Projects-root
folder with a project's `joinery-items.json` (one plain item, one with
`hasSolidSurface: true`) + `joinery-status.json`, loads the app, signs in
as a test identity, and confirms via the real table buttons:

- an item **without** solid surface shows only Carcase/Colour board
  buttons; marking both (one Done, one N/A) writes `machining-flags.json`
  and auto-advances `joinery-status.json` to `machined`, attributed to the
  signed-in name;
- an item **with** `hasSolidSurface: true` shows a third Solid Surface
  button, and the status only auto-advances once all THREE cuts are
  addressed, not two;
- N/A is attributed exactly like Done (`{state:"na", at, by}`);
- reverting a cut back to Pending after full completion does **not**
  retract the already-written `machined` status;
- tapping a plan marker opens the cut status panel, correctly showing/
  hiding the Solid Surface button per item, and writes through the same
  `machining-flags.json` path as the table buttons;
- `joinery-items.json` is never touched by any of this.

`pdftest-projects/run_machine_schedule_open_job_note.js` (same fake-FS
convention) — covers v4's "Open job note" button. Seeds a fake project
with one item that has a real job-note PDF file already sitting in its
`Project Saves/Job Notes/<key>/` folder plus `jobNote: true` in
`joinery-status.json`, and one item with no job note at all, and confirms
on **both** the Overall and per-project schedule screens:

- the item with a job note shows the "Open job note" button as the FIRST
  button in its row-actions cell, before "View on plan";
- the item with no job note shows no such button at all — no dead-end
  empty dialog;
- clicking the button opens the dialog, which lists the seeded PDF by
  name, and its "Open" button opens a real object URL without a page
  error;
- the plan-viewer's no-`viewBox` fix (v2) is still intact.

## Getting this installed as its own app

**This app lives in its own separate GitHub repository** — not a
subfolder of any sibling app's repo. Every app in the UTZLINE family
(Site Measure, Viewer, Install ITP, Manufacture ITP, Delivery ITP,
Projects, Scheduler, Machine Schedule) is its own repo with its own
GitHub Pages URL.

1. In this app's own repo, add every file from this bundle at the repo
   root (not inside a subfolder) — keep the `icons/` folder structure
   intact. It'll go live at that repo's own GitHub Pages URL.
2. Open that URL once in a normal browser tab while online, so the
   service worker can cache it for offline use.
3. Install it: Chrome/Edge's install icon in the address bar ("Install
   this site as an app"). Because it has its own `manifest.json` (its own
   name and icons — teal/cyan, to tell it apart from every sibling app's
   own colour), Chrome and Windows/Android treat it as a wholly separate,
   independently installable app.
4. On a phone or tablet — likely how a machinist on the shop floor will
   actually use this — "Install this site as an app" is under the
   browser's own menu (Chrome: menu -> "Add to Home screen" / "Install
   app").

## Updating this app

Same process every time a new build ships: unzip whatever's shared in
chat, upload the files into this app's own repo root (overwriting
existing ones, keeping `icons/` intact), commit, wait for GitHub Pages to
redeploy, then close and reopen the installed app to pick up the change.
**Bump the "Current version" line at the top of this README (with a
dated changelog entry) and `service-worker.js`'s `CACHE_NAME` every
single time a change ships** — both need to move together, or installed
copies keep serving a stale cached build and this README stops being a
reliable record of what's actually live.

## Things worth knowing

- **This app has no data of its own to lose.** Everything it shows is
  read fresh from `joinery-items.json`/`joinery-status.json` every time a
  screen opens — there's no local cache to go stale or get out of sync.
- **The name+PIN registry's PIN is plain text by design, not a real
  security system** — see "Shared name+PIN identity" above. Don't treat
  it as access control.
- **Manufacture ITP enforces the sequencing, not this app.** This app
  will let anyone signed in mark any item Machined regardless of its
  current stage (subject only to the forward-only guard) — the "machined
  before manufactured" rule lives in Manufacture ITP's own checklist
  sign-off gate, not here.
- **Same `(level, room, joineryId)` matching as everywhere else in this
  family** — see "Known, disclosed limitations" above.

## What's in this folder

- `index.html` — the whole app: markup, styles, and logic in one file
- `manifest.json`, `service-worker.js` — what makes this installable and
  work offline
- `icons/` — the four PWA icon sizes (`icon-192.png`, `icon-512.png`,
  `icon-192-maskable.png`, `icon-512-maskable.png`)
- `gen_icons.py` — the script that generated those icons (gear + checkmark
  glyph, teal/cyan accent) — re-run it (`python3 gen_icons.py`, needs
  Pillow) if the glyph or colors ever need to change
