import sys

from PIL import ImageFont

ttf_path = sys.argv[1]

# load at 200px for good precision
font = ImageFont.truetype(ttf_path, 200)
# get glyph mask for "M"
mask = font.getmask("M")
w, h = mask.size

print(f"fontRatio = {w / h:.4f}")
