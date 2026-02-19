# Phone Parser for Directus

A Directus Flow operation that parses and validates international phone numbers. Uses [libphonenumber-js](https://www.npmjs.com/package/libphonenumber-js) to extract structured data from any phone number.

![Extension demo GIF](https://raw.githubusercontent.com/IgorGRibeiro/directus-extension-phone-parser/master/images/extension_demo.gif)

## Features

- Parses international phone numbers in E.164 format (e.g. `+5531988884444`)
- Accepts flexible input formats — with or without `+`, with spaces, dashes, and parentheses
- Supports a **Default Country** option for parsing national numbers without a `+` prefix
- Returns phone type (`MOBILE`, `FIXED_LINE`, `FIXED_LINE_OR_MOBILE`, etc.)
- Returns both raw and formatted national number
- Validates phone number correctness via libphonenumber-js
- Returns structured error output for invalid or missing input
- Works in any Directus Flow as a custom operation

## Installation

### Via Directus Marketplace (Recommended)

1. Navigate to your Directus project
2. Go to **Settings** → **Extensions**
3. Search for "**Phone Parser**"
4. Click **Install**

### Via npm

```bash
npm install @ribertec/directus-extension-phone-parser
```

Then restart your Directus instance.

## Usage

Add the **Phone Parser** operation to any Directus Flow.

### Input

| Field            | Required | Description                                                                                                                                    |
| ---------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `phone`          | Yes      | Phone number to parse. Include `+` and country code (e.g. `+5531988884444`), or omit `+` if **Default Country** is set.                        |
| `defaultCountry` | No       | ISO 3166-1 alpha-2 country code (e.g. `BR`, `US`, `GB`). Used to interpret national numbers without a `+` prefix. Ignored when `+` is present. |

**Example inputs:**

```
+5531988884444         → E.164 format (recommended)
+55 (31) 98888-4444    → with spaces and punctuation
31988884444            → national format, requires defaultCountry: "BR"
```

### Output

On success:

```json
{
  "success": true,
  "fullNumber": "+5531988884444",
  "type": "MOBILE",
  "country": "BR",
  "countryCode": "55",
  "rawNumber": "31988884444",
  "formattedNumber": "(31) 98888-4444",
  "internationalNumber": "+55 31 98888-4444",
  "valid": true
}
```

| Field                 | Description                                                                                                                                                                 |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `success`             | `true` when the number was parsed successfully                                                                                                                              |
| `fullNumber`          | Normalized E.164 number (e.g. `+5531988884444`)                                                                                                                             |
| `type`                | Phone type: `MOBILE`, `FIXED_LINE`, `FIXED_LINE_OR_MOBILE`, `TOLL_FREE`, `PREMIUM_RATE`, `TOLL_FREE`, `SHARED_COST`, `VOIP`, `PERSONAL_NUMBER`, `PAGER`, `UAN`, `VOICEMAIL` |
| `country`             | [ISO 3166-1 alpha-2](<(https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)>) country code (e.g. `BR`)                                                                         |
| `countryCode`         | [International dialing country code](https://en.wikipedia.org/wiki/List_of_telephone_country_codes) (e.g. `55`)                                                             |
| `rawNumber`           | National number digits only, without country code (e.g. `31988884444`)                                                                                                      |
| `formattedNumber`     | Nationally formatted number (e.g. `(31) 98888-4444`)                                                                                                                        |
| `internationalNumber` | Internationally formatted number (e.g. `+55 31 98888-4444`)                                                                                                                 |
| `valid`               | `true` if the number is valid according to libphonenumber-js                                                                                                                |

On failure:

```json
{
  "success": false,
  "error": "No phone number provided"
}
```

## Requirements

- Directus 10.10.0+ or 11.0.0+

## License

MIT License — see [LICENSE](LICENSE) file for details
