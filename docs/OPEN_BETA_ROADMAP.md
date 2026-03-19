# Roadmap hacia Beta Abierta

## Objetivo
Entregar una beta pública web jugable, cooperativa, con núcleo roguelike sólido y rendimiento estable en navegador.

## Fase 1 — Core Online (2-3 semanas)
- Autoridad de servidor completa para movimiento/daño/proyectiles
- Interpolación/reconciliación de red cliente
- Reconexión y anti-desincronización
- Persistencia básica de perfiles en MongoDB

## Fase 2 — Combate & Clases (3-4 semanas)
- Árbol mínimo por clase:
  - Guerrero: bloqueo, corte giratorio
  - Mago: proyectil arcano, nova, escudo
  - Cazador: dash, tiro cargado, trampa
  - Demonio: drenaje, marca, metamorfosis breve
- IA base enemigos melee/ranged
- Primer jefe épico con 3 fases

## Fase 3 — Roguelike vertical (3 semanas)
- Generación procedural por seeds
- Rooms de combate, puzzle, tienda, evento
- Biomas conectados y rutas secretas
- Recompensas: reliquias, pasivas, activas

## Fase 4 — UX/Polish (2 semanas)
- Arte pixel cohesivo por tileset/spritesheets
- Efectos VFX estilo animado 2D
- Mejoras de HUD (cooldowns, minimapa)
- Chat, ping social y quick commands

## Métricas de salida Beta
- 60 FPS cliente objetivo en equipos medios
- Latencia percibida aceptable < 120 ms
- Session crash rate < 1%
- Match completion rate > 65%
