// One-off: remove the sample bank details pre-filled in the admin composer and refuse to send obvious placeholder details.
import fs from 'node:fs';

const edit = (file, pairs) => {
  let t = fs.readFileSync(file, 'utf8');
  const crlf = t.includes('\r\n');
  t = t.replace(/\r\n/g, '\n');
  for (const [a, b] of pairs) {
    if (!t.includes(a)) throw new Error(file + ': missing ' + a.slice(0, 60));
    t = t.replace(a, b);
  }
  fs.writeFileSync(file, crlf ? t.replace(/\n/g, '\r\n') : t);
};

edit('app/admin/send-payment-email/page.tsx', [
  ["  const [pastedDetails, setPastedDetails] = useState(\n    `BSB: 063-000\\nAccount Number: 12345678\\nAccount Name: VYRON Industries Pty Ltd\\nBank: Commonwealth Bank Australia`\n  );", "  // Deliberately empty: payment details are always pasted by hand from the real account, never pre-filled.\n  const [pastedDetails, setPastedDetails] = useState('');"],
  ['placeholder="Paste account details here (e.g. BSB: 063-000, Account: 12345678...)"', 'placeholder="Paste your real bank, PayID or wallet details here, one per line (Label: value)"'],
]);

edit('app/api/admin/send-payment-email/route.ts', [
  [
    '    const order = await getOrder(orderId);',
    "    // Safety net: never email obvious sample or placeholder details to a customer.\n    if (/\\b12345678\\b|\\b0{6,}\\b|not real|test account|placeholder|lorem ipsum|xxxx/i.test(String(pastedDetails))) {\n      return NextResponse.json({ success: false, message: 'These payment details look like sample or placeholder text. Paste the real account details and try again.' }, { status: 400 });\n    }\n\n    const order = await getOrder(orderId);",
  ],
]);
console.log('ok');
