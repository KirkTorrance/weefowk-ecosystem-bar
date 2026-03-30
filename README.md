# Wee Fowk Network – Ecosystem Bar

"Wee Fowk, we the people of Scotland"
Maintained by Industrial Strategic Ltd.
For the Scottish Independence Movement.
One file. Every network site. One script tag.

## Include on any network site

Add this as the last line before `</body>`:

```html
<script src="YOUR_CDN_URL"></script>
```

## To add a new site

1. Add entry to NETWORK_SITES array in src/ecosystem-bar.js
2. Minify: https://toptal.com/developers/javascript-minifier
3. Save as ecosystem-bar.min.js
4. Upload to website
5. All sites update automatically

## Current network

- WeeFowk.org – Brand hub and entry point
- OrganisingForScotland.com – Organising engine (Coming soon)
- VoteWiser.scot – Electoral education

## Architecture

Ecosystem bar reads Supabase auth from localStorage for SSO.
