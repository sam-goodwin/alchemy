---
title: Telemetry
description: Information about Alchemy's anonymous usage telemetry collection and how to opt out
sidebar:
  order: 1
---


Alchemy collects anonymous usage telemetry to help us understand how the tool is being used and improve the developer experience.

## What Data Is Collected

We collect basic usage information including:

- Application and resource deployment events
- Performance metrics (timing information)
- Error information (with sensitive data redacted)
- System information (OS, runtime version)
- Anonymous identifiers (no personal information)

## Privacy

We prioritize your privacy:

- No personal information is collected
- All data is anonymized
- Sensitive information is automatically redacted from error reports

## How to Opt Out

You can disable telemetry collection using environment variables:

**Option 1: Alchemy-specific**
```bash
export ALCHEMY_TELEMETRY_DISABLED=1
```

**Option 2: Universal Do Not Track**
```bash
export DO_NOT_TRACK=1
```

To permanently disable telemetry, add either variable to your shell profile:

```bash
# In ~/.bashrc, ~/.zshrc, or equivalent
echo 'export ALCHEMY_TELEMETRY_DISABLED=1' >> ~/.bashrc
```

This data helps us prioritize features, fix bugs, and improve performance. The data is processed securely and is not shared with third parties.
