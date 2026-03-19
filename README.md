# MINI-GAME: Rift of Ashes

Base técnica para un action roguelike cooperativo 2D vertical con Phaser 3, React, FastAPI y Socket.IO.

## Stack

- **Frontend:** React + Vite + Phaser 3 + socket.io-client
- **Backend:** FastAPI + python-socketio
- **Persistencia:** MongoDB (pendiente de conexión en próxima iteración)

## Módulos implementados (MVP técnico)

- Menú de entrada básico (nombre + clase)
- Lobby: crear sala / unirse por código (2-5 jugadores)
- Escena de juego vertical en Phaser
- Sincronización de jugadores en tiempo real (posición)
- HUD inicial (HP, maná, stamina, eventos)
- Sistema de habilidades placeholder por slot (`SPACE`)

## Ejecutar local

### 1) Backend

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### 2) Frontend

```bash
cd frontend
npm install
npm run dev
```

## Próximas fases

Revisa `docs/OPEN_BETA_ROADMAP.md` para el plan de Beta Abierta y entregables por sprint.
