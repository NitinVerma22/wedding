# TODO for Album Image Full Width and WhatsApp Share Button Feature

- [x] Update `components/Album.module.css` to make album images cover full width and height using object-fit: cover.
- [x] Modify `components/Album.tsx`:
  - [x] Add a share button UI on each image page.
  - [x] Implement WhatsApp share functionality to share the image URL with a personalized message.
  - [x] Get male and female names from header or context and include them in the share message.
  - [x] Add click handler on share button to open WhatsApp share URL.
- [x] Modify `components/AlbumContext.tsx` to provide male and female names to `Album.tsx`.
- [ ] Test the album view for full width images and share button functionality.

# TODO for Home Page Share Button

- [x] Create `components/ShareButton.tsx` with share functionality using Web Share API and fallback to clipboard.
- [x] Create `components/ShareButton.module.css` with green gradient background and curved arrow icon, similar to AlbumButton.
- [x] Add import and <ShareButton /> to `pages/index.tsx`.
- [ ] Test the share button on the home page for functionality.
