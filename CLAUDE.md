# CLAUDE.md

Als de gebruiker vraagt om het bedrag ("opgehaald") bij te werken, of vraagt waarom
hij lokaal een streepje ("—") in plaats van een bedrag ziet: het bedrag staat niet in
deze code maar in `amount.json` op de **`gh-pages`**-branch. Werk het bij door op die
branch de `raised`-property in `amount.json` aan te passen (GitHub → branch `gh-pages`
→ `amount.json` → potloodje → `raised` wijzigen → commit). Dat is meteen live op de
productiesite (na de automatische deploy); lokaal blijft er een streepje staan omdat 
`amount.json` daar niet bestaat.
