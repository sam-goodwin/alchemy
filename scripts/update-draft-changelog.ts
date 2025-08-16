import { $ } from "bun";
import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

/**
 * Updates the draft changelog with unreleased changes since the last tag
 */
export async function updateDraftChangelog() {
  console.log("Updating draft changelog with unreleased changes...");

  try {
    // Get the latest tag
    const latestTagOutput = await $`git describe --tags --abbrev=0`.text();
    const latestTag = latestTagOutput.trim();

    // Get commits since the latest tag
    const commitsOutput =
      await $`git log ${latestTag}..HEAD --oneline --no-merges`.text();
    const commits = commitsOutput.trim();

    if (!commits) {
      console.log("No new commits since last release");
      return;
    }

    console.log(
      `Found ${commits.split("\n").length} commits since ${latestTag}`,
    );

    // Generate summary using Claude Code CLI
    const prompt = `You are analyzing git commits for Alchemy, a TypeScript-native Infrastructure-as-Code framework.

Here are the recent commits since the last release (${latestTag}):

${commits}

Please create a brief, organized summary of the changes. Group similar changes together and focus on:
1. New features
2. Bug fixes  
3. Improvements/enhancements
4. Breaking changes (if any)
5. Other notable changes

Keep it concise but informative. Use bullet points and focus on user-facing changes. Ignore internal/chore commits unless they're significant.

Format as markdown with sections like:

## Unreleased Changes

### ✨ New Features
- ...

### 🐛 Bug Fixes  
- ...

### 🚀 Improvements
- ...

If there are no significant changes, just say "No significant changes since ${latestTag}".

IMPORTANT: Respond ONLY with the markdown changelog content. Do not include any explanatory text, meta-commentary, or additional context. Your response should start with "## Unreleased Changes" and contain only the formatted changelog content.`;

    const claudeResult = await $`claude ${prompt}`.text();
    const result = { text: claudeResult.trim() };

    // Read current changelog
    const changelogPath = join(process.cwd(), "CHANGELOG.md");
    const currentChangelog = await readFile(changelogPath, "utf-8");

    // Check if draft section already exists
    const draftSectionRegex = /## Unreleased Changes[\s\S]*?(?=\n## |$)/;
    const hasDraftSection = draftSectionRegex.test(currentChangelog);

    let updatedChangelog: string;

    if (hasDraftSection) {
      // Replace existing draft section
      updatedChangelog = currentChangelog.replace(
        draftSectionRegex,
        `${result.text}\n\n---\n`,
      );
    } else {
      // Add draft section at the top
      updatedChangelog = `${result.text}\n\n---\n\n${currentChangelog}`;
    }

    await writeFile(changelogPath, updatedChangelog);
    console.log("Draft changelog updated successfully");

    return result.text;
  } catch (error) {
    console.error("Failed to update draft changelog:", error);
    return null;
  }
}

// Run if called directly
if (import.meta.main) {
  await updateDraftChangelog();
}
