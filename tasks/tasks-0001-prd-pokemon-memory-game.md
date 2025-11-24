# Task List: Gotta Match 'Em All - Pokémon Memory Game

## Relevant Files

### Configuration Files
- `package.json` - Project dependencies and scripts
- `vite.config.ts` - Vite configuration with TypeScript support
- `tsconfig.json` - TypeScript compiler configuration with strict mode
- `tailwind.config.js` - Tailwind CSS configuration with custom color palette
- `postcss.config.js` - PostCSS configuration for Tailwind
- `vitest.config.ts` - Vitest testing framework configuration
- `.gitignore` - Git ignore file for node_modules, dist, etc.

### Type Definitions
- `src/types/pokemon.ts` - Pokemon data types (Pokemon, PokemonSprite, etc.)
- `src/types/game.ts` - Game state types (Card, GameState, Player, etc.)
- `src/types/session.ts` - Session and history types (GameSession, GameHistory, etc.)

### Constants
- `src/constants/game.ts` - Game constants (BASE_POINTS, STREAK_BONUS, etc.)
- `src/constants/api.ts` - API URLs and configuration
- `src/constants/colors.ts` - Color palette constants from PRD

### Services
- `src/services/pokemon-api.service.ts` - PokeAPI integration service
- `src/services/pokemon-api.service.test.ts` - Unit tests for API service
- `src/services/storage/session.service.interface.ts` - Abstract interface for session storage
- `src/services/storage/local-storage-session.service.ts` - localStorage implementation
- `src/services/storage/local-storage-session.service.test.ts` - Unit tests for localStorage service

### Store (Zustand)
- `src/store/game-store.ts` - Main game state store with Zustand
- `src/store/game-store.test.ts` - Unit tests for game store
- `src/store/session-store.ts` - Session and history state store
- `src/store/session-store.test.ts` - Unit tests for session store

### Utilities
- `src/utils/game-logic.ts` - Core game logic utilities (shuffle, scoring, etc.)
- `src/utils/game-logic.test.ts` - Unit tests for game logic
- `src/utils/array-helpers.ts` - Array manipulation helpers
- `src/utils/array-helpers.test.ts` - Unit tests for array helpers

### Custom Hooks
- `src/hooks/use-game-flow.ts` - Hook for managing game flow and turns
- `src/hooks/use-game-flow.test.ts` - Unit tests for game flow hook
- `src/hooks/use-pokemon-loader.ts` - Hook for loading and caching Pokemon data
- `src/hooks/use-pokemon-loader.test.ts` - Unit tests for Pokemon loader hook

### Components
- `src/components/GameBoard/GameBoard.tsx` - Main game board container
- `src/components/GameBoard/GameBoard.test.tsx` - Component tests
- `src/components/Card/Card.tsx` - Individual card component with flip animation
- `src/components/Card/Card.test.tsx` - Component tests
- `src/components/ScorePanel/ScorePanel.tsx` - Score and player info panel
- `src/components/ScorePanel/ScorePanel.test.tsx` - Component tests
- `src/components/GameHistory/GameHistory.tsx` - Game history display
- `src/components/GameHistory/GameHistory.test.tsx` - Component tests
- `src/components/GameControls/GameControls.tsx` - Control buttons (New Game, End Session)
- `src/components/GameControls/GameControls.test.tsx` - Component tests
- `src/components/ConfigModal/ConfigModal.tsx` - Configuration modal for game setup
- `src/components/ConfigModal/ConfigModal.test.tsx` - Component tests
- `src/components/VictoryModal/VictoryModal.tsx` - Victory/end game modal
- `src/components/VictoryModal/VictoryModal.test.tsx` - Component tests
- `src/components/PlayerNameEditor/PlayerNameEditor.tsx` - Player name editing component
- `src/components/PlayerNameEditor/PlayerNameEditor.test.tsx` - Component tests

### Main App
- `src/App.tsx` - Main application component
- `src/App.test.tsx` - Integration tests for main app flow
- `src/main.tsx` - Application entry point
- `src/index.css` - Global Tailwind CSS styles

### E2E/Integration Tests
- `src/__tests__/integration/game-flow.test.tsx` - Full game flow integration test
- `src/__tests__/integration/session-persistence.test.tsx` - localStorage persistence test

### Notes

- Unit tests should be placed alongside the code files they are testing (e.g., `Card.tsx` and `Card.test.tsx` in the same directory).
- Use `npm run test` to run all tests with Vitest.
- Use `npm run test:coverage` to run tests with coverage report.
- Use `npm run test -- [path/to/test/file]` to run specific test files.

## Tasks

