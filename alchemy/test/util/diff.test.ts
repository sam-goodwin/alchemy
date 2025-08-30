import { describe, expect, it } from "vitest";
import { exists } from "../../src/util/diff.ts";

describe("exists function", () => {
  // TODO: Implement wildcard paths, dropped for now
  describe.skip("wildcard paths", () => {
    it.skip("should return true for objects with properties when path is '*'", () => {
      const obj = { name: "John", age: 30 };
      expect(exists(obj, "*")).toBe(true);
    });

    it.skip("should return false for empty objects when path is '*'", () => {
      const obj = {};
      expect(exists(obj, "*")).toBe(false);
    });

    it.skip("should return true for arrays with elements when path is '*'", () => {
      const obj = ["a", "b", "c"];
      expect(exists(obj, "*")).toBe(true);
    });

    it.skip("should return false for empty arrays when path is '*'", () => {
      const obj = [];
      expect(exists(obj, "*")).toBe(false);
    });
  });

  describe("dot notation paths", () => {
    it("should return true for existing simple properties", () => {
      const obj = { name: "John", age: 30 };
      expect(exists(obj, "name", { returnValue: true })).toMatchObject({
        exists: true,
        value: obj.name,
      });
      expect(exists(obj, "age", { returnValue: true })).toMatchObject({
        exists: true,
        value: obj.age,
      });
    });

    it("should return false for non-existing simple properties", () => {
      const obj = { name: "John", age: 30 };
      expect(exists(obj, "email")).toBe(false);
      expect(exists(obj, "address")).toBe(false);
    });

    it("should return true for existing nested properties", () => {
      const obj = {
        user: {
          profile: {
            name: "John",
            details: {
              age: 30,
            },
          },
        },
      };
      expect(exists(obj, "user", { returnValue: true })).toMatchObject({
        exists: true,
        value: obj.user,
      });
      expect(exists(obj, "user.profile", { returnValue: true })).toMatchObject({
        exists: true,
        value: obj.user.profile,
      });
      expect(
        exists(obj, "user.profile.name", { returnValue: true }),
      ).toMatchObject({
        exists: true,
        value: obj.user.profile.name,
      });
      expect(
        exists(obj, "user.profile.details", { returnValue: true }),
      ).toMatchObject({
        exists: true,
        value: obj.user.profile.details,
      });
      expect(
        exists(obj, "user.profile.details.age", { returnValue: true }),
      ).toMatchObject({
        exists: true,
        value: obj.user.profile.details.age,
      });
    });

    it("should return false for non-existing nested properties", () => {
      const obj = {
        user: {
          profile: {
            name: "John",
          },
        },
      };
      expect(exists(obj, "user.email")).toBe(false);
      expect(exists(obj, "user.profile.name")).toBe(true);
      expect(exists(obj, "user.profile.age")).toBe(false);
      expect(exists(obj, "user.settings.theme")).toBe(false);
      expect(exists(obj, "nonexistent.path")).toBe(false);
    });

    it("should handle properties with falsy values", () => {
      const obj = {
        zero: 0,
        empty: "",
        nullValue: null,
        undefinedValue: undefined,
        falseValue: false,
      };
      expect(exists(obj, "zero")).toBe(true);
      expect(exists(obj, "empty")).toBe(true);
      expect(exists(obj, "nullValue")).toBe(true);
      expect(exists(obj, "undefinedValue")).toBe(true);
      expect(exists(obj, "falseValue")).toBe(true);
    });

    it("should handle numeric indices with dot notation", () => {
      const obj = {
        items: ["a", "b", "c"],
      };
      expect(exists(obj, "items.0")).toBe(true);
      expect(exists(obj, "items.1")).toBe(true);
      expect(exists(obj, "items.2")).toBe(true);
      expect(exists(obj, "items.3")).toBe(false);
    });
  });

  describe("bracket notation paths", () => {
    it("should handle bracket notation with double quotes", () => {
      const obj = { "user-name": "John", "user-age": 30 };
      expect(exists(obj, '["user-name"]')).toBe(true);
      expect(exists(obj, '["user-age"]')).toBe(true);
      expect(exists(obj, '["user-email"]')).toBe(false);
    });

    it("should handle bracket notation with single quotes", () => {
      const obj = { "user-name": "John", "user-age": 30 };
      expect(exists(obj, "['user-name']")).toBe(true);
      expect(exists(obj, "['user-age']")).toBe(true);
      expect(exists(obj, "['user-email']")).toBe(false);
    });

    it("should handle bracket with number index", () => {
      const obj = { users: [1, 2, 3, 4] };
      expect(exists(obj, "users[0]")).toBe(true);
      expect(exists(obj, "users[01]")).toBe(true);
      expect(exists(obj, "users[002]")).toBe(true);
      expect(exists(obj, "users[3]")).toBe(true);
      expect(exists(obj, "users[4]")).toBe(false);
      expect(exists(obj, "users[04]")).toBe(false);
    });

    it("should handle mixed dot and bracket notation", () => {
      const obj = {
        user: {
          "profile-data": {
            name: "John",
            "contact-info": {
              email: "john@example.com",
            },
          },
        },
      };
      // Mixed notation doesn't work as expected - the regex parsing has limitations
      expect(exists(obj, 'user["profile-data"]')).toBe(true);
      expect(exists(obj, 'user["profile-data"].name')).toBe(true);
      expect(exists(obj, 'user["profile-data"]["contact-info"]')).toBe(true);
      expect(exists(obj, 'user["profile-data"]["contact-info"].email')).toBe(
        true,
      );
      expect(exists(obj, 'user["profile-data"].nonexistent')).toBe(false);
    });

    it("should handle numeric indices in bracket notation", () => {
      const obj = {
        items: ["a", "b", "c"],
        matrix: [
          ["x", "y"],
          ["z", "w"],
        ],
      };

      expect(exists(obj, "items[0]")).toBe(true);
      expect(exists(obj, "items[1]")).toBe(true);
      expect(exists(obj, "items[2]")).toBe(true);
      expect(exists(obj, "items[3]")).toBe(false);
      expect(exists(obj, "matrix[0][0]")).toBe(true);
      expect(exists(obj, "matrix[0][1]")).toBe(true);
      expect(exists(obj, "matrix[1][0]")).toBe(true);
      expect(exists(obj, "matrix[1][1]")).toBe(true);
      expect(exists(obj, "matrix[2][0]")).toBe(false);
    });

    it("should throw on incomplete or invalid bracket notation", () => {
      expect(() => exists({ a: { b: { c: 1 } } }, "a[")).toThrow();
      expect(() => exists({ a: { b: { c: 1 } } }, "a[b")).toThrow();
      expect(() => exists({ a: { b: { c: 1 } } }, "a['b")).toThrow();
      expect(() => exists({ a: { b: { c: 1 } } }, "a['b'")).toThrow();
      expect(() => exists({ a: { b: { c: 1 } } }, "a['b']")).not.toThrow();
      expect(
        exists({ a: { b: { c: 1 } } }, "a['b']", { returnValue: true }),
      ).toMatchObject({
        exists: true,
        value: { c: 1 },
      });
    });
  });

  describe("arrays and array-like objects", () => {
    it("should handle array indices", () => {
      const obj = ["a", "b", "c"];
      expect(exists(obj, "0")).toBe(true);
      expect(exists(obj, "1")).toBe(true);
      expect(exists(obj, "2")).toBe(true);
      expect(exists(obj, "3")).toBe(false);
      expect(exists(obj, "length")).toBe(true);
    });

    it("should handle nested arrays", () => {
      const obj = {
        users: [
          { name: "John", age: 30 },
          { name: "Jane", age: 25 },
        ],
      };
      expect(exists(obj, "users")).toBe(true);
      expect(exists(obj, "users.0")).toBe(true);
      expect(exists(obj, "users.0.name")).toBe(true);
      expect(exists(obj, "users.0.age")).toBe(true);
      expect(exists(obj, "users.1")).toBe(true);
      expect(exists(obj, "users.1.name")).toBe(true);
      expect(exists(obj, "users.2")).toBe(false);
      expect(exists(obj, "users.0.email")).toBe(false);
    });
  });

  describe("edge cases", () => {
    it("should handle null and undefined objects", () => {
      expect(exists(null, "any")).toBe(false);
      expect(exists(undefined, "any")).toBe(false);
    });

    it("should handle empty paths (only with bracket notation)", () => {
      const obj = {
        "": "a",
        users: {
          "": "noname",
        },
      };
      expect(() => exists(obj, "")).toThrow();
      expect(() => exists(obj, ".")).toThrow();
      expect(() => exists(obj, "users.")).toThrow();
      expect(() => exists(obj, "users['']")).not.toThrow();
      expect(exists(obj, "users['']", { returnValue: true })).toMatchObject({
        exists: true,
        value: obj.users[""],
      });
      expect(() => exists(obj, "['']")).not.toThrow();
      expect(exists(obj, "['']", { returnValue: true })).toMatchObject({
        exists: true,
        value: obj[""],
      });
    });

    it("should handle paths that lead to non-objects in the middle", () => {
      const obj = {
        user: {
          name: "John",
          age: 30,
        },
      };
      // The function stops at primitive values and doesn't check their properties
      expect(exists(obj, "user.name.length")).toBe(false); // function stops at string
      expect(exists(obj, "user.name.nonexistent")).toBe(false);
      expect(exists(obj, "user.age.toString")).toBe(false); // function stops at number
      expect(exists(obj, "user.age.nonexistent")).toBe(false);
    });

    it("should handle malformed bracket notation", () => {
      const obj = { name: "John", age: 30 };
      // The fixed parser handles these by treating incomplete brackets as the base property
      expect(() => exists(obj, "name[")).toThrow(); // Treated as just "name"
      expect(() => exists(obj, "name]")).toThrow(); // No opening bracket, treated as "name]"
      expect(() => exists(obj, "name[incomplete")).toThrow(); // Treated as just "name"
      expect(() => exists(obj, "name]malformed")).toThrow(); // No opening bracket, treated as "name]malformed"
    });

    it("should handle special characters in property names", () => {
      const obj = {
        "weird@property": "value1",
        "property with spaces": "value2",
        "property.with.dots": "value3",
        "property-with-dashes": "value4",
      };
      expect(exists(obj, '["weird@property"]')).toBe(true);
      expect(exists(obj, '["property with spaces"]')).toBe(true);
      // The fixed parser now handles dots in bracketed property names correctly
      expect(exists(obj, '["property.with.dots"]')).toBe(true);
      expect(exists(obj, '["property-with-dashes"]')).toBe(true);
      expect(() => exists(obj, "property-with-dashes")).toThrow();
    });

    it("should handle prototype chain properties", () => {
      const parent = { parentProp: "parent" };
      const child = Object.create(parent);
      child.childProp = "child";

      expect(exists(child, "childProp")).toBe(true);
      expect(exists(child, "parentProp")).toBe(true); // inherited property
      expect(exists(child, "toString")).toBe(true); // Object.prototype method
    });
  });

  describe("performance edge cases", () => {
    it("should handle very deep nesting", () => {
      let obj: any = {};
      let current = obj;
      const depth = 100;

      // Create deeply nested object
      for (let i = 0; i < depth; i++) {
        current.level = {};
        current = current.level;
      }
      current.value = "deep";

      // Test deep path
      const deepPath = Array(depth).fill("level").join(".") + ".value";
      expect(exists(obj, deepPath)).toBe(true);

      // Test non-existent deep path
      const nonExistentPath =
        Array(depth).fill("level").join(".") + ".nonexistent";
      expect(exists(obj, nonExistentPath)).toBe(false);
    });

    it("should handle large objects", () => {
      const largeObj: any = {};

      // Create object with many properties
      for (let i = 0; i < 1000; i++) {
        largeObj[`prop${i}`] = `value${i}`;
      }

      expect(exists(largeObj, "prop0")).toBe(true);
      expect(exists(largeObj, "prop500")).toBe(true);
      expect(exists(largeObj, "prop999")).toBe(true);
      expect(exists(largeObj, "prop1000")).toBe(false);
    });
  });
});
