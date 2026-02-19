import { describe, expect, test } from "vitest";
import operation from "./api.js";

const { handler } = operation;

describe("phone-parser", () => {
  describe("input validation", () => {
    test("returns error when phone is null", () => {
      expect(handler({ phone: null })).toEqual({
        success: false,
        error: "No phone number provided",
      });
    });

    test("returns error when phone is undefined", () => {
      expect(handler({ phone: undefined })).toEqual({
        success: false,
        error: "No phone number provided",
      });
    });

    test("returns error when phone is empty string", () => {
      expect(handler({ phone: "" })).toEqual({
        success: false,
        error: "No phone number provided",
      });
    });
  });

  describe("valid phone numbers", () => {
    test("parses a valid Brazilian mobile number", () => {
      const result = handler({ phone: "+5511999990000" });

      expect(result.success).toBe(true);
      expect(result.fullNumber).toBe("+5511999990000");
      expect(result.type).toBe("MOBILE");
      expect(result.country).toBe("BR");
      expect(result.countryCode).toBe("55");
      expect(result.rawNumber).toBe("11999990000");
      expect(result.formattedNumber).toBe("(11) 99999-0000");
      expect(result.internationalNumber).toContain("+55");
      expect(result.valid).toBe(true);
    });

    test("parses a valid US number", () => {
      const result = handler({ phone: "+12025550123" });

      expect(result.success).toBe(true);
      expect(result.fullNumber).toBe("+12025550123");
      expect(result.type).toBe("FIXED_LINE_OR_MOBILE");
      expect(result.country).toBe("US");
      expect(result.countryCode).toBe("1");
      expect(result.rawNumber).toBe("2025550123");
      expect(result.formattedNumber).toBe("(202) 555-0123");
      expect(result.internationalNumber).toBe("+1 202 555 0123");
      expect(result.valid).toBe(true);
    });

    test("identifies US landline number type", () => {
      const result = handler({ phone: "+1 202-456-1111" });

      expect(result.type).toBe("FIXED_LINE_OR_MOBILE");
    });

    test("identifies BR fixed line number type", () => {
      const result = handler({ phone: "+551133009966" });

      expect(result.type).toBe("FIXED_LINE");
    });

    test("returns success:true for valid numbers", () => {
      const result = handler({ phone: "+5511999990000" });

      expect(result.success).toBe(true);
    });

    test("returns all expected fields for a valid number", () => {
      const result = handler({ phone: "+12025550123" });

      expect(result).toHaveProperty("success");
      expect(result).toHaveProperty("fullNumber");
      expect(result).toHaveProperty("type");
      expect(result).toHaveProperty("country");
      expect(result).toHaveProperty("countryCode");
      expect(result).toHaveProperty("rawNumber");
      expect(result).toHaveProperty("formattedNumber");
      expect(result).toHaveProperty("internationalNumber");
      expect(result).toHaveProperty("valid");
    });
  });

  describe("accepts various input formats", () => {
    test.each([
      // Brazilian mobile — different spacing and punctuation styles
      "+55 31 98822-0000",
      "+55 (31) 98822-0000",
      "+55 (31) 988220000",
      "+5531988220000",
      // Brazilian landline
      "+55 11 3300-9966",
      "+55 (11) 3300-9966",
      // US — with dashes, dots, spaces
      "+1 202-555-0123",
      "+1 (202) 555-0123",
      "+1.202.555.0123",
    ])('parses "%s" successfully', (phone) => {
      const result = handler({ phone });
      expect(result.success).toBe(true);
      expect(result.valid).toBe(true);
    });
  });

  describe("defaultCountry", () => {
    test("parses national BR number when defaultCountry is BR", () => {
      const result = handler({ phone: "11999990000", defaultCountry: "BR" });

      expect(result.success).toBe(true);
      expect(result.country).toBe("BR");
      expect(result.valid).toBe(true);
    });

    test("ignores defaultCountry when + is present", () => {
      const result = handler({ phone: "+12025550123", defaultCountry: "BR" });

      expect(result.success).toBe(true);
      expect(result.country).toBe("US");
    });

    test("returns error for national number without defaultCountry", () => {
      const result = handler({ phone: "11999990000" });

      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
    });
  });

  describe("invalid phone numbers", () => {
    test("returns error for unparseable input", () => {
      const result = handler({ phone: "+abc" });

      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
    });

    test("returns error for a number with only country code", () => {
      const result = handler({ phone: "+55" });

      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
    });
  });
});