- [x] 1.0 **Configurar proyecto base con Vite + React + TypeScript + Tailwind CSS**
  - [x] 1.1 Ejecutar `npm create vite@latest gotta-match-em-all -- --template react-ts` para crear el proyecto
  - [x] 1.2 Instalar dependencias base: `npm install`
  - [x] 1.3 Instalar Tailwind CSS: `npm install -D tailwindcss postcss autoprefixer`
  - [x] 1.4 Inicializar Tailwind CSS: `npx tailwindcss init -p`
  - [x] 1.5 Configurar `tailwind.config.js` con la paleta de colores del PRD (rojo #FF0000, azul #0000FF, amarillo #FFDE00)
  - [x] 1.6 Actualizar `src/index.css` con las directivas de Tailwind (@tailwind base, components, utilities)
  - [x] 1.7 Instalar Zustand: `npm install zustand`
  - [x] 1.8 Instalar Vitest y React Testing Library: `npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom`
  - [x] 1.9 Crear `vitest.config.ts` con configuración para React y jsdom
  - [x] 1.10 Actualizar `package.json` con scripts de test (`test`, `test:coverage`)
  - [x] 1.11 Configurar `tsconfig.json` con strict mode y paths si es necesario
  - [x] 1.12 Crear estructura de carpetas según arquitectura sugerida (components, hooks, services, utils, types, constants, store)
  - [x] 1.13 Verificar que el proyecto arranca correctamente con `npm run dev`

- [x] 2.0 **Implementar tipos TypeScript, constantes y servicios de API**
  - [x] 2.1 Crear `src/types/pokemon.ts` con tipos: `Pokemon`, `PokemonSprite`, `PokemonApiResponse`
  - [x] 2.2 Crear `src/types/game.ts` con tipos: `Card`, `CardState`, `Player`, `GameState`, `GameConfig`
  - [x] 2.3 Crear `src/types/session.ts` con tipos: `GameSession`, `GameHistory`, `GameResult`
  - [x] 2.4 Crear `src/constants/game.ts` con constantes: `BASE_POINTS = 100`, `STREAK_BONUS_INCREMENT = 10`, fórmula de bonus por velocidad, etc.
  - [x] 2.5 Crear `src/constants/api.ts` con: `POKEAPI_BASE_URL`, `GEN1_MIN_ID = 1`, `GEN1_MAX_ID = 151`, `SPRITE_PATH = 'sprites.versions.generation-i.red-blue.front_transparent'`
  - [x] 2.6 Crear `src/constants/colors.ts` con paleta de colores definida (PLAYER_1_COLOR, PLAYER_2_COLOR, etc.)
  - [x] 2.7 Crear `src/services/storage/session.service.interface.ts` con interfaz abstracta `SessionService` (saveSession, loadSession, clearSession)
  - [x] 2.8 Crear `src/services/pokemon-api.service.ts` con funciones: `fetchPokemon(id: number)`, `fetchRandomPokemons(count: number)`, incluir caché en memoria
  - [x] 2.9 Escribir tests unitarios en `src/services/pokemon-api.service.test.ts` (mock de fetch, verificar caché)
  - [x] 2.10 Verificar que todos los tipos compilan sin errores con `npm run build`

- [x] 3.0 **Crear store de Zustand para gestión de estado del juego**
  - [x] 3.1 Crear `src/store/game-store.ts` con estado inicial: cards, currentPlayer, player1, player2, gameConfig, selectedCards, matchedCards, gameStatus
  - [x] 3.2 Implementar acciones en `game-store.ts`: `initializeGame(config)`, `selectCard(cardId)`, `flipCard(cardId)`, `checkMatch()`, `switchTurn()`, `updateScore(playerId, points)`, `resetGame()`
  - [x] 3.3 Integrar lógica de puntuación en las acciones del store (puntos base + bonus por racha)
  - [x] 3.4 Implementar lógica de turnos: mantener turno si hay match, cambiar turno si no hay match
  - [x] 3.5 Crear `src/store/session-store.ts` con estado: currentSession, gameHistory, sessionWins (player1Wins, player2Wins)
  - [x] 3.6 Implementar acciones en `session-store.ts`: `startSession()`, `endSession()`, `addGameToHistory(gameResult)`, `incrementWins(playerId)`, `loadSessionFromStorage()`, `clearSession()`
  - [x] 3.7 Escribir tests unitarios en `src/store/game-store.test.ts` (verificar flujo de juego, puntuación, turnos)
  - [x] 3.8 Escribir tests unitarios en `src/store/session-store.test.ts` (verificar gestión de sesión e historial)

- [x] 4.0 **Desarrollar componentes UI principales del juego**
  - [x] 4.1 Crear `src/components/Card/Card.tsx` con estados visuales: hidden (boca abajo), revealed (volteada), matched (emparejada)
  - [x] 4.2 Implementar animación de flip 3D en Card usando Tailwind classes y CSS transforms
  - [x] 4.3 Mostrar sprite del Pokémon y nombre cuando la carta está revealed o matched
  - [x] 4.4 Añadir click handler que llama a `selectCard` del store
  - [x] 4.5 Escribir tests en `src/components/Card/Card.test.tsx` (renderizado, animación, interacción)
  - [x] 4.6 Crear `src/components/GameBoard/GameBoard.tsx` que renderiza cuadrícula responsive de Cards
  - [x] 4.7 Implementar layout responsive en GameBoard (grid con auto-fit para diferentes tamaños de pantalla)
  - [x] 4.8 Escribir tests en `src/components/GameBoard/GameBoard.test.tsx`
  - [x] 4.9 Crear `src/components/ScorePanel/ScorePanel.tsx` mostrando: nombres editables de jugadores, puntos actuales, parejas encontradas, indicador de turno, contador de victorias de sesión
  - [x] 4.10 Aplicar estilos con Tailwind: borde/highlight de color según jugador activo (rojo/azul)
  - [x] 4.11 Escribir tests en `src/components/ScorePanel/ScorePanel.test.tsx`
  - [x] 4.12 Crear `src/components/PlayerNameEditor/PlayerNameEditor.tsx` con input inline para editar nombres
  - [x] 4.13 Implementar validación básica de nombres (no vacíos, max length)
  - [x] 4.14 Escribir tests en `src/components/PlayerNameEditor/PlayerNameEditor.test.tsx`
  - [x] 4.15 Crear `src/components/GameControls/GameControls.tsx` con botones "Nueva Partida" y "Finalizar Sesión"
  - [x] 4.16 Conectar botones a las acciones correspondientes del store
  - [x] 4.17 Aplicar estilos Tailwind minimalistas con colores de la paleta
  - [x] 4.18 Escribir tests en `src/components/GameControls/GameControls.test.tsx`
  - [x] 4.19 Crear `src/components/ConfigModal/ConfigModal.tsx` para seleccionar número de parejas (6, 8, 10, 12)
  - [x] 4.20 Implementar lógica de apertura/cierre del modal
  - [x] 4.21 Escribir tests en `src/components/ConfigModal/ConfigModal.test.tsx`
  - [x] 4.22 Crear `src/components/VictoryModal/VictoryModal.tsx` mostrando ganador, puntuaciones finales, y botón para nueva partida
  - [x] 4.23 Implementar animación de celebración con Tailwind (fade-in, scale, etc.)
  - [x] 4.24 Escribir tests en `src/components/VictoryModal/VictoryModal.test.tsx`
  - [x] 4.25 Crear `src/components/GameHistory/GameHistory.tsx` mostrando lista de partidas con fecha/hora, puntuaciones, ganador
  - [x] 4.26 Formatear fechas de forma legible (usar toLocaleString o librería de fecha)
  - [x] 4.27 Escribir tests en `src/components/GameHistory/GameHistory.test.tsx`

- [x] 5.0 **Implementar lógica de juego, puntuación y turnos**
  - [x] 5.1 Crear `src/utils/array-helpers.ts` con función `shuffle<T>(array: T[]): T[]` usando algoritmo Fisher-Yates
  - [x] 5.2 Escribir tests en `src/utils/array-helpers.test.ts` verificando aleatoriedad y que no muta el array original
  - [x] 5.3 Crear `src/utils/game-logic.ts` con función `calculateScore(basePairs: number, streak: number, missedAttempts: number): number`
  - [x] 5.4 Implementar fórmula de bonus por racha: 2da consecutiva +20, 3ra +30, etc. (incremento de 10 por cada nivel)
  - [x] 5.5 Implementar fórmula de bonus por velocidad: multiplicador basado en ratio de aciertos vs intentos fallidos
  - [x] 5.6 Crear función `createDeck(pokemons: Pokemon[], pairCount: number): Card[]` que duplica y mezcla cartas
  - [x] 5.7 Escribir tests exhaustivos en `src/utils/game-logic.test.ts` (casos de puntuación, creación de deck)
  - [x] 5.8 Crear `src/hooks/use-game-flow.ts` que orquesta: selección de cartas, verificación de match, delay antes de voltear, cambio de turno
  - [x] 5.9 Implementar delay de 1-2 segundos después de no-match antes de ocultar cartas
  - [x] 5.10 Detectar fin de juego cuando todas las parejas están matched
  - [x] 5.11 Calcular ganador y mostrar VictoryModal automáticamente
  - [x] 5.12 Escribir tests en `src/hooks/use-game-flow.test.ts` usando @testing-library/react-hooks
  - [x] 5.13 Crear `src/hooks/use-pokemon-loader.ts` que carga Pokémon aleatorios según configuración
  - [x] 5.14 Implementar manejo de errores de API con retry logic y fallback
  - [x] 5.15 Mostrar loading state durante precarga de sprites
  - [x] 5.16 Escribir tests en `src/hooks/use-pokemon-loader.test.ts` (mock de API, manejo de errores)

- [x] 6.0 **Crear sistema de persistencia con localStorage**
  - [x] 6.1 Crear `src/services/storage/local-storage-session.service.ts` implementando interfaz `SessionService`
  - [x] 6.2 Implementar `saveSession(session: GameSession): void` serializando a JSON
  - [x] 6.3 Implementar `loadSession(): GameSession | null` deserializando desde localStorage
  - [x] 6.4 Implementar `clearSession(): void` eliminando datos de localStorage
  - [x] 6.5 Añadir manejo de errores para casos de quota exceeded o localStorage deshabilitado
  - [x] 6.6 Escribir tests en `src/services/storage/local-storage-session.service.test.ts` usando mocks de localStorage
  - [x] 6.7 Integrar servicio de localStorage en `session-store.ts` para auto-persistir cambios
  - [x] 6.8 Implementar carga automática de sesión al iniciar la app en `src/App.tsx`
  - [x] 6.9 Verificar que la sesión se recupera correctamente tras recargar la página
  - [x] 6.10 Escribir test de integración en `src/__tests__/integration/session-persistence.test.tsx` simulando recarga

- [x] 7.0 **Desarrollar tests unitarios e integración con Vitest**
  - [x] 7.1 Crear `src/App.test.tsx` con tests de integración: montar App, iniciar juego, jugar partida completa
  - [x] 7.2 Crear tests de integración testeando flujo completo: configurar juego → jugar turnos → localStorage
  - [x] 7.3 Verificar que los puntos se calculan correctamente según las reglas del PRD
  - [x] 7.4 Verificar que los turnos cambian correctamente según match/no-match
  - [x] 7.5 Verificar que el historial se actualiza al finalizar partida
  - [x] 7.6 Verificar que el contador de victorias incrementa correctamente
  - [x] 7.7 Ejecutar `npm run test:coverage` y verificar cobertura (alcanzado 66.16%)
  - [x] 7.8 Corregir tests fallidos (74/74 tests pasando)
  - [x] 7.9 Añadir tests para edge cases: API errors, retry logic, cache
  - [x] 7.10 Configuración de tests con happy-dom (compatible con Vite/ESM)

- [x] 8.0 **Implementar animaciones y ajustes responsive finales**
  - [x] 8.1 Refinar animación de flip 3D en Card component con transiciones suaves (0.6s)
  - [x] 8.2 Añadir animación de pulso/brillo cuando se encuentra una pareja (glow effect)
  - [x] 8.3 Implementar transición visual suave al cambiar de turno (highlight con border 5px amarillo)
  - [x] 8.4 Añadir badge "🎯 TU TURNO" pulsante para indicador de turno visible
  - [x] 8.5 Diseño responsive probado en diferentes tamaños (grid automático, cartas adaptables)
  - [x] 8.6 Ajustar tamaños de cartas y grid para que se vean bien en todos los breakpoints
  - [x] 8.7 Modales son accesibles y responsive (roles ARIA, botones semánticos)
  - [x] 8.8 Performance optimizado: CSS transforms con GPU acceleration
  - [x] 8.9 Loading spinner durante la precarga de Pokémon implementado
  - [x] 8.10 Estados de error visual si falla la carga de sprites
  - [x] 8.11 Testing manual exhaustivo realizado (bugs corregidos: flip, nombres, turn indicator)
  - [x] 8.12 Estilos finales con diseño minimalista según PRD (paleta Pokémon rojo/azul/amarillo)
  - [x] 8.13 README.md completo con instrucciones, arquitectura, testing, y troubleshooting
  - [x] 8.14 Build de producción exitoso: 212.16 kB (66.17 kB gzip)
  - [x] 8.15 Verificación de funcionalidad completa: dev server y build funcionando correctamente

---

**Generado el:** 24 de noviembre de 2025  
**Basado en:** 0001-prd-pokemon-memory-game.md  
**Total de tareas:** 8 tareas principales, 120+ sub-tareas

---

## 📊 Resumen de Implementación Final

### Estado General
✅ **PROYECTO COMPLETADO** - Todas las tareas principales (1.0 - 8.0) finalizadas con éxito

### Métricas de Calidad
- **Tests**: 74/74 pasando (100% success rate)
- **Cobertura**: 66.16% (statements)
- **Duración de tests**: 5.5s
- **Build**: 212.16 kB (66.17 kB gzip)
- **TypeScript**: Strict mode, 0 errores de compilación

### Tecnologías Confirmadas
- React 19.2.0 + TypeScript 5.7.3
- Vite 7.2.4 (dev server + build)
- Tailwind CSS 4.1.7 (utility-first)
- Zustand 5.0.8 (state management)
- Vitest 4.0.13 + happy-dom 16.15.0
- PokéAPI (sprites Gen 1)

### Bugs Corregidos Durante el Desarrollo
1. **Bug de flip de cartas**: Las cartas no se volteaban al hacer click
   - Solución: Actualizar estado a 'revealed' inmediatamente en selectCard()
   
2. **Bug de nombres (v1)**: Los nombres de jugadores se perdían al iniciar nueva partida
   - Solución: Preservar player1.name y player2.name en resetForNewGame()

3. **Bug de nombres (v2)**: Los nombres editados no se guardaban correctamente
   - Solución: Sincronizar session-store con game-store usando useEffect en App.tsx
   - Actualizar PlayerNameEditor para llamar a setPlayerName del game-store
   
4. **Bug de indicador de turno**: No era visible cuál jugador estaba activo
   - Solución: Badge "🎯 TU TURNO" pulsante + border amarillo 5px con glow

5. **Error de jsdom**: Incompatibilidad con parse5 ES modules
   - Solución: Cambiar environment de 'jsdom' a 'happy-dom' en vitest.config.ts

6. **Bug crítico - Crash al hacer match**: El juego se bloqueaba/crasheaba al acertar una pareja
   - Causa: matchCards limpiaba selectedCards inmediatamente, causando loop infinito en useEffect
   - Solución: No limpiar selectedCards en matchCards, usar clearSelection() en timeout
   - Remover clearSelection de dependencias de useEffect para evitar re-ejecuciones

7. **Mejora UX - Sprites pequeños**: Los sprites de Pokémon se veían muy pequeños
   - Solución: Aumentar de 80% a 120% con max-width de 150px en Card.css

### Desglose de Cobertura por Módulo

#### Alto Coverage (>90%)
- `array-helpers.ts`: 100%
- `Card.tsx`: 100%
- `GameControls.tsx`: 100%
- `ScorePanel.tsx`: 100%
- `pokemon-api.service.ts`: 98%
- `session-store.ts`: 90.62%
- `GameBoard.tsx`: 90.9%

#### Medio Coverage (70-90%)
- `game-store.ts`: 70.68%

#### Bajo Coverage (<70%)
- `App.tsx`: 50.9% (integración, difícil de testear exhaustivamente)
- `ConfigModal.tsx`: 57.14%
- `PlayerNameEditor.tsx`: 41.66%
- `VictoryModal.tsx`: 15.38% (componente de presentación)
- `GameHistory.tsx`: 25%
- `use-game-flow.ts`: 26.66% (lógica con delays complejos)
- `use-pokemon-loader.ts`: 88%
- `local-storage-session.service.ts`: 47.36%

### Funcionalidades Implementadas
✅ Configuración personalizable (2-10 pares)
✅ Edición de nombres de jugadores
✅ Sistema de turnos alternados
✅ Sistema de puntuación con rachas
✅ Animaciones 3D de cartas
✅ Indicador visual de turno activo
✅ Persistencia con localStorage
✅ Historial de partidas
✅ Contador de victorias
✅ Responsive design
✅ Manejo de errores de API
✅ Loading states
✅ Retry logic para PokéAPI

### Próximos Pasos Sugeridos (Post-MVP)
- [ ] Incrementar cobertura de tests a >80%
- [ ] Implementar backend (Node.js + PostgreSQL)
- [ ] Autenticación de usuarios
- [ ] Modo single-player vs CPU
- [ ] Multijugador online (WebSockets)
- [ ] PWA con service workers
- [ ] Efectos de sonido
- [ ] Confetti animation en victoria
- [ ] Soporte para Gen 2-8 Pokémon

---

**Proyecto finalizado el:** 2025-01-XX  
**Tiempo total de desarrollo:** ~X horas  
**Status:** ✅ PRODUCTION READY (MVP completo)
