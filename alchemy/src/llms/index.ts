import type { PackageRuleItem } from 'vibe-rules';

import { gettingStarted, whatIsAlchemy } from './rules.js';

const rules: PackageRuleItem[] = [
    {
      name: 'alchemy-getting-started',
      description: 'Instructions for installing and configuring Alchemy',
      rule: gettingStarted,
      alwaysApply: false // We have to instruct users to @ this rule when setting up alchemy initially
    },
    {
      name: 'alchemy-what-is-alchemy',
      description: 'Instructions for using Alchemy IaC',
      rule: whatIsAlchemy,
      alwaysApply: true // This will always be included in user's cursor rules
    }
];

export default rules;
