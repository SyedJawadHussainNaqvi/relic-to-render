# DUET Old Main

Losing the primary backup for a large university portal is a stressful situation, but because duet.edu.pk was a public-facing website, the vast majority of your frontend assets, text, and design can be recovered.

If you do not have access to the old server files or database, your best strategy is to rebuild from public web archives. Here is how to execute the recovery using the tools you already plan to use (Claude Pro and Lovable):

Check Google Cache and Live Subdomains
If the main domain went offline very recently, type cache:duet.edu.pk into Google Search to recover the most recent text. Additionally, check your specific subdomains. Search engine records show that directories like ie.duet.edu.pk (Industrial Engineering) might still be actively hosted or cached. Scrape anything that is still live immediately.

Navigate the Wayback Machine
The Internet Archive's Wayback Machine is the gold standard for recovering lost website content. Go to archive.org, enter [https://duet.edu.pk](https://duet.edu.pk), and select a snapshot from a date right before the site went down or the redesign started. You will be able to browse the legacy site exactly as it looked.

Capture Baselines for Lovable
Lovable does not need the underlying code to recreate the UIâ€”it just needs the visuals. Navigate through the archived pages on the Wayback Machine and take full-page, high-resolution screenshots. Upload these directly to Lovable with the strict instruction: "Recreate this UI exactly. Do not modernize it."

Extract Code and Content for Claude Pro
You can right-click and "View Page Source" on the archived pages to get the old HTML/CSS structure. The Wayback Machine injects its own tracking JavaScript and id_ tags into the code. Copy the raw source code, paste it into your Claude Pro project, and prompt Claude: "This is archived HTML. Strip out all Wayback Machine injected scripts and extract the clean, original structure and text content."

Bulk Download Assets (Optional)
If manually copying pages is too slow, you can use an open-source tool like Wayback Machine Downloader (a Ruby application). You feed it the DUET URL, and it will automatically crawl the archive and download all available HTML, CSS, and images into a local folder on your computer.

Rebuild the Backend from Scratch
While web archives are perfect for recovering public-facing text, layouts, and images, they cannot look inside your server. Your backend database (student portals, admin passwords, custom PHP functionality) is permanently lost without a server backup. You will need to instruct Claude Pro to map out a brand new database schema to replace the old one.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://relic-to-render.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/dde0077b-2c06-4dd9-b786-94ba2fb9ca2b).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
