// Pings IndexNow (Bing, Yandex, Naver, Seznam and others) with every URL in the live sitemap, or with the URLs passed as arguments.
// The key file lives at public/<KEY>.txt and must be reachable at https://<domain>/<KEY>.txt.
// Run after a deploy that adds or changes pages: npm run indexnow   (or: node scripts/indexnow.mjs https://independentelectricbikes.com.au/shop/)
const HOST = 'independentelectricbikes.com.au';
const KEY = 'ieb2026indexnowkey998877';

let urls = process.argv.slice(2);
if (!urls.length) {
  const xml = await (await fetch(`https://${HOST}/sitemap.xml`)).text();
  urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}
const keyCheck = await (await fetch(`https://${HOST}/${KEY}.txt`)).text();
if (keyCheck.trim() !== KEY) {
  console.error('Key file is not reachable or does not match; aborting.');
  process.exit(1);
}
const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'content-type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList: urls }),
});
console.log(`Submitted ${urls.length} URLs: HTTP ${res.status} ${res.statusText}`);
process.exit(res.status === 200 || res.status === 202 ? 0 : 1);
