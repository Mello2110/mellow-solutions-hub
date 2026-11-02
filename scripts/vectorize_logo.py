from PIL import Image
import numpy as np

img_path = r'C:\Users\marce\.gemini\antigravity\brain\b6fcf875-c860-4247-ba95-3b85fade7939\.user_uploaded\media_1793583031903_f5ba57fc.jpg'
orig = Image.open(img_path).convert('L')
m_crop = orig.crop((113, 228, 351, 344))
w, h = m_crop.size

arr = np.array(m_crop)
binary = arr < 160

padded = np.pad(binary, ((1, 1), (1, 1)), mode='constant', constant_values=False)
start_coords = np.argwhere(padded)
if len(start_coords) == 0:
    print('No dark pixels')
    exit()

start_y, start_x = start_coords[0]

dirs = [(-1, 0), (-1, 1), (0, 1), (1, 1), (1, 0), (1, -1), (0, -1), (-1, -1)]
curr = (start_y, start_x)
b_dir = 0
boundary = []

for step in range(50000):
    boundary.append((curr[1] - 1, curr[0] - 1))
    found = False
    for i in range(8):
        d_idx = (b_dir + 1 + i) % 8
        dy, dx = dirs[d_idx]
        ny, nx = curr[0] + dy, curr[1] + dx
        if padded[ny, nx]:
            curr = (ny, nx)
            b_dir = (d_idx + 4) % 8
            found = True
            break
    if not found or (curr == (start_y, start_x) and len(boundary) > 2):
        break

print(f'Boundary points found: {len(boundary)}')

def rdp(points, epsilon):
    if len(points) < 3:
        return points
    p1 = np.array(points[0], dtype=float)
    p2 = np.array(points[-1], dtype=float)
    diff = p2 - p1
    d_norm = np.linalg.norm(diff)
    pts = np.array(points, dtype=float)
    if d_norm == 0:
        dists = np.linalg.norm(pts - p1, axis=1)
    else:
        dists = np.abs(np.cross(diff, p1 - pts)) / d_norm
    max_idx = np.argmax(dists)
    max_d = dists[max_idx]
    if max_d > epsilon:
        left = rdp(points[:max_idx+1], epsilon)
        right = rdp(points[max_idx:], epsilon)
        return left[:-1] + right
    else:
        return [points[0], points[-1]]

simplified = rdp(boundary, epsilon=0.6)
print(f'Simplified to {len(simplified)} points with epsilon=0.6')

svg_pts = ' '.join(f'{x:.1f},{y:.1f}' for x, y in simplified)
svg_content = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" fill="currentColor">
  <polygon points="{svg_pts}" />
</svg>'''

with open(r'c:\Coding\MellowSolutionsHub\public\assets\mellow-mark.svg', 'w') as f:
    f.write(svg_content)
print('SVG written to public/assets/mellow-mark.svg')
