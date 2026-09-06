"""
Genera assets de marca placeholder para Dev Works (favicon, OG image).
Estos son PLACEHOLDERS visuales generados proceduralmente (no stock, no logos
inventados de terceros) para que el proyecto sea funcional out-of-the-box.
Dev Works debe reemplazarlos por su identidad de marca real cuando la tenga.

Uso: python3 scripts/generate-brand-assets.py
"""
import math
import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PUBLIC = os.path.join(ROOT, "public")
os.makedirs(PUBLIC, exist_ok=True)

BG = (8, 8, 10)
ACCENT = (110, 107, 255)
ACCENT_2 = (62, 230, 196)
FG = (245, 245, 247)
MUTED = (161, 161, 170)

FONT_BOLD = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
FONT_REG = "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"


def draw_grid(draw, w, h, step=48, color=(255, 255, 255, 10)):
    overlay = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    od = ImageDraw.Draw(overlay)
    for x in range(0, w, step):
        od.line([(x, 0), (x, h)], fill=color, width=1)
    for y in range(0, h, step):
        od.line([(0, y), (w, y)], fill=color, width=1)
    return overlay


def rounded_square_icon(size=512, radius_ratio=0.24):
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    radius = int(size * radius_ratio)

    # background gradient (diagonal, dark -> accent tint)
    grad = Image.new("RGB", (size, size), BG)
    gd = ImageDraw.Draw(grad)
    for y in range(size):
        t = y / size
        r = int(BG[0] + (18 - BG[0]) * t)
        g = int(BG[1] + (16 - BG[1]) * t)
        b = int(BG[2] + (34 - BG[2]) * t)
        gd.line([(0, y), (size, y)], fill=(r, g, b))
    mask = Image.new("L", (size, size), 0)
    ImageDraw.Draw(mask).rounded_rectangle([0, 0, size - 1, size - 1], radius=radius, fill=255)
    img.paste(grad, (0, 0), mask)

    # subtle border
    draw.rounded_rectangle([1, 1, size - 2, size - 2], radius=radius, outline=(255, 255, 255, 40), width=max(1, size // 128))

    # accent glow blob
    glow = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    gdraw = ImageDraw.Draw(glow)
    gdraw.ellipse([size * 0.55, -size * 0.15, size * 1.15, size * 0.45], fill=(*ACCENT, 130))
    glow = glow.filter(ImageFilter.GaussianBlur(size // 6))
    img.paste(glow, (0, 0), glow)
    img.putalpha(Image.composite(Image.new("L", (size, size), 255), Image.new("L", (size, size), 0), mask))

    # re-apply rounded mask cleanly on top (after glow) to keep crisp corners
    final = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    final.paste(img, (0, 0), mask)
    draw = ImageDraw.Draw(final)

    # monogram "DW"
    font_size = int(size * 0.44)
    font = ImageFont.truetype(FONT_BOLD, font_size)
    text = "DW"
    bbox = draw.textbbox((0, 0), text, font=font)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    pos = ((size - tw) / 2 - bbox[0], (size - th) / 2 - bbox[1] - size * 0.02)
    draw.text(pos, text, font=font, fill=(255, 255, 255, 255))

    # accent underline dash
    dash_w = size * 0.22
    dash_y = size * 0.72
    draw.rounded_rectangle(
        [size / 2 - dash_w / 2, dash_y, size / 2 + dash_w / 2, dash_y + size * 0.035],
        radius=size * 0.02,
        fill=(*ACCENT_2, 255),
    )
    return final


def save_favicons():
    icon = rounded_square_icon(1024)
    icon.save(os.path.join(PUBLIC, "icon-1024.png"))
    for size, name in [(512, "icon-512.png"), (192, "icon-192.png"), (180, "apple-touch-icon.png"), (32, "favicon-32x32.png"), (16, "favicon-16x16.png")]:
        icon.resize((size, size), Image.LANCZOS).save(os.path.join(PUBLIC, name))
    # .ico multi-size
    icon.resize((256, 256), Image.LANCZOS).save(
        os.path.join(PUBLIC, "favicon.ico"),
        sizes=[(16, 16), (32, 32), (48, 48), (64, 64), (256, 256)],
    )


def save_og_image():
    w, h = 1200, 630
    img = Image.new("RGB", (w, h), BG)
    draw = ImageDraw.Draw(img)

    # vertical gradient wash
    for y in range(h):
        t = y / h
        r = int(BG[0] + (16 - BG[0]) * (1 - t) * 0.6)
        g = int(BG[1] + (14 - BG[1]) * (1 - t) * 0.6)
        b = int(BG[2] + (30 - BG[2]) * (1 - t) * 0.6)
        draw.line([(0, y), (w, y)], fill=(r, g, b))

    grid = draw_grid(draw, w, h, step=40, color=(255, 255, 255, 12))
    img.paste(Image.alpha_composite(img.convert("RGBA"), grid).convert("RGB"), (0, 0))
    draw = ImageDraw.Draw(img)

    # accent glow top-right
    glow = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    gdraw = ImageDraw.Draw(glow)
    gdraw.ellipse([w * 0.62, -h * 0.35, w * 1.25, h * 0.55], fill=(*ACCENT, 90))
    glow = glow.filter(ImageFilter.GaussianBlur(120))
    img.paste(Image.alpha_composite(img.convert("RGBA"), glow).convert("RGB"), (0, 0))
    draw = ImageDraw.Draw(img)

    # wordmark
    font_word = ImageFont.truetype(FONT_BOLD, 64)
    draw.text((80, 80), "DEV WORKS", font=font_word, fill=FG)

    # accent dash under wordmark
    draw.rounded_rectangle([82, 158, 82 + 90, 158 + 6], radius=3, fill=ACCENT_2)

    # headline
    font_h1 = ImageFont.truetype(FONT_BOLD, 44)
    lines = ["Convertimos ideas en soluciones", "digitales que hacen crecer tu negocio."]
    y = 250
    for line in lines:
        draw.text((80, y), line, font=font_h1, fill=FG)
        y += 60

    # sub
    font_sub = ImageFont.truetype(FONT_REG, 26)
    draw.text((80, 490), "Desarrollo web · E-commerce · Software empresarial · GIS", font=font_sub, fill=MUTED)

    img.save(os.path.join(PUBLIC, "og-image.png"), quality=92)


def save_manifest_icons():
    pass


if __name__ == "__main__":
    save_favicons()
    save_og_image()
    print("Brand placeholder assets generated in /public")
