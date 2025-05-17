"""
make_chafa_symbols.py — collapse font codepoints into Chafa `--symbols` spec

# Prereq:
#   sudo apt install lcdf-typetools  # provides otfinfo
#   or brew install lcdf-typetools
#
# 1) Dump codepoints:
#    otfinfo -u "/home/marnix/pro/assets/Triplicate 240513/OTF font files (best for Mac OS)/Triplicate A Code/Triplicate A Code Regular.otf" \
#      | awk '{ print substr($1,4) }' > codepoints.txt
#
# 2) Run the script:
#    cat codepoints.txt | ./make_chafa_symbols.py > chafa_symbols.txt
#
# 3) In your JS/Node (e.g. Astro build):
#    import fs from 'fs';
#    import Chafa from 'chafa-wasm';
#
#    const symbols = fs.readFileSync('chafa_symbols.txt', 'utf-8');
#    const chafa = await Chafa();
#    const imageToHtml = chafa.imageToHtml.bind(chafa);
#    const { html } = await imageToHtml(arrayBuffer, {
#      format: chafa.ChafaPixelMode.CHAFA_PIXEL_MODE_SYMBOLS.value,
#      width: 4,
#      fontRatio: 0.58,
#      symbols,            # output from this script
#    });
"""

import sys

# Read hex codepoints from stdin, convert to ints
pts = sorted(int(line.strip(), 16) for line in sys.stdin if line.strip())
if not pts:
    sys.exit(1)

# Group into contiguous runs
groups = []
start = prev = pts[0]
for p in pts[1:]:
    if p == prev + 1:
        prev = p
    else:
        groups.append((start, prev))
        start = prev = p
groups.append((start, prev))

# Format as uXXXX or uXXXX..uYYYY and emit comma-separated
out = []
for a, b in groups:
    if a == b:
        out.append(f"u{a:04X}")
    else:
        out.append(f"u{a:04X}..u{b:04X}")

sys.stdout.write(",".join(out))
