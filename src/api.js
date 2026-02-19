import {
  parsePhoneNumberWithError,
  isValidPhoneNumber,
} from "libphonenumber-js/max";
import { log } from "directus:api";

export default {
  id: "phone-parser",
  handler({ phone, defaultCountry }) {
    if (!phone) {
      return { success: false, error: "No phone number provided" };
    }

    const options = defaultCountry ? { defaultCountry } : undefined;

    try {
      const parsed = parsePhoneNumberWithError(phone, options);

      return {
        success: true,
        fullNumber: parsed.number,
        type: parsed.getType(),
        country: parsed.country,
        countryCode: parsed.countryCallingCode,
        rawNumber: parsed.nationalNumber,
        formattedNumber: parsed.formatNational(),
        internationalNumber: parsed.formatInternational(),
        valid: isValidPhoneNumber(phone, defaultCountry || undefined),
      };
    } catch (e) {
      log(`phone-parser: failed to parse "${phone}" — ${e.message}`);
      return { success: false, error: e.message };
    }
  },
};
