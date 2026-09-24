// UTZLINE Machine Schedule offline service worker.
//
// This is a brand-new, standalone app in the UTZLINE family, shipped
// 2026-09-23. Andrew asked for it verbatim: "Manufacture status needs to
// be split up into 2 parts. We need a machined and a manufactured tab.
// All traceable by user name. Machined to have its own app. Called
// machine schedule. This is where the machinist can mark off a joinery
// item as complete. It will add their name and date time to the system."
//
// Confirmed follow-up decisions (same day): (1) the pipeline is
// sequential -- "machined" must come before "manufactured", and UTZLINE
// Manufacture ITP (updated separately) now refuses to let its own
// checklist be signed off as "manufactured" until an item already has
// "machined" set; (2) Manufacture ITP itself gets no new tab for this --
// Machined is handled ENTIRELY by this standalone app; (3) this app's
// day-to-day UI mirrors UTZLINE Scheduler's own shell/pattern (project
// picker, sortable/filterable tables, a read-only plan viewer), simplified
// down to this app's one job.
//
// It is, in fact, FORKED from UTZLINE Scheduler's own codebase (copied
// whole, then cut down), which is why its shell -- the Projects-root
// folder picker/reconnect flow, the pan/zoom/reset plan viewer, the
// status-history hover popup, and the full shared name+PIN identity system
// -- looks and behaves identically to Scheduler's own. Sits alongside
// UTZLINE Site Measure, Viewer, Install ITP, Manufacture ITP, Delivery
// ITP, Projects, and Scheduler -- its own manifest, own icon (teal/cyan,
// #0e8f8a/#3fd9d0 -- the one accent hue not already used by a sibling:
// Site Measure/Viewer orange-red, Install ITP green, Manufacture ITP
// purple, Delivery ITP amber, Projects crimson, Scheduler blue), own
// taskbar/Start-menu entry, own cache namespace
// ("utzline-machine-schedule-cache-*"). Like Install ITP/Manufacture
// ITP/Delivery ITP/Projects/Scheduler, this is NOT built from source.html
// -- it's its own small, purpose-built codebase.
//
// WHAT IT READS (the SAME Projects-root folder every other app in the
// family uses), strictly READ-ONLY:
//   <Project>/joinery-items.json    -- {joineryId, level, room,
//     workOrderNo, ...} records
//   <Project>/joinery-status.json   -- the shared, forward-only status
//     pipeline (used here to show an item's current status and full
//     history, exactly like every other reader app in the family)
//   <Project>/Project Saves/Floor Plans/<Project> - <Level>.json (with a
//     legacy per-Level-folder fallback) -- a level's floor plan image and
//     its roomlink markers, for the read-only plan viewer
//
// WHAT IT WRITES: as of v3 (2026-09-23) this app owns exactly ONE file of
// its own -- "machining-flags.json" (see the versioned comment block below
// for its full shape) -- plus its one other write, a forward-only status
// transition into the SAME shared joinery-status.json every sibling app
// already reads and writes, via the identical setJoineryStatusForward()
// funnel every writer app in this family already uses. Marking a cut
// Done or N/A calls setMachiningCutState(), which stamps that cut into
// machining-flags.json and, once EVERY currently-applicable cut for that
// item is non-pending, calls setJoineryStatusForward(projectHandle, level,
// room, joineryId, "machined", <name of whoever just completed the last
// cut>). The forward-only guard means an item already at "machined" or
// beyond is never pushed backward.
//
// Also, at the Projects-root level (a sibling of every project folder),
// this app reads/writes the same shared utzline-users.csv name+PIN
// registry every other UTZLINE app uses -- this is where Andrew's "All
// traceable by user name" requirement is actually enforced: marking an
// item Machined requires someone signed in first.
//
// THE NEW "machined" STAGE (rank 3, between "in_manufacture" and
// "manufactured") is part of the shared rank/label/icon enum every app in
// the family converged on the same day this app was built:
//   ""               -> rank 0, "Created"
//   "measured"        -> rank 1, "Check measured",    📏
//   "in_manufacture"  -> rank 2, "In manufacture",    🏭
//   "machined"        -> rank 3, "Machined",          ⚙️   <- what THIS app writes
//   "manufactured"    -> rank 4, "Ready to dispatch", 📦
//   "delivered"       -> rank 5, "Delivered",         🚚
//   "installed"       -> rank 6, "Installed",         🏆
//
// Same cache-first app shell strategy as every other app in the family: a
// small, fixed set of local files, no CDN calls once installed. Bump
// CACHE_NAME whenever index.html or any vendored asset changes, so
// installed copies pick up the update instead of serving stale files
// forever.
//
// (v1, 2026-09-23: first release, forked from UTZLINE Scheduler's own
// codebase. Kept from that fork: the Projects-root folder picker/
// reconnect flow, reading joinery-items.json/joinery-status.json, the
// Overall and per-project sortable/filterable full-width tables, the
// read-only pan/zoom/reset plan viewer with tap-a-marker-for-an-action,
// the status-history hover/tap popup, and the full shared name+PIN
// identity system (with a new ["MachineSchedule","Machine Schedule"]
// entry added to this app's own local APP_CODES list). Removed entirely:
// Required Delivery Date, Manufacture Lead Time, Manufacture Start Date,
// the Set Schedule/Edit schedule/Clear schedule dialog, joinery-
// schedule.json reading/writing, computeDelayInfo and every delay-flag
// column. Added: setJoineryStatusForward (the same shared write funnel
// every other writer app in the family uses) and a single primary action,
// "Mark Machined complete", available both as a table-row button and by
// tapping an item's plan marker (opens a small confirm dialog) -- on
// confirm, forward-only-guards a "machined" transition into
// joinery-status.json, attributed to whoever's signed in. A Machined
// column shows either that action or, once done, a checkmark with who did
// it and when.)
//
// (v2, 2026-09-23: fixed a leftover viewBox on #planCanvasSvg that made
// the plan viewer render blank -- see README for the full root cause.
// Nothing about the data model changed.)
//
// (v3, 2026-09-23: Andrew, verbatim -- "machining schedule needs a carcase
// cut and a colour board cut buttons. when both are selected in flags
// machining as complete, these can also have a N/A selector so if a
// joinery item only has colour board, we could say N.A on the carcase and
// vice versa. ... if there is solid surface on a joinery item, that needs
// its own cut button on the machining schedule also (only visable if item
// has solid surface)." Replaces the single "Mark Machined complete"
// action/column from v1/v2 with THREE independent tri-state
// Pending/Done/N/A cut trackers: Carcase cut and Colour board cut always
// shown, Solid Surface cut shown only when the item's own
// joinery-items.json record has hasSolidSurface===true (a field owned and
// written by UTZLINE Projects, this app only reads it). Each cut is a
// small [Done | N/A] button pair -- tapping the already-active one reverts
// it to Pending (the mistake-correction affordance) -- shown inline in
// both schedule tables and in a small panel opened by tapping an item's
// plan marker (replacing the old single confirm dialog). Every Done/N/A
// stamp is {state, at, by}, both equally attributed per Andrew's own "All
// traceable by user name" requirement.
//
// NEW OWNED FILE: "machining-flags.json", a sibling of joinery-items.json/
// joinery-status.json in each project folder, owned EXCLUSIVELY by this
// app (mirrors UTZLINE Scheduler's own joinery-schedule.json convention).
// One record per item with at least one cut flag set, keyed by
// (level, room, joineryId):
//   { "level":"...", "room":"...", "joineryId":"...",
//     "carcase": {"state":"pending"|"done"|"na","at":"...","by":"..."},
//     "colourBoard": {"state":"...", "at":"...", "by":"..."},
//     "solidSurface": {"state":"...", "at":"...", "by":"..."} // only if hasSolidSurface
//   }
// An item with every applicable cut back at "pending" gets no record at
// all -- see index.html's own setMachiningCutState for the exact upsert/
// remove logic.
//
// AUTO-ADVANCE: every write to machining-flags.json re-checks whether
// EVERY currently-applicable cut for that item is now non-"pending" (Done
// or N/A both count as "addressed") and, if so, calls
// setJoineryStatusForward(projectHandle, level, room, joineryId,
// "machined", <name of whoever just completed the last cut>) -- the exact
// same shared write funnel the old single-button flow used, so
// Manufacture ITP's existing "machined" sign-off gate keeps working
// unchanged. Consistent with this whole family's forward-only status
// pipeline design, reverting a cut back to Pending after all three were
// already addressed does NOT retract that "machined" status -- expected,
// disclosed behavior, not a bug.)
//
// (v4, 2026-09-24: Andrew, verbatim -- "on any scheduler, there needs to be
// a open job note button for each joinery item. between delay and view on
// plan." Adds a read-only "Open job note" button to BOTH schedule tables'
// row-actions cell (Overall and per-project), as the FIRST button, before
// the existing "View on plan" one -- ported from UTZLINE Install ITP's own
// "View job note" reference implementation. A job note is exclusively a
// PDF (site instructions, a delivery docket, etc) attached from Site
// Measure or the Viewer -- this app only ever reads it, same as every
// other reader app in the family. The button only renders on a row whose
// item actually has one (row.jobNote, read off the SAME joinery-
// status.json record this app already reads via findJoineryStatus -- no
// new file read for the flag itself), so there's no dead-end "no notes
// yet" dialog on every row. Clicking it opens a shared dialog listing
// every PDF ever attached to that exact item (newest first, sorted via
// jobNoteSortKey so both the old prefix-timestamp and current suffix-
// timestamp filename shapes sort correctly together), each with an "Open"
// button (getFile() -> a short-lived object URL -> a new tab). No new
// owned file, no new write -- purely additive to the existing read-only
// surface.)
var ICON_VERSION = "v1";
var CACHE_NAME = "utzline-machine-schedule-cache-v7";

