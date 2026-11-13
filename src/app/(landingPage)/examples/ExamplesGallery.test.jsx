import { EXAMPLES_DATA } from "./ExamplesGallery";

describe("ExamplesGallery data coverage", () => {
  it("includes the requested non-IT resume examples", () => {
    const roles = EXAMPLES_DATA.map(item => item.role);

    expect(roles).toEqual(
      expect.arrayContaining([
        "BCom Accounts Fresher",
        "Accountant",
        "Business Operations",
        "Finance Fresher",
        "Marketing Fresher",
        "HR Fresher",
      ])
    );
  });

  it("keeps common non-IT roles searchable without requiring a tech keyword", () => {
    const searchable = EXAMPLES_DATA.map(item => item.role.toLowerCase());

    expect(searchable).toEqual(
      expect.arrayContaining([
        "bcom accounts fresher",
        "accountant",
        "business operations",
        "finance fresher",
        "marketing fresher",
        "hr fresher",
      ])
    );
  });
});
