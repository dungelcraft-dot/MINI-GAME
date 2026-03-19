# Blueprint de Diseño de Juego

## Bucle principal
1. Entrar al lobby con amigos (2-5)
2. Elegir clase y build inicial
3. Explorar mapa vertical interconectado
4. Limpiar salas, descubrir secretos y resolver puzzles
5. Derrotar mini-jefes y jefe de zona
6. Elegir mejoras de run y avanzar o extraer

## Clases y roles
- **Guerrero:** frontline, control, alta stamina
- **Mago:** burst mágico, control de área
- **Cazador:** movilidad, crítico, precisión
- **Demonio:** riesgo/recompensa, sustain agresivo

## Sistemas clave
- Vida/Maná/Stamina
- Inventario + equipamiento por slots
- Pasivas (reliquias) y activas (hechizos)
- Progresión metajuego entre runs
- Escalado de dificultad por tamaño de grupo

## Arquitectura técnica
- Servidor autoritativo para físicas lógicas
- Cliente Phaser solo render + predicción ligera
- Snapshot state + eventos incrementales
- Seeds para reproducibilidad procedural
