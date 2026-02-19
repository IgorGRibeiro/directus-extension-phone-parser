export default {
  id: "phone-parser",
  name: "Phone Parser",
  icon: "phone",
  description:
    "Parses a phone number and returns country code, country and national number",

  overview: ({ phone, defaultCountry }) => [
    { label: "Phone number", value: phone ?? "not set" },
    { label: "Default country", value: defaultCountry ?? "none" },
  ],

  options: [
    {
      field: "phone",
      name: "Phone Number",
      type: "string",
      meta: {
        interface: "input",
        width: "half",
        notes:
          "Phone number to parse. Include + and country code (e.g. +5531988884444), or omit + if a default country is set.",
      },
    },
    {
      field: "defaultCountry",
      name: "Default Country",
      type: "string",
      meta: {
        interface: "input",
        width: "half",
        options: { placeholder: "e.g. BR, US, GB" },
        notes:
          "ISO 3166-1 alpha-2 country code (2 letters). Used when the phone number has no + prefix. Ignored when + is present.",
      },
    },
  ],
};
