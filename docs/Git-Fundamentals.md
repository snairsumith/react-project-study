# Git & Git Accounts — Fundamentals with Examples

This document gives a practical beginner-to-intermediate guide for:

* Git basics
* GitHub account setup
* Day-to-day commands with examples

---

## 1) What is Git?

Git is a **version control system**.
It helps you:

* track code changes
* collaborate with team members
* restore older versions
* work safely using branches

Git runs locally on your machine.
GitHub/GitLab/Bitbucket are remote hosting platforms for Git repositories.

---

## 2) What is a Git Account?

A Git account usually means an account on:

* GitHub
* GitLab
* Bitbucket

You need this account to:

* create remote repositories
* push code
* open pull requests
* collaborate and review code

---

## 3) First-time Setup

### 3.1 Install Git

Check installation:

```bash
git --version
```

### 3.2 Configure identity (global)

```bash
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
```

Verify:

```bash
git config --global --list
```

### 3.3 Default branch name (optional)

```bash
git config --global init.defaultBranch main
```

---

## 4) Authentication (GitHub)

You can authenticate using:

* HTTPS + Personal Access Token (PAT)
* SSH key (recommended for regular use)

### 4.1 SSH key setup (common flow)

Generate key:

```bash
ssh-keygen -t ed25519 -C "you@example.com"
```

Start ssh-agent and add key:

```bash
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519
```

Copy public key and add it to GitHub:

```bash
pbcopy < ~/.ssh/id_ed25519.pub
```

Test connection:

```bash
ssh -T git@github.com
```

---

## 5) Core Git Concepts

* **Repository (repo):** project tracked by Git
* **Working directory:** your files right now
* **Staging area (index):** selected changes for next commit
* **Commit:** saved snapshot with message
* **Branch:** isolated line of development
* **Merge/Rebase:** combine branch changes
* **Remote:** hosted copy (e.g. `origin`)

---

## 6) Basic Workflow (Daily Use)

### Step 1: Check status

```bash
git status
```

### Step 2: Add changes

```bash
git add .
```

Or add specific file:

```bash
git add src/App.tsx
```

### Step 3: Commit

```bash
git commit -m "feat: add login form validation"
```

### Step 4: Push

```bash
git push origin main
```

---

## 7) Create a New Repository (Local -> GitHub)

### Local project to git repo

```bash
git init
git add .
git commit -m "chore: initial commit"
```

### Connect to remote repository

```bash
git remote add origin git@github.com:username/repo-name.git
git branch -M main
git push -u origin main
```

---

## 8) Clone Existing Repository

```bash
git clone git@github.com:username/repo-name.git
cd repo-name
```

---

## 9) Branching Fundamentals

Create and switch:

```bash
git checkout -b feature/add-auth
```

Or modern command:

```bash
git switch -c feature/add-auth
```

Push branch:

```bash
git push -u origin feature/add-auth
```

Switch back to main:

```bash
git switch main
```

---

## 10) Pull Requests (GitHub flow)

1. Create feature branch
2. Commit changes
3. Push branch
4. Open Pull Request (PR)
5. Review + fixes
6. Merge to `main`

After merge:

```bash
git switch main
git pull origin main
git branch -d feature/add-auth
```

---

## 11) Helpful Commands

### View commit history

```bash
git log --oneline --graph --decorate --all
```

### See unstaged changes

```bash
git diff
```

### See staged changes

```bash
git diff --staged
```

### Show remotes

```bash
git remote -v
```

### Fetch latest remote updates

```bash
git fetch origin
```

### Pull latest

```bash
git pull origin main
```

---

## 12) Undo Basics (Safe and Common)

### Unstage a file (keep changes)

```bash
git restore --staged src/App.tsx
```

### Discard local changes in a file

```bash
git restore src/App.tsx
```

### Revert a commit (safe for shared history)

```bash
git revert <commit-hash>
```

> Avoid destructive commands unless you fully understand impact.

---

## 13) `.gitignore` Essentials

Use `.gitignore` to avoid tracking generated/private files.

Example:

```gitignore
node_modules/
dist/
.env
.DS_Store
```

---

## 14) Good Commit Message Examples

Use clear and consistent messages.

Examples:

* `feat: add user profile page`
* `fix: handle null response in dog detail`
* `refactor: extract api client to shared module`
* `docs: update daily training notes`
* `test: add unit tests for filter logic`

---

## 15) Common Git Errors and Quick Fixes

### Error: `rejected (non-fast-forward)`

Cause: remote has new commits.

Fix:

```bash
git pull --rebase origin main
git push origin main
```

### Error: `merge conflict`

Fix flow:

1. Open conflicted files
2. Resolve conflict markers
3. `git add <file>`
4. Continue:
   * merge: `git commit`
   * rebase: `git rebase --continue`

---

## 16) Team Best Practices

* Pull latest `main` before starting work
* Use short-lived feature branches
* Commit small logical changes
* Write meaningful commit messages
* Open PRs early for feedback
* Never commit secrets (`.env`, private keys)

---

## 17) Quick Day-to-Day Example

```bash
# Start work
git switch main
git pull origin main
git switch -c feature/search-filter

# Make changes
git status
git add src/pages/DataFetch.tsx
git commit -m "feat: add search filter for dog list"
git push -u origin feature/search-filter

# After PR merge
git switch main
git pull origin main
git branch -d feature/search-filter
```

---

## 18) Final Notes

Git gets easier with daily usage.
Focus on:

* status -> add -> commit -> push
* branching safely
* clear commit messages
* clean PR workflow

