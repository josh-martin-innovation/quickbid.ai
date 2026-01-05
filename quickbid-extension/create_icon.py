from PIL import Image, ImageDraw, ImageFont
import os

# Create a 128x128 icon
size = 128
img = Image.new('RGBA', (size, size), color=(0, 0, 0, 0))
draw = ImageDraw.Draw(img)

# Draw gradient circle background
for i in range(64):
    color = (102 - i, 126 - i, 234 - i, 255)
    draw.ellipse([i, i, size-i, size-i], fill=color)

# Draw lightning bolt (simplified geometric shape)
lightning = [
    (64, 20),
    (55, 60),
    (70, 60),
    (50, 108),
    (65, 70),
    (58, 70),
]
draw.polygon(lightning, fill='white')

# Save
img.save('icon.png')
print("Icon created successfully!")
