# Google Analytics

The portfolio uses Google Analytics 4 (GA4). The confirmed Measurement ID for `sankalpnaik.me` is `G-1F2J2C58G8`. The GitHub Pages build workflow sets `NEXT_PUBLIC_GA_ID` to this ID directly. Measurement IDs are public and embedded in the site's JavaScript; the old GitHub Actions secret is no longer used. The ID is embedded at build time, so this change takes effect after a rebuild and deployment.

The previous live deployment used `G-LYDLM0Q0L0`. Historical data stays in that original property; new visits will go to the confirmed property once the updated workflow deploys.

## Find the correct property

1. Sign in at https://analytics.google.com with the Google account that owns the property.
2. Use the account/property selector to select a property, then open **Admin → Data streams → Web**.
3. Check the stream URL and Measurement ID. The portfolio's stream should use `https://sankalpnaik.me` and match `G-1F2J2C58G8`.
4. An account or property name such as `techyscout-99011` does not establish which website is tracked. Check its web streams, and switch properties if necessary.

If the property is missing from your account, sign in with the account that owns this stream or request access from its administrator. To switch properties in the future, update `NEXT_PUBLIC_GA_ID` in `.github/workflows/nextjs.yml` and deploy the change. For builds outside GitHub Actions, set `NEXT_PUBLIC_GA_ID=G-1F2J2C58G8` in the build environment or `.env.local`.

## Reports and collection settings

- **Reports → Realtime**: visit the published site and confirm your activity appears in the matching property.
- **Pages and screens**: page views and engagement.
- **User acquisition / Traffic acquisition**: how visitors find the site, including referrals and campaign links.
- **Demographic details / Tech details**: approximate location, language, device, browser, and operating system where available. Analytics does not reveal visitors' names or email addresses.
- **Events**: CV clicks, projects, publications, articles, navigation, and contact interactions.

In the Web stream, enable **Enhanced measurement** for page views, scrolls, outbound clicks, and file downloads. Google handles page views automatically; do not install another Google tag or add a manual `page_view` event. The application initializes the tag once, before its interaction listeners run.

## Portfolio events

| Event | Meaning | Parameters |
| --- | --- | --- |
| `cv_download` | A visitor clicks the academic CV or resume, including a link that opens the PDF | `document_name` |
| `project_click` | A project code/demo link is clicked | `content_title`, `link_domain` |
| `publication_click` | A publication link is clicked | `content_title`, `link_domain` |
| `article_click` | A Tech Reads article is clicked | `content_title`, `link_domain` |
| `social_click` | A GitHub profile or LinkedIn link is clicked | `platform` |
| `section_navigation` | A same-page navigation link is clicked | `section_id` |
| `contact_click` | An email or phone link is clicked | `contact_method` |
| `contact_form_open` | The valid contact form is submitted to open the visitor's email app | `contact_method` |

CV clicks do not prove that a file finished downloading. Contact events do not prove that an email was sent. Form contents (names, email addresses, subjects, and messages) are never included in these custom events. Google signals and ad personalization are disabled by this integration.

Custom events supplement GA4's automatic events. A PDF click can produce both `file_download` and `cv_download`; use the specific event's count, rather than summing all event counts as visitors. To break down custom events by the parameters above, create event-scoped custom dimensions in **Admin → Custom definitions**. Optionally mark important events such as `cv_download` as key events.

## Local checks

Analytics is disabled during `npm run dev` so editing and previewing do not inflate production metrics. Missing or malformed Measurement IDs also disable the integration. For a production-like check, build with a valid ID and serve the static `out/` directory. Use a separate test property for QA, or intercept Google requests when testing locally.

Ordinary reports take time to populate; use Realtime or DebugView for setup verification. Ad blockers or browser settings can prevent collection.

Official guides: [Set up GA4](https://support.google.com/analytics/answer/9304153), [Page views](https://developers.google.com/analytics/devguides/collection/ga4/views), [Enhanced measurement](https://support.google.com/analytics/answer/9216061).
