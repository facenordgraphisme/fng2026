#!/bin/bash
# Crawl local dev server, save raw HTML + extract metadata
BASE="http://localhost:3001"
OUT="facenordgraphisme.fr-audit/reaudit-local"
mkdir -p "$OUT/raw"

urls=(
"/"
"/prestations"
"/creation-site-internet-hautes-alpes"
"/boutique-e-commerce-hautes-alpes"
"/referencement-seo-hautes-alpes"
"/refonte-ai-friendly"
"/refonte-ia-friendly"
"/maintenance-site-internet-hautes-alpes"
"/referencement-ia"
"/portfolio"
"/blog"
"/a-propos"
"/contact"
"/faq"
"/mentions-legales"
"/politique-de-confidentialite"
"/villes/briancon-hautes-alpes"
"/villes/embrun-serre-poncon"
"/villes/gap-hautes-alpes"
"/portfolio/act-event-pro"
"/portfolio/gaec-des-valentins"
"/portfolio/gaudineto"
"/portfolio/reves-d-aventures"
"/portfolio/reves-daventures"
"/portfolio/verdon-ebike"
"/blog/le-guide-complet-de-la-visibilite-en-ligne-pour-les-commercants-des-hautes-alpes"
"/blog/refonte-site-internet-5-signes"
"/blog/digitaliser-reservations-tourisme-hautes-alpes"
"/blog/seo-vs-referencement-sur-l-ia-quelle-strategie-adopter-en-2026"
"/blog/4-signaux-citation-ia-artisans"
"/blog/balises-title-meta-description-pme-hautes-alpes"
"/blog/google-business-profile-artisans-hautes-alpes"
"/blog/geo-referencement-ia-artisans-pme-hautes-alpes"
"/blog/gerer-avis-google-artisans-pme-hautes-alpes"
"/blog/guide-creation-site-internet-artisan-hautes-alpes"
"/blog/prix-site-internet-artisan-pme-hautes-alpes"
"/blog/reservation-directe-eviter-commissions-booking-hautes-alpes"
"/blog/seo-local-hautes-alpes-artisans-pme"
)

echo "url,status,title,title_len,meta_desc_len,canonical,h1,robots,og_type,has_jsonld,jsonld_types" > "$OUT/inventory.csv"

for path in "${urls[@]}"; do
  url="$BASE$path"
  if [ "$path" == "/" ]; then
    fname="$OUT/raw/home.html"
  else
    fname="$OUT/raw$(echo "$path" | tr '/' '_').html"
  fi
  status=$(curl -s -o "$fname" -w "%{http_code}" "$url")
  title=$(grep -oE '<title>[^<]*</title>' "$fname" | head -1 | sed 's/<title>//;s/<\/title>//')
  title_len=$(echo -n "$title" | wc -m)
  meta_desc=$(grep -oE '<meta name="description" content="[^"]*"' "$fname" | head -1 | sed 's/<meta name="description" content="//;s/"$//')
  meta_desc_len=$(echo -n "$meta_desc" | wc -m)
  canonical=$(grep -oE '<link rel="canonical" href="[^"]*"' "$fname" | head -1 | sed 's/<link rel="canonical" href="//;s/"$//')
  h1=$(grep -oE '<h1[^>]*>[^<]*' "$fname" | head -1 | sed -E 's/<h1[^>]*>//')
  robots=$(grep -oE '<meta name="robots" content="[^"]*"' "$fname" | tail -1 | sed 's/<meta name="robots" content="//;s/"$//')
  og_type=$(grep -oE '<meta property="og:type" content="[^"]*"' "$fname" | head -1 | sed 's/<meta property="og:type" content="//;s/"$//')
  has_jsonld=$(grep -c 'application/ld+json' "$fname")
  jsonld_types=$(grep -oE '"@type"\s*:\s*"[^"]*"' "$fname" | sort -u | tr '\n' '|')
  echo "\"$path\",$status,\"$title\",$title_len,$meta_desc_len,\"$canonical\",\"$h1\",\"$robots\",\"$og_type\",$has_jsonld,\"$jsonld_types\"" >> "$OUT/inventory.csv"
done

echo "Done. $(wc -l < "$OUT/inventory.csv") rows"
