<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Render the Moment Maker module as one responsive portrait composition at all widths; a single layout prevents desktop/mobile drift.
- Keep playback in FlickSlot and scheduling in a shared hook; use native media completion when available with a resettable timer fallback for cross-origin embeds, clearing scheduled work on selection changes and unmount.
