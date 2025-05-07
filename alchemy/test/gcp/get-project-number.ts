import { ProjectsClient } from "@google-cloud/resource-manager";

/**
 * Some Google APIs return the project as a number.
 * If you only have the project ID string, use this function to get the project number.
 * @param projectIdOrNumber
 * @returns
 */
export async function getProjectNumber(
  projectIdOrNumber: string,
): Promise<string> {
  // Check if it's already a number string
  if (/^\d+$/.test(projectIdOrNumber)) {
    return projectIdOrNumber; // It's already the number
  }

  // If it's the ID string, use Resource Manager API
  const resourceManagerClient = new ProjectsClient();
  try {
    const [project] = await resourceManagerClient.getProject({
      name: `projects/${projectIdOrNumber}`, // Use the Project ID string here
    });

    if (project.name) {
      // The project name format is "projects/1234567890"
      const parts = project.name.split("/");
      if (parts.length === 2 && parts[0] === "projects") {
        return parts[1]; // Return the numerical part
      }
    }
    throw new Error(
      `Could not extract project number from project details for ${projectIdOrNumber}`,
    );
  } catch (error) {
    console.error(
      `Failed to get project details for ${projectIdOrNumber}:`,
      error,
    );
    throw error;
  }
}
