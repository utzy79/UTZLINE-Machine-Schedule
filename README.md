# UTZLINE Machine Schedule — installable app

**Current version: v48 (RC 1.0)** (its own independent version line, separate from every other app in the family — bump this line, and add a dated entry below, every time a new build ships.)

**v47 (2026-10-04): item numbers, everything split by room / item.** **No.** column beside Joinery ID in both schedules (Columns: untick to hide); the item page title shows "JG.33.1 - 001". Every joinery item has its own 3-digit number (001, 002 ... given once by Projects, never reused) and it follows the code in the item's file name ("JG.33.1 - 001"). Every save is split by level, room and item, even when a room has only one item: `Project Saves\RW\<Level>\<Room>\<item>\` (+ `Log\`), `PDFs\RW\<Level>\<Room>\<item>\`, `Project Saves\UTZLINE ITP\<app>\<Level>\<Room>\<item>.json`, `Project Saves\UTZLINE ITP\<app> Log\<Level>\<Room>\<item>\`, `PDFs\ITPs\<Install|Manufacture|Delivery>\<Level>\<Room>\<item>\`, `Project Saves\Site Measures\<Level>\<Room>\<page>\`, `Project Saves\UTZLINE Sub Orders\Orders\<Level>\<Room>\<item>\` (the order list and its files). <Room> is the room number. Fresh install: no older folders or older-project layouts are read (Andrew: *"I DONT WANT BACKWRDS COMPATIBILITY. i am starting brand new"*). Also in v47: the lime theme is replaced by electric blue (accent #4f8cff dark / #1f5fd6 light, blue-grey surfaces) and the app icons are recoloured to match.

