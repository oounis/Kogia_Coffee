# Expense Categories

These are the **official categories** used everywhere — the owner dashboard, budgets, and bookkeeping all roll up to these. Keep them stable.

| Code | Category | Examples |
|------|----------|----------|
| `RENT` | Rent | Shop monthly rent, deposit |
| `UTIL` | Utilities | Electricity, water, internet, gas (roasting) |
| `RAW` | Raw Materials | Coffee beans, barley, chickpea, spices (cardamom, saffron, ginger…) |
| `PACK` | Packaging | Bags, labels, gift boxes, stickers |
| `EQUIP` | Equipment | Roaster, grinder, **coin machine**, scales, shelving |
| `MAINT` | Maintenance | Machine servicing, repairs, cleaning supplies |
| `STAFF` | Staff | Salaries, uniforms, training |
| `MKT` | Marketing | Social ads, photography, signage, samples |
| `LEGAL` | Legal & Licenses | Business license, food-safety permit, registration |
| `MISC` | Miscellaneous | Anything uncategorized (review monthly) |

## Rules
- Every expense gets **exactly one** category code.
- The coin machine purchase = `EQUIP`; its servicing = `MAINT`; the coffee it dispenses = `RAW`.
- Review `MISC` at month-end and re-file into a real category.
- These codes are mirrored in the dashboard data: `09_Technology_Website/website/data.js`.
