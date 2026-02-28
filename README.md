# HW2 File Structure App

Homework project with file-tree visualization built from `db.json`.

## Branch Requirement

- `main` branch is intentionally empty
- all implementation is in working branch: `homework-2-work`

## Project Parts

- `db.json` - source data for the tree
- `json-server` API - serves data at `http://localhost:3001/root`
- React frontend (`frontend/`) - renders folder/file tree with open/closed folder states

## Quick Start

Install frontend dependencies:

```bash
npm run frontend:install
```

Run API (terminal 1):

```bash
npm run api
```

Run frontend (terminal 2):

```bash
npm run frontend:dev
```

Open frontend at `http://localhost:5173`.

## Build and Test

Frontend production build:

```bash
npm run frontend:build
```

