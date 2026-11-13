# Bennie Dai Portfolio — Complete Website V3

This is a single-page portfolio website based on the original Figma screen recording and the interaction notes supplied with the design.

## Run it
1. Extract `bennie-portfolio-v5.zip`.
2. Open the `bennie-portfolio-v3` folder in VS Code.
3. Open `index.html` in a browser, or use the Live Server extension.

## Included
- One continuous scrolling page: Home / About / Works / Contact.
- Fixed top navigation that remains visible while scrolling.
- Home stickers that can be dragged and remain attached to their page background coordinates.
- About text placed on the supplied blue panel PNG (including the yellow tape).
- Envelope assembled in the specified layer order: back / inner fold / portrait / front flap.
- Three clickable Works objects, a two-page album window, previous/next controls, and a separate media-only preview window.
- Responsive layout for smaller screens.

## Assets
All supplied PNG assets are in `assets/`. The illustrated character and portrait crop are taken from the screenshots in the supplied interaction-design document because separate transparent character/photo files were not included in the asset pack.

## Adding actual work images/videos
Open `script.js` and edit the `WORKS` object near the top. Use entries such as:

```js
{ type: "image", src: "assets/my-poster.jpg", title: "Poster design" }
{ type: "video", src: "assets/my-animation.mp4", title: "3D animation" }
```

Put the media files in `assets/`. Each inner array in `pages` is one album spread. Two items appear on the left and two on the right. Add more arrays to add more pages.

## Notes
- The draggable stickers use section-relative absolute coordinates, not `position: fixed`.
- Touch devices retain native vertical scrolling; dragging is enabled with a mouse or pen to avoid blocking page scroll.
- The Google font import is optional. If unavailable, the local fallback fonts are used.


## V5 layout correction
- Restored the original staggered camera / book / phone layout from the Figma screenshots. The three objects keep their distinct size, angle, and relative placement, with only a small upward adjustment.
- Restored the warm-brown Contact footer band at the end of the page.
