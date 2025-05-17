import { describe, expect } from "bun:test";
import { alchemy } from "../../src/alchemy.js";
import { destroy } from "../../src/destroy.js";
import { SentryApi } from "../../src/sentry/api.js";
import { ClientKey } from "../../src/sentry/client-key.js";
import { Project } from "../../src/sentry/project.js";
import { Team } from "../../src/sentry/team.js";
import { BRANCH_PREFIX } from "../util.js";
// must import this or else alchemy.test won't exist
import "../../src/test/bun.js";

const api = new SentryApi();

const test = alchemy.test(import.meta);

describe("ClientKey Resource", () => {
  // Use BRANCH_PREFIX for deterministic, non-colliding resource names
  const testId = `${BRANCH_PREFIX}-test-key`;
  const projectId = `${BRANCH_PREFIX}-test-project`;
  const teamId = `${BRANCH_PREFIX}-test-team`;
  const organization = process.env.SENTRY_ORG;
  if (!organization) {
    throw new Error("SENTRY_ORG environment variable is required");
  }

  test("create, update, and delete client key", async (scope) => {
    let key: ClientKey | undefined;
    let project: Project | undefined;
    let team: Team | undefined;
    try {
      // Create a test team first
      team = await Team(teamId, {
        name: `Test Team ${teamId}`,
        slug: teamId,
        organization,
      });

      // Create a test project
      project = await Project(projectId, {
        name: `Test Project ${projectId}`,
        slug: projectId,
        platform: "node-express",
        team: team.slug,
        organization,
      });

      // Create a test client key
      key = await ClientKey(testId, {
        name: `Test Key ${testId}`,
        project: project.slug,
        organization,
      });

      expect(key.id).toBeTruthy();
      expect(key.name).toEqual(`Test Key ${testId}`);

      // Verify key was created by querying the API directly
      const getResponse = await api.get(
        `/projects/${key.organization}/${key.project}/keys/${key.id}/`,
      );
      expect(getResponse.status).toEqual(200);

      const responseData = await getResponse.json();
      expect(responseData.name).toEqual(`Test Key ${testId}`);

      // Update the key
      key = await ClientKey(testId, {
        name: `Updated Key ${testId}`,
        project: project.slug,
        organization,
      });

      expect(key.id).toEqual(key.id);
      expect(key.name).toEqual(`Updated Key ${testId}`);

      // Verify key was updated
      const getUpdatedResponse = await api.get(
        `/projects/${key.organization}/${key.project}/keys/${key.id}/`,
      );
      const updatedData = await getUpdatedResponse.json();
      expect(updatedData.name).toEqual(`Updated Key ${testId}`);
    } catch (err) {
      // log the error or else it's silently swallowed by destroy errors
      console.log(err);
      throw err;
    } finally {
      // Always clean up, even if test assertions fail
      await destroy(scope);

      // Verify key was deleted
      if (key) {
        const getDeletedResponse = await api.get(
          `/projects/${key.organization}/${key.project}/keys/${key.id}/`,
        );
        expect(getDeletedResponse.status).not.toEqual(200);
      }
    }
  });

  test("adopt existing client key", async (scope) => {
    let key: ClientKey | undefined;
    let project: Project | undefined;
    let team: Team | undefined;
    try {
      // Create a test team first
      team = await Team(teamId, {
        name: `Test Team ${teamId}`,
        slug: teamId,
        organization,
      });

      // Create a test project
      project = await Project(projectId, {
        name: `Test Project ${projectId}`,
        slug: projectId,
        platform: "node-express",
        team: team.slug,
        organization,
      });

      // Create a test client key
      key = await ClientKey(testId, {
        name: `Test Key ${testId}`,
        project: project.slug,
        organization,
      });

      // Try to create the same key with adopt=true
      const adoptedKey = await ClientKey(testId, {
        name: `Test Key ${testId}`,
        project: project.slug,
        organization,
        adopt: true,
      });

      // Should have the same ID as the original key
      expect(adoptedKey.id).toEqual(key.id);
    } catch (err) {
      console.log(err);
      throw err;
    } finally {
      await destroy(scope);
    }
  });
});
