# Release notes: Local Callout Studio, first release

Release notes for the [Local Callout Studio](../../local-callout-studio/README.md) tool in this repository. They follow the structure used in customer-facing release notes: new features, enhancements, fixed issues, and known issues. Only statements that the code and its test suite support are included.

**Audience:** Technical writers who annotate screenshots.  
**Shows:** Customer-facing wording, grouping by reader impact, and known issues stated plainly.

## New features

- **Numbered callouts on screenshots.** Select **Add callout**, then click each target. Numbers appear in the nearest margin, connected to the target by a line.
- **Outlines.** Drag around a region to add a rounded rectangle with its own number.
- **PNG and SVG export.** PNG is a flattened image. SVG keeps the callouts as editable vector objects.
- **Saved layouts.** Save a preset and apply it to another screenshot of the same screen. Positions scale to the new image size.
- **Batch export.** Apply the current layout to up to 40 images and download the results as one ZIP file.
- **Saved projects.** A project file keeps the image and callouts together, so editing can continue later.
- **SNAGX input.** Open a Snagit file to use its background image.

## Enhancements

- Edits can be undone, up to 25 steps.
- Label text is escaped in exports, so text entered in a label cannot run as script in an SVG file.
- The tool makes no network requests. The page blocks outbound connections.

## Fixed issues

None. This is the first release.

## Known issues

- **Presets do not follow moved controls.** A preset assumes the same layout and crop. If a control moves or a row is added, reposition the affected callouts.
- **Targets are not detected.** The tool does not find controls on its own. A new layout needs a one-time placement.
- **SNAGX input reads the background only.** Annotation layers and additional pages in a Snagit file are not read. Export a PNG from Snagit first to keep them.
- **SVG in Snagit.** Snagit may flatten an imported SVG, so the callouts are not editable there.
- **Size limits.** Images over 48 MB or 40 megapixels are rejected. Batches are limited to 40 files and 150 MB.
- **Larger export scale.** The 2× option enlarges the screenshot. It does not add detail.

## Upgrade notes

This is the first release. There is nothing to migrate.
