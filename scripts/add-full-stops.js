const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../lib/data/treatments.json');
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

function addFullStop(str) {
  if (!str || typeof str !== 'string') return str;
  const trimmed = str.trimEnd();
  if (/[.!?]$/.test(trimmed)) return str;
  return trimmed + '.';
}

const fixed = data.map(function(treatment) {
  const t = Object.assign({}, treatment);
  if (Array.isArray(t.suitableFor)) t.suitableFor = t.suitableFor.map(addFullStop);
  if (Array.isArray(t.howWorks))    t.howWorks    = t.howWorks.map(addFullStop);
  if (Array.isArray(t.faqs)) {
    t.faqs = t.faqs.map(function(faq) {
      return Object.assign({}, faq, { answer: addFullStop(faq.answer) });
    });
  }
  return t;
});

fs.writeFileSync(filePath, JSON.stringify(fixed, null, 2));
console.log('Done — full stops added to all suitableFor, howWorks, and FAQ answers across all treatments.');
