# HR-Flow GitHub Setup and Git Workflow Guide

This document outlines the Git branching strategy, team allocation, GitHub project board configuration, and the import setup for the HR-Flow project.

---

## 1. Branch Naming Conventions

To keep the repository clean and ensure traceability back to our product backlog/sprints, the team will follow this branching convention:

- **Production Branch**: `main` (always deployable, lock direct pushes)
- **Development Branch**: `dev` (integration branch for current sprint features)
- **Feature Branches**: `feature/<story-number>-<short-description>`
  - Examples:
    - `feature/auth-login`
    - `feature/ai-resume-parser`
    - `feature/attendance-api`
- **Bugfix Branches**: `bugfix/<issue-number>-<short-description>`
  - Examples:
    - `bugfix/attendance-validation`
    - `bugfix/db-connection-retry`
- **Release Branches**: `release/v<version-number>` (for staging and QA testing before merging to `main`)

---

## 2. GitHub Project Board Columns & Automation

Our project board consists of the following columns to track the status of development:

1. **Backlog**: All raw issues/stories not yet assigned to a sprint.
2. **Sprint Planning**: Selected issues for the current sprint.
3. **To Do**: Ready for development.
4. **In Progress**: Actively being worked on by a developer.
5. **Code Review**: Pull request opened; waiting for peer review.
6. **Testing**: QA verification on staging.
7. **Client Review**: Awaiting feedback/approval from client.
8. **Done**: Pull request merged, issue closed.

### Automated Transitions
- **Move to 'To Do'**: Automatically occurs when an issue is assigned to a milestone/sprint.
- **Move to 'In Progress'**: Triggers when a developer assigns themselves to the issue or marks it.
- **Move to 'Code Review'**: Triggers when a Pull Request (PR) is opened.
- **Move to 'Done'**: Triggers when a PR is merged into `dev`/`main`. Use the `Fixes #<issue-id>` syntax in your PR descriptions to auto-close issues.

---

## 3. Team Member Allocations

Here is the functional allocation matrix for our development team:

| Team Member | Domain / Responsibilities | Focus Areas |
| :--- | :--- | :--- |
| **Divagar** | UI & Frontend | React Frontend, Theme/Design System, Dashboards, Sprints, Client Demos |
| **Thuva** | Backend & DB | Node.js (Express), MongoDB collections, API Design, JWT Auth |
| **Bijon** | AI & Testing | Python AI Services, Resume Parser, QA, Bug Verification, Acceptance Criteria |
| **Maari** | Risk & Security | Notifications, Risk Dashboard, Monitoring, Auditing, Automated Warnings |

---

## 4. Running the GitHub Import Script

We have created an automated script to parse our Jira stories (`docs/jira_import.csv`) and import them into GitHub as issues with checklists.

### Prerequisites
1. Ensure [GitHub CLI (`gh`)](https://cli.github.com/) is installed on your local machine.
2. Authenticate the CLI using your GitHub credentials:
   ```bash
   gh auth login
   ```

### Execution Steps
To verify issues and run the importer:

1. **Dry Run (Verify before publishing)**:
   This will print all labels, milestones, and issues to the console without creating them on GitHub.
   ```bash
   python scripts/setup_github.py --dry-run
   ```

2. **Full Import**:
   Run the script without the `--dry-run` flag to set up the repository:
   ```bash
   python scripts/setup_github.py
   ```
