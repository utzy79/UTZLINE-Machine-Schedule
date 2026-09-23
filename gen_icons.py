#!/usr/bin/env python3
# Generates UTZLINE Machine Schedule's icon set: a simple gear/machine
# glyph (a toothed gear with a center bore) plus a small "mark complete"
# checkmark tick, in this app's own accent colors -- teal/cyan, #0e8f8a
# (the darker ring/tooth shade) and #3fd9d0 (the brighter tick highlight).
# This is the one hue not already used by any sibling app:
#   Site Measure/Viewer  -- orange-red (#c8391c / #ff6a3d)
#   Install ITP           -- green      (#1f8a4c)
#   Manufacture ITP        -- purple    (#7c3fd1)
#   Delivery ITP            -- amber    (#e0a12c)
#   UTZLINE Projects         -- crimson (#ff3b3b)
#   UTZLINE Scheduler         -- blue   (#1f8fbf)
#   UTZLINE Machine Schedule (this app) -- teal/cyan (#0e8f8a / #3fd9d0)
import math
import os
from PIL import Image, ImageDraw

OUT = os.path.join(os.path.dirname(__file__), "icons")
os.makedirs(OUT, exist_ok=True)

BG = (14, 22, 26, 255)         # --bg
ACCENT = (63, 217, 208, 255)   # --accent-bright #3fd9d0 (tick highlight)
ACCENT_DK = (14, 143, 138, 255)  # --accent #0e8f8a (gear body / ring)
WHITE = (240, 250, 253, 255)


def polar(cx, cy, r, angle):
    return (cx + r * math.cos(angle), cy + r * math.sin(angle))


def draw_gear(d, cx, cy, size, color, hole_color):
    teeth = 8
    inner_r = size * 0.30   # root radius (base circle the teeth sit on)
    outer_r = size * 0.42   # tip radius (tooth tips)
    hole_r = size * 0.14    # center bore

    # Main body circle (the root of every tooth).
    d.ellipse([cx - inner_r, cy - inner_r, cx + inner_r, cy + inner_r], fill=color)

    # Teeth: one rectangle-ish polygon per tooth, computed directly in
    # polar coordinates (root_r..outer_r, angle +/- half-width) rather than
    # rotating a pasted rectangle -- keeps this a single flat draw pass.
    seg = 2 * math.pi / teeth
    half_w = seg * 0.34
    for i in range(teeth):
        a = i * seg
        pts = [
            polar(cx, cy, inner_r * 0.96, a - half_w),
            polar(cx, cy, outer_r, a - half_w * 0.7),
            polar(cx, cy, outer_r, a + half_w * 0.7),
            polar(cx, cy, inner_r * 0.96, a + half_w),
        ]
        d.polygon(pts, fill=color)

    # Center bore -- cut a hole so this reads as a gear, not a cog-sun.
    d.ellipse([cx - hole_r, cy - hole_r, cx + hole_r, cy + hole_r], fill=hole_color)

    # "Mark complete" tick, bottom-right corner -- same composition as
    # every other sibling app's own icon tick, in this app's brighter
    # accent shade so it pops against the darker gear body.
    tick_cx = cx + size * 0.34
    tick_cy = cy + size * 0.34
    tick_r = size * 0.16
    d.ellipse([tick_cx - tick_r, tick_cy - tick_r, tick_cx + tick_r, tick_cy + tick_r], fill=ACCENT)
    lw = max(2, int(size * 0.032))
    d.line([tick_cx - tick_r * 0.5, tick_cy, tick_cx - tick_r * 0.1, tick_cy + tick_r * 0.4], fill=WHITE, width=lw)
    d.line([tick_cx - tick_r * 0.1, tick_cy + tick_r * 0.4, tick_cx + tick_r * 0.55, tick_cy - tick_r * 0.35], fill=WHITE, width=lw)


def make_icon(path, size, maskable):
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    if maskable:
        d.rectangle([0, 0, size, size], fill=BG)
        glyph_size = size * 0.62  # keep inside the safe zone
    else:
        d.rounded_rectangle([0, 0, size, size], radius=size * 0.18, fill=BG)
        glyph_size = size * 0.72
    draw_gear(d, size / 2, size / 2, glyph_size, WHITE, BG if not maskable else BG)
    img.save(path)


make_icon(os.path.join(OUT, "icon-192.png"), 192, False)
make_icon(os.path.join(OUT, "icon-512.png"), 512, False)
make_icon(os.path.join(OUT, "icon-192-maskable.png"), 192, True)
make_icon(os.path.join(OUT, "icon-512-maskable.png"), 512, True)
print("done")