var PRECACHE_URLS = [
  "./",
  "./index.html",
  "./manifest.json?v=" + ICON_VERSION,
  "./icons/icon-192.png?v=" + ICON_VERSION,
  "./icons/icon-512.png?v=" + ICON_VERSION,
  "./icons/icon-192-maskable.png?v=" + ICON_VERSION,
  "./icons/icon-512-maskable.png?v=" + ICON_VERSION
];

self.addEventListener("install", function(event){
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache){
      return cache.addAll(PRECACHE_URLS);
    }).then(function(){
      return self.skipWaiting();
    })
  );
});

self.addEventListener("activate", function(event){
  event.waitUntil(
    caches.keys().then(function(names){
      return Promise.all(
        names.filter(function(n){ return n !== CACHE_NAME; })
             .map(function(n){ return caches.delete(n); })
      );
    }).then(function(){
      return self.clients.claim();
    })
  );
});

self.addEventListener("fetch", function(event){
  if (event.request.method !== "GET") return;
  event.respondWith(
    caches.match(event.request).then(function(cached){
      var networkFetch = fetch(event.request).then(function(response){
        if (response && response.status === 200){
          var copy = response.clone();
          caches.open(CACHE_NAME).then(function(cache){ cache.put(event.request, copy); });
        }
        return response;
      }).catch(function(){
        return cached;
      });
      // Cache-first for instant offline loads; refresh the cache in the
      // background whenever the network is available.
      return cached || networkFetch;
    })
  );
});
