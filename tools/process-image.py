#!/usr/bin/env python3
"""Process PNG images: round corners, add padding, add drop shadow."""

import argparse
from PIL import Image, ImageDraw, ImageFilter


def round_corners(image, radius):
    """Round image corners with antialiasing via supersampling."""
    image = image.convert('RGBA')
    scale = 4
    mask_size = (image.width * scale, image.height * scale)
    mask = Image.new('L', mask_size, 0)
    draw = ImageDraw.Draw(mask)
    draw.rounded_rectangle(
        [(0, 0), (mask_size[0] - 1, mask_size[1] - 1)],
        radius=radius * scale,
        fill=255,
    )
    mask = mask.resize(image.size, Image.LANCZOS)
    alpha = image.split()[3]
    alpha = Image.composite(
        alpha, Image.new('L', image.size, 0), mask
    )
    image.putalpha(alpha)
    return image


def expand(image, padding):
    """Add transparent padding around the image."""
    image = image.convert('RGBA')
    if isinstance(padding, int):
        padding = (padding, padding, padding, padding)
    left, top, right, bottom = padding
    new_size = (image.width + left + right, image.height + top + bottom)
    result = Image.new('RGBA', new_size, (0, 0, 0, 0))
    result.paste(image, (left, top))
    return result


def add_shadow(image, blur_radius):
    """Add a centered black drop shadow behind the image."""
    image = image.convert('RGBA')
    alpha = image.split()[3]
    shadow = Image.new('RGBA', image.size, (0, 0, 0, 0))
    shadow.paste((0, 0, 0, 255), mask=alpha)
    shadow = shadow.filter(ImageFilter.GaussianBlur(blur_radius))
    result = Image.new('RGBA', image.size, (0, 0, 0, 0))
    result.paste(shadow, (0, 0), shadow)
    result.paste(image, (0, 0), image)
    return result


def parse_padding(values):
    """Parse padding argument: 1 value for all sides, 4 for LTRB."""
    if len(values) == 1:
        return values[0]
    elif len(values) == 4:
        return tuple(values)
    else:
        raise argparse.ArgumentTypeError(
            'requires 1 value (all sides) or 4 values '
            '(left top right bottom)'
        )


def make_comparison(images):
    """Stitch N images into equal-width columns side by side.

    If heights differ, taller images are resized to match the shortest.
    Each image is cropped to a column of width w // N, with image i
    taking the column at fraction i/N. 2px white vertical lines mark
    the column boundaries.
    """
    images = [img.convert('RGBA') for img in images]
    n = len(images)

    # Normalize heights — resize taller images to match the shortest
    shortest = min(img.height for img in images)
    for i, img in enumerate(images):
        if img.height > shortest:
            ratio = shortest / img.height
            images[i] = img.resize(
                (round(img.width * ratio), shortest), Image.LANCZOS
            )

    h = shortest
    col_width = max(1, min(img.width for img in images) // n)

    canvas = Image.new(
        'RGBA', (col_width * n + 2 * (n - 1), h), (0, 0, 0, 0)
    )
    draw = ImageDraw.Draw(canvas)

    for i, img in enumerate(images):
        x = i * (col_width + 2)
        col = img.crop((i * col_width, 0, (i + 1) * col_width, h))
        canvas.paste(col, (x, 0))
        if i < n - 1:
            draw.line(
                [(x + col_width, 0), (x + col_width, h)],
                fill=(255, 255, 255, 255), width=2
            )

    return canvas


def main():
    parser = argparse.ArgumentParser(
        description='Process PNG images: round corners, add padding, '
        'add drop shadow, or create a side-by-side comparison.'
    )
    parser.add_argument(
        '-i', '--input',
        help='Input PNG file (leftmost column when combined with -c)'
    )
    parser.add_argument(
        '-o', '--output', required=True,
        help='Output PNG file'
    )
    parser.add_argument(
        '-c', '--compare', type=str, nargs='+', default=None,
        help='Images for side-by-side comparison (each adds one '
        'column; if -i is omitted, the first is the leftmost column)'
    )
    parser.add_argument(
        '-r', '--radius', type=int, default=None,
        help='Corner radius in pixels (rounded corners)'
    )
    parser.add_argument(
        '-e', '--expand', type=int, nargs='+', default=None,
        help='Padding: 1 value for all sides, or 4 for '
        'left top right bottom'
    )
    parser.add_argument(
        '-s', '--shadow', type=int, default=None,
        help='Drop shadow blur radius in pixels'
    )

    args = parser.parse_args()

    if args.expand is not None:
        args.expand = parse_padding(args.expand)

    if args.input is None and args.compare is None:
        parser.error('either -i or -c is required')

    if args.compare is not None:
        if args.input is not None:
            paths = [args.input] + args.compare
        else:
            paths = args.compare
        image = make_comparison([Image.open(p).convert('RGBA') for p in paths])
    else:
        image = Image.open(args.input).convert('RGBA')

    if args.radius is not None:
        image = round_corners(image, args.radius)

    if args.expand is not None:
        image = expand(image, args.expand)

    if args.shadow is not None:
        image = add_shadow(image, args.shadow)

    image.save(args.output)


if __name__ == '__main__':
    main()
