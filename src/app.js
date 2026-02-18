export default {
  id: "phone-parser",
  name: "Phone Parser",
  icon: "phone",
  description:
    "Parses a phone number and returns country code, country and national number",

  overview: ({ phone }) => [
    { label: "Phone number", value: phone ?? "not set" },
  ],

  options: [
    {
      field: "phone",
      name: "Phone Number",
      type: "string",
      meta: {
        interface: "input",
        notes: "Must include + and country code. E.g: +5531988884444",
      },
    },
  ],
};
