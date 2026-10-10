// One-off: only slide 1 loads with the page; later slides are added to the DOM as they are reached (or shortly before),
// so the mobile LCP image no longer competes with four other hero photos.
import fs from 'node:fs';

const edit = (file, pairs) => {
  let t = fs.readFileSync(file, 'utf8');
  const crlf = t.includes('\r\n');
  t = t.replace(/\r\n/g, '\n');
  for (const [a, b, all] of pairs) {
    if (!t.includes(a)) throw new Error(file + ': missing ' + a.slice(0, 60));
    t = all ? t.split(a).join(b) : t.replace(a, b);
  }
  fs.writeFileSync(file, crlf ? t.replace(/\n/g, '\r\n') : t);
};

edit('components/HomeHero.tsx', [
  ['  const [index, setIndex] = useState(0);\n', '  const [index, setIndex] = useState(0);\n  // Slides already shown or about to be: later slides are not requested until needed.\n  const [reached, setReached] = useState<number[]>([0]);\n'],
  [
    '    const t = setInterval(() => setIndex((i) => (i + 1) % SLIDES.length), INTERVAL_MS);\n    return () => clearInterval(t);\n  }, [paused, reduceMotion]);',
    '    const t = setInterval(() => setIndex((i) => (i + 1) % SLIDES.length), INTERVAL_MS);\n    return () => clearInterval(t);\n  }, [paused, reduceMotion]);\n\n  // Warm the next slide a few seconds before it is shown.\n  useEffect(() => {\n    const next = (index + 1) % SLIDES.length;\n    const t = setTimeout(() => setReached((r) => (r.includes(next) ? r : [...r, next])), 3000);\n    return () => clearTimeout(t);\n  }, [index]);',
  ],
  ['  const go = (n: number) => setIndex((n + SLIDES.length) % SLIDES.length);', '  const show = (n: number) => {\n    const k = (n + SLIDES.length) % SLIDES.length;\n    setReached((r) => (r.includes(k) ? r : [...r, k]));\n    setIndex(k);\n  };\n  const go = show;'],
  ['onClick={() => setIndex(i)}', 'onClick={() => show(i)}'],
  ['      {SLIDES.map((s, i) => (\n        <picture key={s.n} aria-hidden={i !== index}>', '      {SLIDES.map((s, i) => (i === index || reached.includes(i) ? (\n        <picture key={s.n}>'],
  ['            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 motion-reduce:transition-none ${i === index ? \'opacity-100\' : \'opacity-0\'}`}\n          />\n        </picture>\n      ))}', '            aria-hidden={i !== index}\n            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 motion-reduce:transition-none ${i === index ? \'opacity-100\' : \'opacity-0\'}`}\n          />\n        </picture>\n      ) : null))}'],
]);

edit('app/page.tsx', [['                  loading="lazy"\n                  decoding="async"\n', '                  loading="lazy"\n                  fetchPriority="low"\n                  decoding="async"\n']]);
edit('components/TrustpilotReviews.tsx', [
  ['<h4 className="text-sm font-extrabold text-white group-hover:text-[#00b67a]', '<h3 className="text-sm font-extrabold text-white group-hover:text-[#00b67a]'],
]);
console.log('ok');
