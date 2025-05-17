import { describe, expect } from "bun:test";
import { alchemy } from "../../src/alchemy.js";
import { destroy } from "../../src/destroy.js";
import { SentryApi } from "../../src/sentry/api.js";
import { Project } from "../../src/sentry/project.js";
import { Team } from "../../src/sentry/team.js";
import { BRANCH_PREFIX } from "../util.js";
// must import this or else alchemy.test won't exist
import "../../src/test/bun.js";

const api = new SentryApi();

const test = alchemy.test(import.meta);

describe("Project Resource", () => {
  // Use BRANCH_PREFIX for deterministic, non-colliding resource names
  const testId = `${BRANCH_PREFIX}-test-project`;
  const teamId = `${BRANCH_PREFIX}-test-team`;
  const organization = process.env.SENTRY_ORG;
  if (!organization) {
    throw new Error("SENTRY_ORG environment variable is required");
  }

  test("create, update, and delete project", async (scope) => {
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
      project = await Project(testId, {
        name: `Test Project ${testId}`,
        slug: testId,
        platform: "node-express",
        team: team.slug,
        organization,
      });

      expect(project.id).toBeTruthy();
      expect(project.name).toEqual(`Test Project ${testId}`);

      // Verify project was created by querying the API directly
      const getResponse = await api.get(
        `/projects/${project.organization}/${project.slug}/`,
      );
      expect(getResponse.status).toEqual(200);

      const responseData = await getResponse.json();
      expect(responseData.name).toEqual(`Test Project ${testId}`);

      // Update the project
      project = await Project(testId, {
        name: `Updated Project ${testId}`,
        slug: testId,
        platform: "node-express",
        team: team.slug,
        organization,
      });

      expect(project.id).toEqual(project.id);
      expect(project.name).toEqual(`Updated Project ${testId}`);

      // Verify project was updated
      const getUpdatedResponse = await api.get(
        `/projects/${project.organization}/${project.slug}/`,
      );
      const updatedData = await getUpdatedResponse.json();
      expect(updatedData.name).toEqual(`Updated Project ${testId}`);
    } catch (err) {
      // log the error or else it's silently swallowed by destroy errors
      console.log(err);
      throw err;
    } finally {
      // Always clean up, even if test assertions fail
      await destroy(scope);

      // Verify project was deleted
      if (project) {
        const getDeletedResponse = await api.get(
          `/projects/${project.organization}/${project.slug}/`,
        );
        expect(getDeletedResponse.status).not.toEqual(200);
      }
    }
  });

  test("adopt existing project", async (scope) => {
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
      project = await Project(testId, {
        name: `Test Project ${testId}`,
        slug: testId,
        platform: "node-express",
        team: team.slug,
        organization,
      });

      // Try to create the same project with adopt=true
      const adoptedProject = await Project(testId, {
        name: `Test Project ${testId}`,
        slug: testId,
        platform: "node-express",
        team: team.slug,
        organization,
        adopt: true,
      });

      // Should have the same ID as the original project
      expect(adoptedProject.id).toEqual(project.id);
    } catch (err) {
      console.log(err);
      throw err;
    } finally {
      await destroy(scope);
    }
  });
});
