import {
  parsePhoneNumberWithError,
  isValidPhoneNumber,
} from "libphonenumber-js";
import { log } from "directus:api";

export default {
  id: "phone-parser",
  handler({ phone }) {
    if (!phone) {
      return { success: false, error: "No phone number provided" };
    }

    if (!phone.startsWith("+")) {
      return { success: false, error: "Phone number must start with +" };
    }

    try {
      const parsed = parsePhoneNumberWithError(phone);

      return {
        input: phone,
        country: parsed.country,
        countryCode: `+${parsed.countryCallingCode}`,
        nationalNumber: parsed.nationalNumber,
        valid: isValidPhoneNumber(phone),
      };
    } catch (e) {
      log(`phone-parser: failed to parse "${phone}" — ${e.message}`);
      return { success: false, error: e.message };
    }
  },
};
