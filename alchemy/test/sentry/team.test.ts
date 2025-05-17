import { describe, expect } from "bun:test";
import { alchemy } from "../../src/alchemy.js";
import { destroy } from "../../src/destroy.js";
import { SentryApi } from "../../src/sentry/api.js";
import { Team } from "../../src/sentry/team.js";
import { BRANCH_PREFIX } from "../util.js";
// must import this or else alchemy.test won't exist
import "../../src/test/bun.js";

const api = new SentryApi();

const test = alchemy.test(import.meta);

describe("Team Resource", () => {
  // Use BRANCH_PREFIX for deterministic, non-colliding resource names
  const testId = `${BRANCH_PREFIX}-test-team`;
  const organization = process.env.SENTRY_ORG;
  if (!organization) {
    throw new Error("SENTRY_ORG environment variable is required");
  }

  test("create, update, and delete team", async (scope) => {
    let team: Team | undefined;
    try {
      // Create a test team
      team = await Team(testId, {
        name: `Test Team ${testId}`,
        slug: testId,
        organization,
      });

      expect(team.id).toBeTruthy();
      expect(team.name).toEqual(`Test Team ${testId}`);

      // Verify team was created by querying the API directly
      const getResponse = await api.get(
        `/teams/${team.organization}/${team.slug}/`,
      );
      expect(getResponse.status).toEqual(200);

      const responseData = await getResponse.json();
      expect(responseData.name).toEqual(`Test Team ${testId}`);

      // Update the team
      team = await Team(testId, {
        name: `Updated Team ${testId}`,
        slug: testId,
        organization,
      });

      expect(team.id).toEqual(team.id);
      expect(team.name).toEqual(`Updated Team ${testId}`);

      // Verify team was updated
      const getUpdatedResponse = await api.get(
        `/teams/${team.organization}/${team.slug}/`,
      );
      const updatedData = await getUpdatedResponse.json();
      expect(updatedData.name).toEqual(`Updated Team ${testId}`);
    } catch (err) {
      // log the error or else it's silently swallowed by destroy errors
      console.log(err);
      throw err;
    } finally {
      // Always clean up, even if test assertions fail
      await destroy(scope);

      // Verify team was deleted
      if (team) {
        const getDeletedResponse = await api.get(
          `/teams/${team.organization}/${team.slug}/`,
        );
        expect(getDeletedResponse.status).toEqual(404);
      }
    }
  });

  test("adopt existing team", async (scope) => {
    let team: Team | undefined;
    try {
      // Create a test team
      team = await Team(testId, {
        name: `Test Team ${testId}`,
        slug: testId,
        organization,
      });

      // Try to create the same team with adopt=true
      const adoptedTeam = await Team(testId, {
        name: `Test Team ${testId}`,
        slug: testId,
        organization,
        adopt: true,
      });

      // Should have the same ID as the original team
      expect(adoptedTeam.id).toEqual(team.id);
    } catch (err) {
      console.log(err);
      throw err;
    } finally {
      await destroy(scope);
    }
  });
});
