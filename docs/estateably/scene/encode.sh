#!/bin/bash
# Assembles rendered PNG frame sequences into leg mp4 clips + posters.
# Usage: bash encode.sh
set -e
cd "$(dirname "$0")"
OUT=../../../public/estateably/assets
mkdir -p "$OUT"

LEGS="0 1 2 3 4 5 6 7"

for leg in $LEGS; do
  FPS=30
  echo "=== leg $leg desktop ==="
  ffmpeg -y -framerate $FPS -i "frames/landscape/leg$leg/%04d.png" \
    -c:v libx264 -pix_fmt yuv420p -g 8 -keyint_min 8 -crf 16 -movflags +faststart -an \
    "$OUT/leg-$leg.mp4" -loglevel error

  echo "=== leg $leg mobile ==="
  ffmpeg -y -framerate $FPS -i "frames/portrait/leg$leg/%04d.png" \
    -c:v libx264 -pix_fmt yuv420p -g 4 -keyint_min 4 -crf 18 -movflags +faststart -an \
    "$OUT/leg-$leg-m.mp4" -loglevel error
done

echo "=== posters (from encoded mp4s) ==="
for leg in $LEGS; do
  # Page markup uses JPEG posters, regardless of local WebP support.
  ffmpeg -y -i "$OUT/leg-$leg.mp4" -frames:v 1 -q:v 3 "$OUT/leg-$leg.jpg" -loglevel error
  ffmpeg -y -i "$OUT/leg-$leg-m.mp4" -frames:v 1 -q:v 3 "$OUT/leg-$leg-m.jpg" -loglevel error
done

echo "=== sizes ==="
ls -la "$OUT"/leg-*.mp4 "$OUT"/leg-*.webp "$OUT"/leg-*.jpg 2>/dev/null

echo "=== seam PSNR ==="
for i in 0 1 2 3 4 5 6; do
  j=$((i+1))
  ffmpeg -sseof -0.15 -i "$OUT/leg-$i.mp4" -frames:v 1 "lastframe-$i.png" -loglevel error -y
  ffmpeg -i "$OUT/leg-$j.mp4" -frames:v 1 "firstframe-$j.png" -loglevel error -y
  echo -n "leg $i -> leg $j: "
  ffmpeg -i "lastframe-$i.png" -i "firstframe-$j.png" -lavfi psnr -f null - 2>&1 | grep -o "average:[0-9.]*" || echo "psnr failed"
done
