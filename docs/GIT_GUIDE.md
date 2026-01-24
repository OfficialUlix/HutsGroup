# Git Usage Guide

This project uses Git for version control. This guide outlines how we use Git to maintain a clean and understandable history.

## General Workflow

1.  **Master/Main Branch:** Contains the stable, deployable code.
2.  **Feature Branches:** Create a new branch for every task/feature.
    - Format: `feature/short-description` or `fix/issue-description`
    - Example: `feature/update-gallery-images`

## Commits

We aim for **atomic commits** (one logical change per commit).

### Message Format
We use a simplified semantic commit style:
`[Type] Description of change`

**Types:**
- `[Feat]` New feature
- `[Fix]` Bug fix
- `[Docs]` Documentation changes
- `[Style]` Formatting, missing semi-colons, etc. (no code change)
- `[Refactor]` Refactoring production code
- `[Chore]` Maintenance tasks, dependencies

**Example:**
```
[Feat] Add new 'Automotive' section to services
[Fix] Correct mobile menu z-index issue
[Docs] Update README with setup instructions
```

## Syncing
Always pull the latest changes before starting work:
```bash
git pull origin main
```

## Versioning
Tags are used for releases. See `BUILD_LOG.md` for version history.