**v46 (2026-10-04): one scroll bar, names per app.** The table fits the window, so only the table scrolls. Names list only shows the names ticked for this app (ShowInApps now works, by code or by the app's name as typed in the spreadsheet; administrators and rows with nothing ticked show everywhere). A new name waits for an administrator to approve it: Andrew gets a "New name to approve" box the next time he signs in (choose its apps, Approve or Decline). New "Users" pill beside Change folder (administrator PIN): tick who is an administrator, choose each name's apps, approve names waiting; nobody is removed and one administrator always stays. PDFs open inside the app on phones and tablets (Zoom, Share, Save, Close; the Back button closes it and stays on the screen).

**v45 (2026-10-04): shaded sort column, plan text like Site Measure.** The column a table is sorted by is lightly shaded; the row's Open item button is gone (tapping the row opens the item). The floor plan's marker text is drawn like Site Measure / the other schedules (its own colour, halo and font) -- the cut-progress dots are unchanged. Rework PDFs: only the latest of each rework is listed. ITP PDFs are read from PDFs\ITPs\<app>\ as well.

**v44 (2026-10-03): colours match the new logo.** Lime-yellow accent (dark #d4e21f, light #6b7500) with neutral olive-dark / pale backgrounds; header wordmark is now UTZ + coloured LINE with a mono-caps subtitle, like the other apps. Andrew: "match the machine scheduler colour scheme with the logo also the text should be colour coded like the other apps".

**v43 (2026-10-02): UTZLINE-style app icon.** House logo + wordmark with the app name underneath, in the same style as the ITP, Site Measure and Viewer icons (Andrew: "The schedules need the utzline style logos" / "And delivery").

**v42 (2026-10-02): PINs scrambled, blank PIN = choose a new one.** PINs in `utzline-users.csv` are saved scrambled (`h1:<salt>:<sha-256>`), so the file no longer shows them. A plain PIN already in the file still works and is scrambled the next time an app saves the file. A BLANK PIN cell means reset: the next sign-in as that name asks for a new PIN (twice). Update every device before anyone adds a name: an older app cannot read a scrambled PIN. A 4-digit PIN can still be guessed from the file, so keep the file private in OneDrive too.


**v41 (2026-10-02): shorter rework folder names, archiving on.** Rework files now live in `Project Saves\RW\<item>.json`, their history in `Project Saves\RW Log\<item>\` and their PDFs in `PDFs\RW\`, shared by every app (was `Project Saves\UTZLINE ITP\Install ITP Rework`; the old folders are not read). Project archiving is ON: only the Projects app archives or restores (administrator PIN) and asks about projects unopened for 90 days; every other app drops archived projects from its lists (Dollar Summary still counts them).

**v39 (2026-10-02) — RC 1.0: outstanding reworks per project, PDF header fixed, company logo in the header.**

- **Rework register card: outstanding reworks per project.** Andrew: *"this to show amount of outstanding reworks per project"* and *"clicking on the project list takes you to that projects reworks"*. The Rework register card on the home screen now lists every project that has outstanding reworks with its count (delivered reworks are not counted); tapping a project opens the register for that project only.
- **Rework PDF header fixed.** Andrew: *"builder logo to be half the size, company logo has disappeared, qr code to be smaller and go down the bottom of the page"*. The builder logo is half the size (at most 75 x 30 pt), the company logo is back (the shared rework module only looked for `company-logo.png` at the Projects root; it now looks in `logos/` first, like every other app), the QR is smaller (48 pt) and sits at the bottom right of page 1 above the footer line (page 1's text and first photo row stop above it), and the status tag no longer covers the "JOINERY REWORK" title. The three ITPs now pass the project's builder logo into the rework PDF too.
- **Company logo in the top header.** Andrew: *"hide this on all apps now"* and *"put the company logo in the top header, same height as the utzline scheduler logo (full height of header) in the centre of the page"*. The read-only "Company logo -- set in the UTZLINE Projects app" row is hidden; the logo now sits in the centre of the top header at the header's full height (white backing, hidden on screens narrower than 760 px so it never covers the title). It is still set only in the Projects app.

**v38 (2026-10-02) — RC 1.0: Cutting not required, pick a drafter, Sent to CNC, Change folder needs an administrator PIN.**

- **Reworks can be flagged to the Machine shop or the Factory managers** (as well as a drafter): *Flagged to: anyone / Not flagged to anyone / Machine shop / Factory managers / a drafter* filter in the register, an *Or flag to* row on the rework page, and the tag on each row.
- **Machine Schedule: Cutting not required + pick a drafter.** Andrew: *"note for next machine scheduler update, reworks to have the option of Cutting not required. also the option to pick a drafter to forward teh rework to"*. Every rework to cut now has a **Cutting not required** button (register row, "Reworks to cut" list and the rework page): the rework stays Logged but leaves "Reworks to cut", shows a grey *Cutting not required* tag, and Cut is refused until **Cutting needed after all** (needs your PIN, like undoing a cut) puts it back. The rework page has a **Drafter** card: pick one of the project's drafters (whoever uploaded shop drawings into it, else the shared name list) and **Flag to drafter** (or **Flag to another drafter**); the drafter answers in the Viewer and the answer (*Sent to CNC*, with the file name / *Not required* / passed on) shows in the register row, the rework page, the log and the PDF. A drafter filter joins the register's filters. Tested: `pdftest-scheduler/run_machine_cut_not_required_drafter.js`.
- **Change folder needs an administrator PIN, in every app.** Andrew: *"to chose another folder you must enter an administrator pin (on any app)"* and *"Andrew Utz will be the Administrator for now, but possibility to change it later"*. Pressing Change folder now opens a small numberpad that only an administrator's PIN (checked against `utzline-users.csv`) will pass, then the folder picker. The administrators are the names in `utzline-admins.json` at the Projects root (`{"admins":["Andrew Utz"]}`); until that file exists it is just Andrew Utz, and it can be changed later by editing that one file. If the user list can't be read (no folder, permission lapsed, file gone) or no administrator has a PIN in it, the change is allowed so nobody is ever locked out of a lost folder. Reconnect Folder (same folder) is unchanged.
- **"Sent to CNC"** (was "Resent to CNC"): the drafter's answer reads *Sent to CNC* on screen, in the log and in PDFs (the stored value is unchanged, so old reworks still read correctly). Andrew: *"drafter needs an option to mark the rework as Sent to CNC"* and *"and add a filename"* -- the drafter can type the **file name** sent to the CNC beside it; it is kept with the answer and shown in the log, the drafter line and the rework PDF.
- **Rework module:** new event kind `cutNotRequired` (Machine Schedule) and the file name on `drafterAction`; every app reads and shows them even where it can't write them.

**v37 (2026-10-02) — RC 1.0: each rework has its own QR code, rework PDF header redesigned.**

- Andrew: *"can each rework have its own qr code"*. Every rework's own PDF now carries **its own QR code** (top right of page 1, "Scan to open this rework"). Which ITP it opens follows the rework's **stage** (Andrew: *"it will depend on the status"*, then *"also need to think about the manufacture itp"* -> *follow the stage*): logged or cut -> **Manufacture ITP**, complete / ready to deliver -> **Delivery ITP**, delivered or closed out -> **Install ITP**. The link names the rework (`&a=rework&w=<id>`; spaces as `+` so the code stays small). A hosted copy opened from a phone-camera link hands off to the right ITP by the rework's stage (`&h=1` stops it going back and forth); the app's own Scan button just opens it where it is. The item's Rework screen opens with **that rework's card scrolled into view and ringed**. Shared `UtzQr.reworkLink / reworkApp` and `UtzRework` (every app that makes a rework PDF now carries the QR module).
- **Rework PDF header like Andrew's picture**: company logo top left, the builder's logo and — always — the **UTZLINE logo** top right (the UTZLINE mark in every app, no longer the app's own icon), the rework's QR in the gap between them, the title row and status tag underneath. With no company logo the QR makes the header a little taller, so the first row of photos may start on page 2.

**v36 (2026-10-02) — RC 1.0: job notes are IFC.**

- Andrew: *"change JN to IFC"*. Job notes are now **IFC** (Issued For Construction): the folder under `PDFs\` is `PDFs\IFC\<Level>\<Room>\<item>\` (was `PDFs\JN\...`), and a job note's file name carries ` -- IFC -- ` (`<project> -- IFC -- <room> - <code> - <saved>.pdf`; Site Measure and the Scheduler write them). Shared folder code (`UtzItemFiles`), so every app reads the same place; the code still says "JN" internally, only the folder and the tag read IFC. Old `PDFs\JN` folders are not read any more (Andrew: happy to lose old files as long as new ones work); his existing 3749 job notes were renamed and moved to `PDFs\IFC`.

**v35 (2026-10-02) — RC 1.0: job notes and shop drawings are in room folders.**

- Andrew: "i want every room to have a folder, then the joinery within it" (then "im happy to lose old files, as long as new ones work"). This app reads job notes and shop drawings in `PDFs\JN\<Level>\<Room>\<item>\` and `PDFs\SD\<Level>\<Room>\<item>\<drawing>\` (room = the room number; level cut to 30; "No level" / "No room" when unknown). The old `Project Saves\Job Notes` and `Project Saves\Shop Drawings` folders are no longer read (nothing moved or deleted; `DOC_READ_OLD` in the shared item-files module switches reading them back on). Site Measure, Viewer and every other app changed in the same round, so they all look in the same place. The Windows 260-character path check counts the new folders.

**v34 (2026-10-02) — RC 1.0: the item page shows the room's site measure.** Same change as Projects v61 and Scheduler v48: the Site measures card and overlay read `Room - <level> - <room>/` first, then the item's own older folder.

**v33 (2026-10-02) — RC 1.0: builder logo on the top bar, logos folder, reversed Machined.**

- **Builder logo at the far right of the top bar** (Andrew: *"builder logo on the far right of the top bar"*): one logo in the header, just left of the day / night button, shown only while a project is open and the builder has a logo (it is hidden on the project list).
- **Company and builder logos live in a `logos` folder** at the Projects root (Andrew: *"move the company and builders logos into a logos folder"*). Every app reads `logos/` first and falls back to the old root files, so nothing breaks before the move; UTZLINE Projects writes only into `logos/` and copies the root files across once (copies -- nothing is moved or deleted). `logos` is never listed as a project.
- **Dark mode controls**: drop-downs, their open lists, text boxes and buttons that no style had touched now get a real dark background and readable text (one shared rule), and the day / night contrast was swept for white-on-pale text. The two dark-mode background variables that pointed at themselves (`--bg`, `--panel2`) are fixed.

**v32 (2026-10-01) — RC 1.0: reversing a cut reverses Machined; builder logo on project rows; sign-in cover goes up first.**

- **Reversing machining reverses its flags** (Andrew: *"if something is flagged as machined, but then the machining gets reversed, the flags need to be reversed also"*). When a cut is tapped back to Pending and that leaves an item that **was** fully cut no longer fully cut, the "Machined" status those cuts earned is reversed too: one new `statusRetract` event (`{ kind:"statusRetract", from:"machined", by, at }`) is added to the item's own `Joinery Status` folder -- nothing is deleted or rewritten, and the history popup shows the reversal ("Machined reversed", with who and when; the cancelled stage is struck through). Only when the item's status is exactly Machined: an item already Manufactured / Delivered / Installed was signed off by other people in other apps and is **left as it is** (a toast says so). An item machined by the old single button (no cut records) is untouched. Re-cutting machines it again as before. The status fold understands the event (`foldJoineryStatusEvents`); apps that don't know it yet ignore it and keep showing Machined until they are updated -- same event shape in every app's own fold when each is updated.
- Tests: `pdftest-projects/run_machine_schedule_mark_complete.js` (updated: a reversed cut now reverses Machined, a re-cut machines it again); `pdftest-projects/run_signin_cover_first.js` (new: the sign-in cover is up before the app reads anything).
- **Builder logo on the far right of each project row** on the Home list (project-meta.json "contractor" -> the logo in the Projects root), same as the Scheduler; header logo window stretches to the logo (same 30 px height).
- **Sign-in cover first** (shared sign-in module): on a tablet / phone an "Opening…" cover goes up the moment the app starts and becomes the "Who's using this?" list when the names arrive, so the app can't be used in the gap before it (Andrew: *"it opens the app, then opens the user selector just after, so someone could maybe make changes before logging in"*). Already-signed-in reloads, a PC, and a project with no names yet are as before; a 15 s safety drops the cover if the names never arrive.

**v31 (2026-10-01) — RC 1.0: the schedules' "Are you still there?" timeout.**

- **"Are you still there?"** (Andrew: *"can we add a timeout on the schedules, that asks are you still there and closes it after inactivity"*). After **15 idle minutes** (no pointer, key, wheel, scroll or touch) a dialog asks *Are you still there?* with a 60-second countdown. **I'm here** carries on; unanswered, the app closes itself back to its start -- a tablet or phone goes back to the sign-in list, a PC reloads to the start screen. Nothing needs saving first (every change is its own file). The length is 15 minutes unless the device sets `utzline:idleMinutes` (0 = never) -- there is no settings screen for it yet. Shared module `shared/idle/idle.js` (inlined between `UTZLINE-IDLE` markers in all three schedule apps).
- Test: `pdftest-scheduler/run_idle_timeout_and_status_col.js`.

**v30 (2026-10-01) — RC 1.0: code-only file names -- joinery codes, not descriptions, in every file and folder name (path-limit round, fourth build).**

- Andrew: *"have a real good think about how we can minimise filepaths, maybe we need to lose the joinery descriptions and just have joinery codes. give me a solid solution"* -- then *"I have no actual current files so dont care if I need to start again"*. Every folder and file kept for ONE joinery item is now named by the item's **file name** -- its joinery code (e.g. `JG.33.1`; a second item with the same code is `JG.33.1 (2)`), chosen once by UTZLINE Projects when the item is made or imported and saved on the item in `joinery-items.json` (`fileKey`), never changed afterwards -- instead of `<Level> - <Room> - <Code>` (64 characters for the pilot's `Ground Floor - G.33 - Change Cubical & Patient Consent - JG.33.1`). The level, room and description stay inside the records and `joinery-items.json`, so every screen still shows them.
- Records carry the author's **initials** and a two-digit-year stamp (`JG.33.1 -- AU - 26-10-01 16-25-35-281 - set.json`, in a level folder cut to 30 characters); imported files are **renamed** on the way in (the name they came in with is kept in the record or the `.json` beside the file and is what the screen shows). On the pilot's own folder (88 characters) the longest path is now 121 of the 163 the project folder leaves -- project folders up to about 130 characters deep work.
- **Clean break:** nothing is read under the old long names. Set the project up again in UTZLINE Projects (it gives every item its file name when the project is opened) -- the other apps pick the names up from `joinery-items.json`.
- Machine Schedule: Machining flag records and the schedule it reads/writes use the item's file name.

**v29 (2026-10-01) — RC 1.0: path-limit round, third build — the folder-path banner only when records really can't fit.**

- Andrew, with the banner on screen (*"leaves only 163 for UTZLINE's own files (long room names need about 170)"*): *"what can we do, im already in the root folder for onedrive"*. 163 is plenty for the short record names -- his longest record is 150 characters after the project folder (141 with the shortest branch) -- the 170 was set for the old long names. The banner now shows only when the project's folder path leaves less than even the shortest names need (**135**), and then says so (*"even the shortest record names need about 135, so some records may not save"*).
- A record that does have to take a short `_hash` name (a very long room-and-code) is saved and read like any other, so it no longer raises the banner: the page gets a `utz-path-limit` event (why `fallback`) and a console note. The banner stays for a record that **can't** be saved at all.

**v28 (2026-10-01) — RC 1.0: path-limit round, second build — `~` is a name Chrome refuses; record names with initials and a two-digit year.**

- Andrew's first run of the morning build showed the banner with *"leaves only 0"*: Chrome's File System Access API refuses any file name containing a `~` (it treats the tilde as a reserved Windows character), so every probe file -- and the `~hash` fallback names -- would have been refused. The markers are `_` now (`_hash`, 9 characters) and the probe name has no tilde; measured on the pilot folder the real figure is 163.
- Andrew: *"change usernames to initials, year from 2026 to 26, remove milliseconds?"* -- a record's on-disk name part is now `<initials> - <yy-mm-dd hh-mm-ss-mmm> - <kind>.json` (`AU - 26-10-01 13-09-18-862 - set.json`; the record's body still carries the full name and time, every reader folds from the body). The milliseconds stay: two saves in the same second must never land on one name. Together with the level no longer in the name, the pilot's longest record is 141 characters after the project folder (was 166; it has 163).

**v27 (2026-10-01) — RC 1.0: Windows' 260-character path limit — records for long room names were saved empty.**

- **Why:** Andrew: *"some get corrupted from the import (dont bring in the pc date for delivery), then i cant change them in the schedule"* and Set schedule's *"Couldn't save this schedule -- try again"*. Windows limits a file's full path to 260 characters. The pilot project sits in `C:\Users\andrewu\OneDrive - Metro Joinery\UTZLINE Pilot\3756 - Jones Radiology Mt Barker\` (88 characters) and a schedule record for a long room name ("G.10 - Female Amenities Staff") reached 253 in full -- Chrome writes through a `<name>.crswap` swap file (7 more), so the file was created EMPTY and the save failed. 27 of the 72 schedule files in that project's Ground Floor folder were empty; the same limit was behind the items that never took the PC date on import.
- **Now:** a new record's name no longer repeats the level its folder already names -- `UTZLINE Events/<Branch>/<Level>/<Room> - <Code> -- <name> - <stamp> - <kind>.json` (the room-and-code part capped at 70 characters) -- which is 15-plus characters shorter; every record already on disk under the long name still reads, old and new side by side. When even that doesn't fit, the empty file is removed and the record is kept under a 9-character `~hash` name, and a banner says why. On a PC the first write to a project measures what its folder path leaves (a few empty probe files under `UTZLINE Events`, made and removed again) and the banner shows early when that is under the ~170 characters long room names need: *move the Projects folder nearer the drive root (for example `C:\UTZLINE Projects`), or shorten the project folder's name*. Nothing of Andrew's is touched or renamed.
- **Update every device:** an app still on the previous version doesn't see records written under the new short names (the same as when the level folders came in).

**v26 (2026-09-30) — RC 1.0: day / night mode, tick-box status filters, hide / rearrange columns, the builder's logo.**

- **Day / night mode** (Andrew: *"give me day / night mode for all apps"*): a ☀ / ☾ button at the top right of every screen switches between the dark look and a new light one; with nothing chosen the app follows the device's own setting. The choice is kept per device and shared by the UTZLINE apps on it.
- Andrew: *"these need to be tick boxes (drop down then tick on / off)"*: the **status filters** (Overall + project tables) are drop-downs of tick boxes -- tick any number of statuses, none ticked = all; remembered per device.
- Andrew: *"all schedules need the option to hide, rearrange columns"*: a **Columns** button beside the Text size bar lists the table's columns -- untick to hide, ▲ ▼ to move; the frozen identity columns and the actions column stay put; remembered per device, per table.
- **Builder's logo** beside the project's name (set up once per builder in UTZLINE Projects; the logo lives at the Projects root, the project keeps only the builder's name).
- The level plan's cut markers are **unchanged** (Andrew: *"dont change icons in machine schedule"*).
- The rework page shows the new **Drafter** line (made in the Viewer); the rework PDF carries it and the builder's logo.

**v25 (2026-09-30) — RC 1.0: sign in on open (tablets and phones), Change folder bottom right, a timer on the refresh, Overall hidden on tablets, cutting file locked with a PIN.**

- Andrew: *"can you put a small timer next to the refreshing from the folder so i can see how long it took (next to items once synced)"*. While a schedule refreshes from the folder, the *refreshing from the folder…* note carries a live timer (⏱ 4.2 s); once it has synced, the item count carries how long it took (*196 items · synced in 12.4 s*) -- on the Overall schedule and on a project's schedule, and the time stays on the count when you filter.
- Andrew: *"on next update, when opening the apps, it should as[k] for you to login, currently it just loads to the last user that was logged in, some of these tablets will have multiple users (employees)"*. **On a tablet or phone the app now asks who is using it** -- a full-screen *Who's using this?* list (every name in `utzline-users.csv`, plus *+ Add a new name…*) each time the app is opened, and again when it has been in the background for **10 minutes or more**. Tap your name and enter your 4-digit PIN on the usual numberpad. The name saved on the device is only treated as "the last person" now; if another app on the device signs in as someone else, this one asks again when it comes back to the front. **A PC is unchanged** (it keeps the last user), and the PIN numberpad, the registry and the name stamped on saves are as before.
- Andrew: *"move the change folder to the bottom right of the page, and smaller"*. The **Change folder** control on the project list is now a small button fixed to the bottom-right corner of the screen (its tooltip keeps the full wording, *Choose a different Projects folder*) instead of a full-size button / link in the list.
- Andrew: *"lets hide overalls on the tablets"*. On a **tablet or phone** the **Overall schedule** card on the home screen is hidden (a PC keeps it); a single project's schedule opens as before.
- Andrew: *"once a cutting file name is pasted, lock it, can be edited with a pin"*. A saved **cutting file name is locked** (read-only, dashed box) straight after it is pasted -- in the table and on the item's summary page. Tap the **padlock** beside it, enter **your own PIN**, and the box opens for an edit (leave it unchanged and it locks again; after saving it locks again). An empty box is still open for pasting with no PIN. Every change is still a signed, dated event, with the old names kept under *Before:*.
- Same fix as the Solid Surface Schedule (Andrew: *"these should not be stacked or cutoff"*): the row's buttons stay in one row in a real table cell, and the bottom scroll bar now reaches the whole width of the table (it stopped about 24 px short, clipping the last button).


**v24 (2026-09-30) — RC 1.0: records are kept one folder per level — much faster on a tablet.**

- Andrew: *"how can we speed up schedule loading on the app android"* / *"all are slow"*. Every status, schedule date, cut, solid-surface tick, cutting file and note is still one small file per change (nothing is ever rewritten), but they now go in **one folder per level** — `Project Saves/UTZLINE Events/<record type>/<Level>/`, each file named `<Level> - <Room> - <Code> -- <name> - <time> - <kind>.json` — instead of one folder per joinery item. A schedule now lists a handful of level folders instead of hundreds of item folders; on the tablet each folder costs about a quarter of a second.
- Records a project already has in the old item folders are still read, and both places are shown together (a record found in both counts once). UTZLINE Projects shows **Speed up this project** on a project that still has old folders and moves them — each record copied, checked, then its old copy removed.
- **Update every tablet and PC.** An app older than this one doesn't look in the level folders, so it won't see records written by this one — and only press *Speed up this project* once every device is updated.


**v23 (2026-09-30) — RC 1.0: cut progress on the floor plans.**

- Andrew: *"machining schedule to show on the machining schedule floor plans, green tick if all parts cut, blue x if part cut"*. On a level's plan, an item whose every part that applies (carcase, colour board, and solid surface if it has any) is Done or N/A — or whose status has reached Machined — shows a **green dot with a white tick**; one with some parts cut but not all shows a **blue dot with a white cross**; nothing cut yet keeps the marker's own colour. A room marker takes its room's items together. A legend sits under the plan. Marking a cut from the plan updates the marker straight away.

**v22 (2026-09-29) — RC 1.0: the ITP cards read the ITPs' change files.**

- The three ITPs now write a small change file with every checklist save, as well as the whole checklist (Andrew: *"shouldnt everything run like this. isnt that the ultimate failsafe"*). The joinery item's ITP card and the delivery pin / snapshot read the whole file plus any change files it hasn't taken in yet, so when two tablets saved the same checklist offline, both tablets' changes show here.

**v21 (2026-09-29) — RC 1.0: click a row to open its item; Cutting file and Notes columns; pinned, zoomable tables; smaller markers; saves retried.**

- **Cutting file and Notes columns, and on the joinery summary page.** Andrew: *"schedules needs a column where a cutting filename can be pated into and stored. this becomes part of the joinery summary. also a notes column where notes can be added, saved, deleted one by onr"*. All three schedules have both, and they share the same records, so what's entered in one shows in the others (Projects gets them on its next update).
  - **Cutting file:** paste the file name into the box in the row and it saves straight away; or type it and press Enter. Clear it and press Enter to remove it. The summary page shows who set it and when, and the names it had before.
  - **Notes:** tap the Notes cell (count + latest note) to open the item's notes: write one, **Save note**; each note has its own **Delete** (tap twice). The summary page has the same Notes card.
  - Both are signed with the device's name, like a cut or a status. Storage follows the family's event rule — one small file per change, never rewritten: `Project Saves/Joinery Cutting File/<Level> - <Room> - <Code>/` and `Project Saves/Joinery Notes/<Level> - <Room> - <Code>/`. Shared code: `shared/item-extras/`.
- **Click a row to open its item.** Andrew: *"also make the schedules clickable to open the summary like the projects page."* A plain click or tap anywhere on a row opens that item's page, the same as a row in the Projects Joinery Register (and the same page as Open item, a long press or a right-click). Clicks on buttons, and in the cells that do their own thing on a tap (Status history, Ordered, the cut / Completed / Delivered buttons, the action buttons), still do only that. A drag doesn't count as a click.
- **Tables: titles always visible, and zoomable** — the Scheduler's, which Andrew liked: *"ok the way you have made teh tables zoomable and locked the top of the page is perferct, do that for all schedules"*.
  - Both tables scroll inside their own box, up to the screen's height. The column titles stay pinned while the rows scroll under them; the frozen columns' titles are pinned both ways.
  - **Text size − 100% +** above each table zooms the whole table (text, buttons and all), 60–200%. Tap the % to go back to 100%. A two-finger pinch, or Ctrl + mouse wheel, zooms too. The size is kept per table on this device.
- **The frozen columns show their whole text.** Andrew, with a screenshot of the Machining table (Room cut off at *"H1.MH.056 Me…"*): *"machining table you cant read the entire text . colums can be made larger"*. Level, Room, Joinery ID and Work order # (and Project on the Overall table) were fixed at 70–130 px and cut off with "…". They now size to their content, like the Scheduler's and Solid Surface's. Room and Project wrap onto a second line past 260 / 220 px, so a long name can't push the dates off the screen. The frozen columns' positions are measured, so they always sit edge to edge, at any zoom.
- **A Description column.** Andrew: *"also missing the description column"*. Both tables now show the item's description after Joinery ID, frozen with the other identifying columns (as in the Scheduler and Solid Surface), wrapping past 240 px. It sorts, and the search boxes search it too.
- **Plan markers 20% smaller.** Andrew: *"make the indicator dots about 20% smaller (and the icons)"*. Drawn at 0.8 × their saved size, the same as every other app; tapping still uses the full size.
- **Every save is retried and checked.** Each file is read back after it's written, and a failed or short write is tried again 0.5 s and 1.5 s later. On Windows, a sync client or antivirus holding a brand-new file for a moment used to fail the save and leave an empty file behind.
- **Reads are retried twice** (0.6 s and 1.5 s, was once), and an empty event file — a save that never finished — is ignored instead of making the item "unreadable".
- **No "still syncing?" guesses.** It was usually wrong. Messages now say "couldn't read … just now".

**v20 (2026-09-29) — RC 1.0.** Andrew: *"ok, now change them all to version RC 1.0. and have that on the logos (small)"*.

- The app is now **RC 1.0** (release candidate 1.0) across the UTZLINE family. A small **RC 1.0** tag sits beside the logo in the header.
- The build number (v20) still counts up underneath, so installed copies pick up each update. It's also what the Windows installer "Setup RC 1.0" contains.

**v19 (2026-09-28) — "PC Date", long press on a row, Sent / Returned shop drawings.**

- **"PC Date".** The Required delivery date shows a **PC Date** tag when the date is the project's PC date (UTZLINE Projects v35). Folds cached by v18 are read again once, so the tag shows straight away.
- **Long press a row to open its item page.** Andrew: *"in the schedules, make it so a long press on a row takes you to that joinery item summary page"*. It works the same as the Scheduler: hold for about half a second (or right-click). Scrolling cancels it, and buttons in the row work as before.
- **Shop drawings: Sent and Returned.** The item page's card has **Sent** and **Returned** parts. Each shows its latest, with **All revisions (n)** / **All returned (n)** for the rest. Revisions read as REV A, B, C.
- **Fixes:**
  - The frozen columns no longer leave gaps that scrolled text showed through on a wide table (there since v10).
  - The long-press tint keeps the frozen columns solid.
- Tests:
  - New: `run_machine_schedule_v19_pc_date.js`, `run_machine_schedule_v19_row_long_press.js`, `run_machine_schedule_v19_shop_drawings.js`, `run_machine_schedule_v19_frozen_columns_contiguous.js`.
  - Updated: `run_machine_schedule_joinery_item_page.js`.

**v18 (2026-09-28) — Reworks: delivery pin + photo, and a shorter PDF.** This version is the same shared rework code update as Scheduler v31:
- Delivered comes from Delivery ITP's own file, including its pin, its location photo and any retakes.
- In the rework PDF, the photos start on page 1 and only run on to later pages when they don't fit.
- Tests: `pdftest-projects/run_machine_schedule_rework_cut.js` still passes, and `run_rework_cross_app.js` is new.

**v17 (2026-09-28) — Reworks on the machine schedule, with a Cut button.** Andrew, on the Scheduler's new rework register: *"this should be visible on the machining schedule also. with a cut button for when cut"*. Then: *"what happened to doing the rework logs in the schedules"*.

- **Reworks to cut:** a card at the top of the **Overall Machine Schedule** and of each **project's Machine Schedule**.
  - It lists every outstanding rework that hasn't been cut yet: code, cabinet, project/level/room, the text, and who logged it and when.
  - Each has a **Cut** button and **Open**, and the card has a **Rework register** button and Hide/Show.
  - It disappears when there's nothing to cut.
  - It paints from what's already known, then re-reads in the background only after the table has finished loading (so they never fight over the tablet's storage), at most every 3 minutes. A project's own schedule reads only that project's reworks.
- **Rework register** (Home): every rework, all projects or one.
  - Cut sits on each row that isn't cut yet. Reworks the Scheduler has marked ready to deliver show that state with no Cut button.
  - Delivered ones are in their own green section at the bottom.
- **Cut** needs a signed-in name, like every cut here. **Undo cut** (on the rework page) needs the PIN, like the cut lockout.
- **The rework page** has the photos, the full status log, a comment box with a "Sent to saw" quick pick, and **Print / Share**. They make a PDF for this rework named by who and when, with the whole log and the photos at 4 per A4 page, and save a copy beside the item's rework PDFs.
- **No conflict copies:** a Cut is a new file, `<name> - <date time> - state.json` (status `machined`), in the rework's log folder. Install ITP's shared rework file is never rewritten.
- **Joinery Item page:** the Rework card shows each rework's current state, delivered ones green and last, **Open rework**, and the item's rework PDFs.
- All of it is the shared `UtzRework` block (the same one as Scheduler v30), pasted in by `shared/sync_rework_module.py`. `jspdf.umd.min.js` is vendored and loaded only when printing or sharing.
- **Tests:**
  - New: `pdftest-projects/run_machine_schedule_rework_cut.js`. It covers:
    - the strip lists only uncut reworks (a Scheduler "ready" event and a delivered rework are left out);
    - a Cut with no name writes nothing;
    - Cut writes the state file, leaves Install ITP's file untouched and empties the strip;
    - the register states and the Delivered section;
    - Undo cut with the PIN;
    - Print saves a stamped PDF;
    - the project strip, the item card, and no page errors.
  - Updated for the new card: `run_machine_schedule_joinery_item_page.js`.
  - Every Machine Schedule test passes.

`service-worker.js` cache → `utzline-machine-schedule-cache-v17` (precaches `jspdf.umd.min.js`).

**v16 (2026-09-27):** Hides the **Schedule Backups** folder from the project list. Scheduler v29 now keeps its daily spreadsheet backups in that folder, directly in the main Projects folder (Andrew: *"a schedule backups folder directly in the main folder ... I meant in the main folder. Not the individual projects folder."*). Every app lists every folder in the main folder as a project, so each one now leaves that folder out: `isReservedRootFolderName`, the same one-line rule in every app. Tested across all 11 apps by `pdftest-projects/run_schedule_backups_folder_hidden.js`, which fails on every app's previous build and passes on the new ones.

**v15 (2026-09-27):** "Sub orders" card, with mark as received, on the Joinery Item page. Andrew, verbatim: *"ok now we need all joinery summary pages to show the associated orders. with the option to mark them as recieved."* This app's joinery summary page is its own Joinery Item page (`#screenJoineryItem`, "Open item" on any schedule row), ported from UTZLINE Projects', so it gets the same "Sub orders" card Projects already has, in the same place (between Rework and Delivery location).

- **What it shows:** every UTZLINE Sub Orders order attached to the item's `(level, room, joineryId)`, read from `Project Saves/UTZLINE Sub Orders/Orders/<Level> - <Room> - <Code>.json`. Orders are grouped under a heading per type with a count: the base four first, in Sub Orders' own order (steel, upholstery, timber, aluminium), then custom types alphabetically. Headings and chips use the order's own `typeLabel` first (Sub Orders stores it on every order), then the base label, then the raw key. That way a custom type shows its real name ("Glass Panels", not `glass-panels`) without this app keeping a copy of Sub Orders' type list. The base four keep their exact validated chip colours (steel `#3987e5`, upholstery `#d95926`, timber `#199e70`, aluminium `#c98500` with dark text). Every custom type shares one neutral chip built from this app's own `--panel2`/`--text`/`--border` tokens. There is never a new hue, because the base four already sit at the validated colour-safety ceiling. Each row shows the chip, the required-by date, supplier/PO/notes, a status line, and the same Open button the Job notes and Shop drawings cards use. The Open button's file comes from Sub Orders' `Files/<storedName>`. If that file is missing, only that row's Open is hidden.
- **Mark as received:** each order has a Received checkbox and a date, with the same interaction as Sub Orders' own View Orders list:
  - Unticked, the date is hidden.
  - Ticking fills today's local date if it's empty, shows the date and saves straight away.
  - Unticking saves `received: false` and `receivedDate: null`.
  - Changing the date while ticked saves again.
  
  After each save the row's checkbox, date and status line update in place from what was actually written. This isn't PIN-gated and doesn't need anyone signed in. Marking an order received isn't a cut change (the v7 lockout covers cuts only), and Sub Orders doesn't record a name against it either.
- **The write (`setSubOrderReceived`)** re-reads the Orders file fresh and finds the entry by `id`. It replaces that entry with a shallow copy of the raw on-disk entry (`Object.assign({}, raw, {received, receivedDate})`), then writes the whole array back as `JSON.stringify(array, null, 2)`, the same shape Sub Orders' `writeAttachedOrders` uses. It never uses a field allowlist and never writes back the card's display object, so `typeLabel` and any field Sub Orders adds later carry through untouched. Sub Orders' own `setOrderReceived` needed its v5 fix today because an allowlist there dropped `typeLabel`. The "unreadable is not empty" rule applies:
  - If the folder, file or order entry is gone (unattached or moved in Sub Orders since the page opened), nothing is written. The row reverts and a toast says so. This app never creates the file.
  - If the file exists but can't be read, it retries once (`readTextFileStrict`) and then shows "couldn't read (still syncing?) — nothing was changed".
  
  This app only ever reads Sub Orders' `Inbox/` and `Files/`.
- **Filenames:** `subOrdersFileNameFor` uses a new `subOrdersFileBase`, a byte-for-byte copy of Sub Orders' own `sanitizeFileBase`. This app's existing `sanitizeFileBase` gives the same result for any real name. The two differ only when a name is empty: this app falls back to `"plan"` and Sub Orders to `"file"`. That difference would miss the file Sub Orders wrote for an item with a blank room.
- **Speed:** the card reads once per Joinery Item page open, like every other card on that page. The read goes through the per-session directory-handle cache (`projectDir`/`getCachedDir`). Nothing is read during a table render, per row, or on hover. The new test proves the schedule table does zero Orders lookups and the page open does exactly one.

New `run_machine_schedule_sub_orders_card.js` (in `pdftest-projects`, on `fake-fs.js`). It covers:
- grouping and order;
- exact chip colours;
- a custom type's real `typeLabel` on the neutral chip;
- Open only where the Files/ file exists, and opening it;
- the empty state;
- a tick writing through with every other field preserved (`typeLabel` and a made-up `futureField` included) in Sub Orders' exact JSON shape;
- a date edit;
- untick clearing both fields;
- a custom-type tick keeping its `typeLabel`;
- an unreadable file and an order removed behind the page, each writing nothing;
- a blank-room item finding Sub Orders' own `"file"`-fallback filename;
- viewing without interacting writing nothing;
- Sub Orders' `Inbox/` and `Files/` byte-for-byte unchanged, with nothing created or removed.

Full Machine Schedule suite **12/12** (11 existing + this one). The existing tests needed no changes. `service-worker.js` cache → `utzline-machine-schedule-cache-v15`.

**v14 (2026-09-27):** Read-only "Company logo" preview (NEXT_RUN_NOTES.md item 8's family-wide scope, confirmed 2026-09-27: "every other app" means ALL apps, not just the three ITP apps already fixed). Andrew, verbatim: "change company logo should only be visable in the projects app, in every other app it should load the one chosen in projects." This app never showed a company logo anywhere before now — a new "Company logo" card was added to the Home screen (`#screenHome`), right below the identity row and above the "Projects" list: a 56×56 preview box (or a "No logo" placeholder), read-only, no upload/remove controls. Sourced from the exact same shared `company-logo.png` file UTZLINE Projects owns at the Projects root (`projectsRootHandle`, the same root `utzline-users.csv` already comes from) — `readCompanyLogoReadOnly()` decodes the raw file bytes into an object URL (no downscaling, since this app has no PDF export of a logo to feed). Refreshed from `populateHome()` alongside the existing `populateIdentitySelector()` call, best-effort with no error if the file simply isn't there yet. New `run_machine_schedule_company_logo_readonly.js` (no upload/remove UI anywhere in the DOM; the preview shows/hides correctly with/without `company-logo.png` at the root, no error either way), using a new minimal `setFakeCompanyLogoForTest()`/`companyLogoPreviewHTML()` pair on the app's existing `window.__testHooks`. Full pre-existing regression suite re-run clean (10 files).

`service-worker.js` cache → `utzline-machine-schedule-cache-v14`.

**v13 (2026-09-27):** Sticky bottom horizontal scroll bar (general note across the family, not scoped to this app). Andrew, verbatim: *"can we make the horizontal scroll bars in the schedule always appear, we cant scroll all the way to the bottom of the page to find them."* `.table-scroll`'s own native horizontal scrollbar sits at the bottom of that (potentially very tall) box — effectively the bottom of the whole page for a schedule with hundreds of rows.

- A new `#stickyHScrollBar`, pinned to the bottom of the browser viewport (not the page) via `position: fixed`, mirrors whichever `.table-scroll` is the active screen's own overflowing table — `findActiveTableScroll()` picks it, `refreshStickyHScroll()` shows/hides the bar and sizes its inner spacer to match. Synced BOTH ways with the real table via a `stickyHScrollSyncing` guard.
- Wired into the end of `renderOverallTable()`/`renderProjTable()`, `showScreen()`, `openPlanCanvasForLevel()` (the plan canvas overlay fully covers the schedule table underneath), and a brand-new debounced window resize listener — this app has no frozen-column feature of its own to piggy-back a resize hook onto (unlike Scheduler's `applyStickyColumnOffsets`), so it gets its own standalone one.
- `z-index: 20` — below the plan-canvas overlay (30) and modal backdrops (40), so it's never visible on top of either.
- New `run_machine_schedule_sticky_hscroll_bar.js` (in `pdftest-projects`): a narrow 480px viewport forces the wide `sched-table` to overflow on both the Overall Machine Schedule and a project's own schedule; confirms the bar shows/hides with the right table, bidirectional scroll sync, hides on Home, and hides/reshows correctly across a resize past/back under the table's natural width. Full `pdftest-projects` machine-schedule/solid-surface subset (19 files) plus this new one re-run clean. Identical fix also shipped to Scheduler and Solid Surface Schedule, each its own version bump per the standing per-app process note.

**v12 (2026-09-26, same day):** Family-wide status icon revert (`NEXT_RUN_NOTES.md` item 2) — same-day follow-up to v11, shipped as its own version since v11 had already been zipped and delivered before this fix landed. Andrew's earlier icon-sweep round (v9) changed `in_manufacture`: 🏭→🔨 and `machined`: ⚙️→🪚; this reverts both back to the original icons (`in_manufacture`: 🏭, `machined`: ⚙️) across the family. Both call sites in this app (`joineryStatusIcon`, and the identical pair in this file's own top-of-file rank/label/icon comment) updated; grepped for every literal 🔨/🪚 occurrence — clean. `run_machine_schedule_manufacture_start_column.js` (in `pdftest-projects`) updated to match: its icon assertions now expect 🏭/⚙️, its per-project-table `statusHtml` read moved from `cells[5]` to `cells[6]` (the v11 "Required delivery date" column insertion shifted Status over by one on that table), its viewport widened from 800px to 1000px so its frozen-column section 6 still exercises sticky behaviour above the v11 900px breakpoint, and its scroll-delta check relaxed from an exact `=== 250` to `> 0` (scrollLeft clamps to the table's real available scroll range, which shifts with viewport width). Full Machine Schedule suite re-run (this test plus the 8 pre-existing ones) — all pass. `service-worker.js` cache bumped to `utzline-machine-schedule-cache-v12`. Does not touch source.html, any ITP app, UTZLINE Scheduler, or UTZLINE Solid Surface Schedule — each ships this same revert on its own next update, per the standing per-app process note.

**v11 (2026-09-26, same day):** Andrew, verbatim: *"now update the schedules,"* — read (per the standing per-app process note in `NEXT_RUN_NOTES.md`) as "build this app's own queued Scheduler-family items now" — this app's own portion of items 3/4/5/6.

- **Required delivery date column (item 3).** Andrew, verbatim: *"add ir required delivery date after manufacture start date"* (read as dictation noise for "the"). A new "Required delivery date" column, immediately after "Manufacture start," in both `#overallTable` and `#projTable`. The data was already flowing through `buildEnrichedRows`' own `mainScheduleRec` lookup — `manufactureStartDate` was copied onto the row, but `requiredDeliveryDate` (the other field on that same folded record) never was, so this is mostly a one-line row-builder fix plus the new `<th>`/`<td>` pair. Same read-only cross-reference into the MAIN Scheduler's own `joinery-schedule.json` as Manufacture start, same muted-em-dash-when-unset display, same generic string-sort the header click already gives every other date column.
- **"View on plan" now zooms to the item (item 4).** Andrew, verbatim: *"view on plan needs to zoom into the item on the plan, all schedulers just loads the pull [full] plan page"* — this app's `openPlanCanvasForLevel` gained an optional fifth `centerOnMarker` parameter, ported near-verbatim from UTZLINE Projects' own `openPlanCanvasForLevel(centerOnMarker)` (confirmed by Andrew as "the perfect zoom level," `NEXT_RUN_NOTES.md` item 7): after the existing `planFitToView()`, it looks up the target item's own roomlink marker (`{room, joineryId}`) or a raw `{x, y}` point, then `planView.scale = Math.max(planView.scale, 1)` centred on it — at least a native 1:1 pixel view, never zoomed back out past whatever fit-to-view already chose. Wired on both call sites that are tied to one specific item — the Joinery item page's own "View on plan" button, and each table row's own "View on plan" button — passing that row's `{room, joineryId}` through. The general level-picker "Open plan" button (no single item in view) is unchanged and still just fits the whole level.
- **Frozen columns get a real, working horizontal scrollbar, and are now viewport-width-based (items 5/6).** Andrew, verbatim: *"you froze the columns as asked on the main scheduler from manufacture start onwards, great but did not add the horizontal scroll bar, no way to scroll across on windows."* Root cause: `.screen.wide-table` is a flex item of `main` (`display:flex; justify-content:center`) with no `min-width` override, so its own automatic minimum width defaulted to its max-content size — which, cascading down through `.card` and `.table-scroll`, meant `.sched-table`'s forced 1050px `min-width` was propagating all the way up: `.screen` (and therefore the whole page) grew wider than the viewport instead of `.table-scroll` ever actually overflowing internally. Any horizontal scrolling that did happen was on `main`/`body`, fighting `justify-content:center`'s own well-known "centred overflow" quirk (part of why it read as unusable/invisible specifically on Windows) — and since `.table-scroll` never genuinely overflowed, the sticky columns weren't even freezing relative to the right scrolling ancestor. Fix: `.screen{ min-width: 0; }` — one line — breaks that propagation, so `.screen` now actually shrinks to `main`'s available width, and `.table-scroll`'s own `overflow-x:auto` becomes the real, contained, always-usable native scrollbar, with the sticky columns freezing correctly relative to it.
  - Same-day follow-up (item 6): Andrew — *"can we remove the freeze on android as you cant use the schedule now"* — asked directly whether this was Android/touch-specific; his answer: *"it will be an issue on any smaller screen (small laptop, tablet, phone)."* So the whole frozen/sticky-column treatment (not just the scrollbar fix) is now gated behind `@media (min-width: 900px)` — a viewport-width breakpoint, never an OS/UA check. At/above 900px, columns up to Work order # stay pinned exactly as before; below it, every column (including those) just scrolls together in one plain, fully-scrollable table, so the frozen columns never eat up a big chunk of a small laptop/tablet/phone's own limited width.
  - Verified headless at three widths: 1400px (comfortably fits — nothing to scroll, confirming `main` never overflows regardless), 1000px (table genuinely wider than available space — sticky columns present, `.table-scroll` itself overflows and a `scrollLeft` change actually moves it, `main` does not overflow), and 700px (below the breakpoint — sticky fully off, plain scrollable table).
- Does not touch source.html, any ITP app, UTZLINE Scheduler, UTZLINE Solid Surface Schedule, or UTZLINE Projects — the frozen-column CSS pattern and the marker-jump approach are each independently ported to Scheduler and Solid Surface Schedule on their own next updates, per the standing per-app process note.
- `service-worker.js` cache bumped to `utzline-machine-schedule-cache-v11`.

**v10 (2026-09-26):** Shared-round follow-up (`BIG_ROUND_SCHEMA.md` §2/§4/§5, this app's own `BIG_ROUND_BRIEF_MACHINE_SCHEDULE.md`), built in parallel with the same round's UTZLINE Scheduler / Solid Surface Schedule / Projects updates.

*New read-only "Manufacture start" column.* Andrew, verbatim: *"machine schedule needs the manufacture start date only. (taken from the main schedule)."* This app had no schedule-date column of any kind before now, and does not gain a file of its own for it — this is a pure, read-only cross-reference into the MAIN UTZLINE Scheduler's own event-sourced `joinery-schedule.json` (`Project Saves/Joinery Schedule/<key>/`), ported verbatim from UTZLINE Solid Surface Schedule's own identical read-only port of the same file (`readMainJoinerySchedule`/`foldMainJoinerySchedule`/`migrateLegacyMainJoineryScheduleIfNeeded`/`readMainScheduleRecordForItem`, plus a new `formatDateDisplay` for the bare `YYYY-MM-DD` → "Thu, Aug 13, 2026" display, also ported from that app). This app can now be the FIRST app to open a project after the Scheduler's own v15 event-sourced update, so it carries the same legacy-migration port too: a project whose main schedule still lives in the old whole-file `joinery-schedule.json` gets migrated automatically, once, idempotently, the first time any app (including this one) opens it, and the old file is left on disk afterward, untouched. Every current item's date is folded from that branch's own event files (soft per-item fold through the existing folded-event cache, same as Machining Flags/Joinery Status), fed into `buildEnrichedRows` as a new `manufactureStartDate` field and shown as the bare formatted date (or "—" if genuinely never scheduled) — **no delay pill on this column this round** (schema §3 explicitly excludes it here). "Unreadable is not empty" applies at the folder level exactly as it already does for this app's own Machining Flags/Joinery Status branches: an item whose own event file is mid-sync just shows last-known (soft fold, catches up on refresh), but the "Joinery Schedule" folder itself being unreadable fails the WHOLE table load with an error, never a table full of false "no schedule" dashes.

Column position (a judgement call — Andrew didn't specify exactly where): placed **immediately after Work order #**, before Status/Carcase/Colour board/Solid surface, matching the "identifying columns, then schedule dates" ordering the rest of the family already uses, and making it the natural first column after the newly-frozen identifying columns (below).

*Frozen (sticky) identifying columns + a real horizontal scroll bar (schema §5).* This app's wide tables had no scoped horizontal scroll bar before now — the existing `.table-scroll`/`overflow-x:auto` wrapper div was there, but `.screen.wide-table`'s own `width:100%` (not `auto`) was already what kept it correctly scoped to the wrapper rather than leaking into a whole-page scroll, confirmed with a headless check at a narrow (800px) viewport before touching anything further. What was missing was the frozen boundary itself: every identifying column up to and including Work order # (Project [Overall table only] / Level / Room / Joinery ID / Work order #, schema §2 — never reordered) now gets `position: sticky` with a fixed per-column width and a cumulative `left` offset (one CSS class per column — `.st-project`/`.st-level`/`.st-room`/`.st-joineryId`/`.st-workorder`, offsets set per table id since the Overall table has one more frozen column than the per-project table), an opaque background matching the row's own (including its hover state, via `.id-col`), and a small drop-shadow on the Work order # column marking the freeze boundary (`.frozen-end`). Manufacture start is therefore the first column that actually scrolls. Confirmed with a headless check: scrolling the wrapper moves Manufacture start and everything after it while Level/Room/Joinery ID/Work order # (and Project, on the Overall table) stay put, and `main`'s own `scrollWidth`/`clientWidth` stay equal throughout (no whole-page scroll leak).

*Status icon swap (schema §4, family-wide but this app's own file only).* `in_manufacture`: 🏭 → 🔨. `machined`: ⚙️ → 🪚. Both call sites in this app (`joineryStatusIcon`, and the identical pair spelled out in this file's own top-of-file rank/label/icon comment) updated; grepped for every literal 🏭/⚙️ occurrence per the schema's own instruction (not just the two named functions) — no other hits in this app (no inline banner text like Manufacture ITP's `notMachinedBanner` exists here).

New regression test `run_machine_schedule_manufacture_start_column.js` (in `pdftest-projects`) covers: the column populated from a seeded main-Scheduler event-sourced record, on both the per-project AND Overall tables; the legacy whole-file `joinery-schedule.json` migration path (migrated event file created, legacy file left untouched byte-for-byte); "unreadable is not empty" (a genuinely-never-scheduled item shows "—"; an unreadable "Joinery Schedule" folder fails the whole table load instead, and Refresh recovers once it reads again); the frozen sticky columns and scroll bar on both tables (markup, no whole-page scroll leak, scrolling moves only the columns after Work order #); and the icon swap, both directly and through a real folded status cell. The eight existing tests (`run_machine_schedule_joinery_item_page.js`, `run_machine_schedule_mark_complete.js`, `run_machine_schedule_open_job_note.js`, and the five v9 sweep tests) needed no changes and all still pass — full Machine Schedule suite **9/9**. `service-worker.js` cache bumped to `utzline-machine-schedule-cache-v10`. Does not touch source.html, any ITP app, UTZLINE Scheduler, UTZLINE Solid Surface Schedule, or UTZLINE Projects in any way — this app only ever *reads* the Scheduler's `joinery-schedule.json`, exactly as its own legacy-migration port is designed to coexist safely with whichever app gets there first.

**v9 (2026-09-25):** Family-wide scheduling sweep — Andrew, verbatim: *"ok, now a full sweep of all the scheduling software"*, said straight after the Site Measure v46 and Install ITP v35 rounds. Same four family fixes applied here where they apply, the same classes of bug audited, the tablet made faster, and ordinary bugs found along the way fixed. Same shape as UTZLINE Scheduler v19 (this app's nearest sibling — it was forked from Scheduler), adapted to this app's own two event branches and its cut buttons. Nothing about any file format or filename another app reads or writes changes.

*Family fixes.* (1) **IndexedDB connection leak** — `idbOpen`/`identityDbOpen` opened a new connection per call and never closed it (the cause of "slows down after a little use" across the family); now one memoised connection per database (`idbConnP`/`identityConnP`), reopened only after the browser closes it (`versionchange`/`close`). (2) **Device / phone Back button walks back through the app** — setup / reconnect / Home `replaceState` (Back from there leaves the app as before), Overall Machine Schedule / project schedule / Joinery Item page / the plan canvas `pushState`; a popstate first closes whatever is open — the cut status panel, the Job notes dialog, the name prompt, the numberpad (including the cut lockout's PIN re-confirm, which then reads as "Change cancelled — nothing was saved"), the "Show me in" list, the status-history popover — each through its own Cancel/Close control, otherwise steps back exactly one screen through the app's existing navigation (plan → the table it came from; item page → its table; either table → Home); a step that doesn't change the screen puts the entry back so the next press asks again. (3) **"Unreadable is not empty"** — every read audited. Four were the base of a read-modify-write or a write decision and collapsed any failure to `[]`/`null`: `readUsersCsv` (so "Add a new name" on a `utzline-users.csv` that was mid-Dropbox-sync would have rewritten the registry with only the new name — everyone else's row gone); both legacy migrations, `migrateLegacyJoineryStatusIfNeeded` and this app's own `migrateLegacyMachiningFlagsIfNeeded`, which created the events folder *first* and only then read the legacy file — a legacy file mid-sync became an *empty* events folder that this app (and, for status, every app in the family) then trusts forever, the legacy file never read again by anyone, every recorded cut or status history invisible; and both write funnels' own pre-write folds — `setJoineryStatusForward`'s forward-only guard and `setMachiningCutState`'s "is every applicable cut addressed now?" check folded the item's event files *softly*, so one mid-sync "revert to pending" file silently skipped would have made every cut look addressed and filed a "machined" status event on a pipeline that never takes it back. All now distinguish NotFoundError (genuinely absent → fresh is fine) from any other failure (→ one retry after 600 ms → reject with `code:"read_failed"`, surface it, write nothing): the add-name flow says "nothing was changed"; every PIN check (sign-in *and* the lockout re-confirm) that couldn't read the file says so rather than "Incorrect PIN" and leaves the cut untouched; the migrations read the legacy file strictly *before* creating anything; a cut tap whose post-write re-read fails still saves the cut but reports that the Machined check didn't run (never guesses); `setMachiningCutState` runs the migration check first so a tap on a snapshot-painted row can never bury an unmigrated legacy file. Also strict: `readJoineryItems` (a table now says "couldn't read" instead of "No joinery items in this project yet."; a marker tap says so instead of "no matching item record"), the level-file readers (the plan says "couldn't read, try again" instead of "No saved plan found"), and a new per-item `readMachiningFlagsRecordForItem` for the plan-marker cut status panel (which shows a read error rather than a panel one cut behind that you'd then write on top of). Pure-display folds (the tables' status/cut events, the level-name listing, the item page's cards) deliberately stay soft, and say so in a comment. (4) **Speed / "icon caching like we just did"** — the rule proven on Andrew's tablet: on Android + Dropbox every File System Access call costs hundreds of ms and a named lookup scans its folder. Measured against a seeded 40-item project (two projects for the Overall table) with a call counter, v8 → v9: opening a project **266 → 71** directory/lookup calls; one cut tap on the project table **277 → 4** calls and **106 → 1** file reads (it used to re-read the whole project after every tap; from the Overall table it re-read *every* project: **521 → 4**); opening the Overall table **509 → 133**; a second visit to the same project **270 → 65** calls and **105 → 5** file reads. How: a per-session directory-handle cache (`getCachedDir`/`projectDir`, cleared on a root change, dropped on failure); memoised migration checks; per-item event folders read from the handles the listing already returns (no named lookup per item); a folded-event cache in this app's IndexedDB keyed on each item's immutable event filenames (only an item with a new file is actually read); projects read in parallel (`Promise.all`) instead of a sequential `reduce` chain; **instant paint** — Home, the Overall table and each project schedule paint their last-known rows from a device-local snapshot at once (with a "refreshing…" note), refresh from the folder behind it and repaint, rows stored without their directory handle and getting it back lazily on first use; **in-place row patching** after a cut tap — the write already knows the folded record it produced and whether it advanced the shared status, so the tapped row (and the Status column's "Machined") updates immediately with zero re-reads; `joinery-items.json` read once per plan open instead of once per marker tap; a level-name stat cache (`listFlatLevelNames` used to read and parse every multi-MB plan file just for its `name`); the plan's pan/pinch transform coalesced to one DOM write per animation frame; the search boxes debounced. (5) **Android UI robustness** — `[hidden]{display:none !important}` (see the bug below); `touch-action: manipulation` on buttons, list rows, headers *and the cut buttons*; `pan-x pan-y` on the table scroller so a tap on a row button doesn't fight the pan; `user-select:none`/`-webkit-touch-callout:none` on the plan screen plus a document-level `contextmenu` swallow while it's open, so a long press never selects the title or pops the image sheet. Andrew's standing rule ("only show view job note button if there is one applied") was already met — the button is gated on the shared status record's `jobNote` flag; no Timings/debug UI exists here.

*Filter tick boxes (addendum, 2026-09-26, same v9 build).* Andrew, verbatim, mid-sweep: *"add in tick boxes for filtering out installed and delivered items. Also machining filter out machined with a tickbox"*. Both tables (Overall Machine Schedule and per-project) get three tick boxes in their filter bar, next to the search box: **Hide machined** — hides a row whose item is fully machined (`row.machinedDone`, i.e. its status has reached Machined *or beyond* — the exact signal the "Fully machined" filter and the item page's badge already use, so a machinist ticking it sees only what still needs cutting); **Hide delivered** — hides rows whose current folded status is exactly `delivered`; **Hide installed** — exactly `installed` (installed outranks delivered, so each box is its own stage; both ticked hides both). All three apply here because this app's tables list every item whatever its stage (delivered/installed rows do appear). Default unticked; remembered per device in `localStorage`, one key per app+table+box (`utzline-machine-schedule.overall.hideMachined`, `…project.hideInstalled`, etc.), every access wrapped so a browser that refuses storage just starts unticked. Filtering happens on the rows already in memory — never a re-read from the folder — and the search box and selects still apply on top. A new count line under each filter bar follows what's visible ("Showing all 5 items" / "Showing 2 of 5 items"). Covered by `run_machine_schedule_sweep_hide_tickboxes.js` (tick → rows gone and count updated; untick → back; both delivered+installed; search on top of a tick; zero file-system calls while ticking; then a page reload → each table's own boxes come back as left and are applied to the freshly read table).

*Ordinary bugs found and fixed.* **`hidden` did nothing on the level-plan row:** the browser's default `[hidden]{display:none}` is outranked by any author display rule, so `levelPlanRow.hidden = true` on a `.card.row{display:flex}` never hid anything — the "Open a level's plan" row showed, with an empty select, for a project with no saved plan; confirmed in headless Chromium against the v8 build (computed display stayed `flex`), fixed with one rule. **Stale rows after navigation:** opening a project left the *previous* project's rows and plan levels on screen until the new reads finished — on a slow tablet a machinist could tap a cut button on a row belonging to the project they'd just left; the table is now cleared (or painted from this project's own snapshot) at once, and a superseded load (Refresh pressed again, or a different project opened before the last read finished) is dropped rather than repainting over the newer one. **Double tap filed two events:** a second tap on a cut button before the row re-rendered wrote a second event with the same target state — which, once the row caught up, read as a *revert* of the first; both buttons of a cut are now disabled while its write is in flight (table and panel). **Unhandled rejections:** the Reconnect button's `requestPermission`, a marker tap whose `joinery-items.json` read failed, and a row action whose folder lookup failed all rejected silently — each now reports. **Popover left behind:** re-sorting/filtering a table while the status-history popover was open rebuilt the cell it was anchored to and left it floating; it's now hidden on every render. **Per-project failures swallowed:** the Overall table dropped a project that couldn't be read as if it had no items; it now keeps that project's last-known rows and names it in a toast. **Missing Refresh:** the project schedule had no Refresh button (the Overall table did); added. **Text that lied:** the setup screen still described "its own machining-flags.json" (event files under `Project Saves/Machining Flags` since v6) and didn't mention the shared name+PIN registry it writes; the top-of-file comment's "this app has NO file of its own" is now marked as the superseded v1/v2-era note it is; the README's "no local cache to go stale" line below is retired.

*Deliberately left alone.* Back on the Home screen itself (the base) is not intercepted, so a dialog opened from Home — the identity selector's name prompt / numberpad — is closed by the app's own Cancel, not by the phone's Back: there is no app-owned history entry under Home to pop; this matches every reference app exactly. The migrations' per-event *write* failures are still swallowed individually (a partially-migrated events folder would then be trusted) — that's the family-wide migration contract ported byte-for-byte from `source.html`, and changing it belongs to a shared decision, not this app's sweep; reported instead. Hover-to-open on the status-history popover stays alongside tap-to-toggle (the popover is not hover-*dependent*). `detectFolderShape` still probes up to three names per project folder when a root is first picked (once per folder choice, not per screen). The Joinery Item page's "Shop drawings" card keeps its "No shop drawings yet" empty state — it's a section of a detail page, not a dead button. The plan-marker panel's `onDone` refresh-on-close is gone (rows are patched in place as each cut is written), so `openCutStatusModal`'s fourth argument is now unused and kept only for the test hook's signature.

Four new regression tests in `pdftest-projects/`: `run_machine_schedule_sweep_back_button.js` (the history walk through every screen and the dialog/panel/numberpad/popover-closes-first rule, using Playwright's real `goBack()`, including the lockout numberpad reading as a cancelled change), `run_machine_schedule_sweep_idb_single_connection.js` (`indexedDB.open` wrapped and counted across a whole session of sign-in, screens, cut taps, a plan open and refreshes — exactly one open per database), `run_machine_schedule_sweep_unreadable_not_empty.js` (the registry add/PIN/lockout paths, both legacy migrations, the strict pre-write fold — a cut saved but *no* "machined" event while a sibling event file is unreadable, then the genuine last cut advancing it once it reads — the panel's read error, and a direct cut write on a never-opened legacy project migrating first, each against a real fake-fs file that exists but can't be read, then reads again) and `run_machine_schedule_sweep_instant_paint_cache.js` (snapshots saved from live reads; a cut tap updating the row in place with its own 4 folder calls and the last cut patching Status to Machined in place; the `hidden` bug; then a reload with every project-level read made to hang — Home, Overall and the project schedule all still paint their last-known rows with the refreshing note). Plus `run_machine_schedule_sweep_hide_tickboxes.js` for the filter tick boxes (above). The three existing tests (`run_machine_schedule_mark_complete.js`, `run_machine_schedule_open_job_note.js`, `run_machine_schedule_joinery_item_page.js`) needed no changes and pass unchanged. Full Machine Schedule suite 8/8 (3 existing + 5 new). `service-worker.js` cache bumped to `utzline-machine-schedule-cache-v9`. Does not touch source.html, any ITP app, UTZLINE Scheduler, UTZLINE Solid Surface Schedule, or UTZLINE Projects in any way.

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

**Since v15, one narrow cross-app write:** the Joinery Item page's "Sub
orders" card reads UTZLINE Sub Orders' `Project Saves/UTZLINE Sub
Orders/Orders/<Level> - <Room> - <Code>.json` (and resolves each order's
file under `.../Files/` for Open), and its Received checkbox + date write
**only** `received`/`receivedDate` back into that existing Orders file —
a shallow copy of the raw on-disk entry, every other field untouched.
Nothing in Sub Orders' `Inbox/` or `Files/` is ever created, written or
deleted, and this app never creates an Orders file that isn't already
there.

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
   surface**. Filterable by project, status, fully-machined-or-not, "Hide
   machined" / "Hide delivered" / "Hide installed" tick boxes (remembered
   per device), and a
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

`pdftest-projects/run_machine_schedule_joinery_item_page.js` — v8's
read-only Joinery Item page (see the v8 entry above).

`pdftest-projects/run_machine_schedule_sub_orders_card.js` — v15's Sub
orders card and its Received checkbox + date (see the v15 entry above).
Uses `pdftest-projects/fake-fs.js`.

`pdftest-projects/run_machine_schedule_sweep_back_button.js`,
`run_machine_schedule_sweep_idb_single_connection.js`,
`run_machine_schedule_sweep_unreadable_not_empty.js`,
`run_machine_schedule_sweep_instant_paint_cache.js`,
`run_machine_schedule_sweep_hide_tickboxes.js` — v9's family-wide sweep
and its filter tick boxes (see the v9 entry above for what each covers).
These five load the app with `pdftest-projects/fake-fs.js` rather than an
inline mock.

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

- **Everything it shows comes from the folder; the device-local snapshot
  is only ever shown *until* the folder answers.** Since v9 each screen
  paints what it last showed (from this app's own IndexedDB, keyed by the
  Projects-root name) at once, with a "refreshing…" note, then re-reads
  the folder and repaints; a folded-event cache likewise only ever
  short-cuts an item whose event *filenames* are unchanged. Neither is
  ever written back to the folder, and a failed read keeps the last-known
  rows on screen and says so rather than showing an empty table.
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
