# QUIZ_APP

Simple quiz web application (local copy). This repository contains a frontend and a Django backend.

Quickstart (Windows PowerShell)

1. Create a Python virtual environment and activate it:

```powershell
python -m venv .venv
.\\.venv\\Scripts\\Activate.ps1
```

2. Install backend requirements:

```powershell
pip install -r backend/requirements.txt
```

3. Copy the example env and edit secrets:

```powershell
copy backend\\.env.example backend\\.env
# Edit backend\\.env and add real secrets
```

4. Run migrations and start the server:

```powershell
cd backend
python manage.py migrate
python manage.py runserver
```

Notes

- `backend/.env` is excluded from git. Use `backend/.env.example` as a template.
- Rotate any secrets that were previously committed.
- If history was rewritten, collaborators must re-clone the repository.

Contact

- Ask project owner for help if anything fails.
