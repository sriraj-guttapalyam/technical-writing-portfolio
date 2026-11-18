# Prepare Raspberry Pi boot media

Prepare a microSD card for a Raspberry Pi desktop setup. The procedure ends when Raspberry Pi Imager has written and verified the image. It does not claim that the device has booted or passed a hardware test.

**Audience:** Lab technicians and support engineers.  
**Example:** A Raspberry Pi 4 lab unit with a spare microSD card.  
**Host:** A Windows, macOS, or Linux computer running Raspberry Pi Imager.  
**Shows:** A warning placed before a destructive action, a clear finish line, and a handoff record.

## Before you begin

- Confirm the Raspberry Pi model and the operating system required for the lab task.
- Use a microSD card with enough capacity for the selected image and a compatible card reader.
- Back up any files that must be retained from the card.
- Install Imager from the official Raspberry Pi software page.
- Ensure that the host has a stable connection for downloading the image.
- Confirm that you are authorized to erase the selected card.

This example uses the model-appropriate Raspberry Pi OS desktop image offered by Imager. It leaves first-boot account and network configuration to the desktop setup procedure. Do not use this approach for a headless device that requires remote access on first boot.

**Warning:** Writing the image erases the selected storage device. Check the device name and capacity before confirming the write. If you cannot identify the card confidently, stop.

## Select the model, image, and storage

1. Connect the microSD card to the host and open Imager.
2. On the **Device** tab, select **Raspberry Pi 4**, then select **Next**.
3. On the **OS** tab, select the appropriate Raspberry Pi OS desktop image, then select **Next**.
4. On the **Storage** tab, identify and select the microSD card. Keep **Exclude system drives** selected.
5. Select **Next**. For this local desktop example, select **Skip customisation** if Imager offers customization.
6. On the **Writing** tab, review the model, image, and target storage in the summary.

If the lab requires a fixed OS release, confirm that requirement before proceeding. Do not substitute the newest image for an approved release without checking compatibility.

## Write and verify the image

1. Recheck the target storage name and capacity, then select **Write**.
2. Read the erasure confirmation. Select **I understand, erase and write** only if the target is correct.
3. If the host requests administrative access for Imager to write to the card, approve it only for the expected application and operation.
4. Keep the card connected while writing and verification complete. Do not select **Skip verification**.
5. When Imager displays **Done**, select **Finish**.
6. Safely eject the card if Imager has not already done so, then remove it from the reader.

Do not disconnect the card while the host is writing to it. A completed write without successful verification is not the completion criterion for this procedure.

<!-- pagebreak -->

## Confirm the result

A prepared card meets all of these conditions:

- The image was selected for the intended Raspberry Pi model.
- Imager completed both writing and verification without an error.
- The card was safely ejected.
- The handoff identifies the image and any remaining setup work.

This confirms image preparation, not device readiness. A first-boot failure still requires investigation of the card, image, power supply, display connection, and device setup.

## Troubleshoot media preparation

| Symptom | Action |
| --- | --- |
| The card is not listed | Reseat the reader and check whether the host detects the card. Keep system-drive protection enabled. |
| Several devices look similar | Stop. Safely disconnect unrelated removable devices and identify the target before continuing. |
| The image download fails | Check the network connection and available host storage, then retry through Imager. |
| Writing fails | Record the error. Check the reader, card, and any adapter write-protection switch before retrying. |
| Verification fails | Do not hand off the card as ready. Retry with a known-good reader or card and repeat the full write and verification. |
| The host asks to format a partition after imaging | Cancel the format operation. The host might not recognize a Linux partition, and formatting it can damage the prepared image. |

Do not repeatedly overwrite the same card without recording the failure and changing a relevant variable. Separating a card problem from a reader problem makes the next investigation more useful.

## Hand off the card

Record the Raspberry Pi model, image name and release, Imager version, date, card identifier, verification result, and configuration status. Do not record passwords or wireless credentials in the handoff.

**Illustrative handoff:** Boot media prepared for the Raspberry Pi 4 lab unit. Imager completed image verification. Customization was skipped for local desktop setup. Account creation, network configuration, and first-boot checks remain with the receiving technician.

A real handoff also carries the image and card identifiers from the completed operation.

## Continue with desktop setup

Keep the Raspberry Pi powered off while inserting the card and connecting the required peripherals. Follow the model-specific manufacturer instructions for the display, keyboard, mouse, and power supply. Do not infer connector compatibility or power requirements from another model.

During first boot, complete the operating system's setup and verify that the desktop is usable. If a device does not start, preserve the media-preparation record so the next technician can distinguish a verified image write from an untested boot.

## References

- [Download Raspberry Pi Imager](https://www.raspberrypi.com/software/)
- [Raspberry Pi setup and image-writing instructions](https://www.raspberrypi.com/documentation/computers/getting-started.html)
