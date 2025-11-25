# ⚪ Gotta Match 'Em All! ⚪

Juego de memoria Pokémon con los sprites de la **Primera Generación** usando la **PokéAPI**.

<div align="center">
  <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-i/red-blue/25.png" alt="Pikachu" />
  <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-i/red-blue/6.png" alt="Charizard" />
  <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-i/red-blue/9.png" alt="Blastoise" />
  <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-i/red-blue/3.png" alt="Venusaur" />
</div>

## 🎮 Características

- ⚔️ **Modo 2 Jugadores** con turnos alternados
- 🏆 **Sistema de puntuación** con rachas y bonificaciones
- 💾 **Persistencia con localStorage** (historial de partidas y victorias)
- 🎲 **Pokémon aleatorios** de la Gen 1 (151 Pokémon)
- ⚙️ **Configuración personalizable** (6-50 pares de cartas)
- ✏️ **Nombres editables** para los jugadores
- 🎯 **Indicador visual del turno activo** con bordes de colores (verde activo/gris inactivo)
- 🖼️ **Sprites grandes optimizados** (175% de tamaño original)
- 🃏 **Animación 3D** al voltear las cartas
- 📱 **Diseño responsive** (móvil, tablet, desktop)
- 📜 **Historial visual con Pokémon** - Ver qué Pokémon aparecieron en cada partida
- ⏱️ **Tracking de duración** de partidas con timer automático
- 🗑️ **Gestión de historial** con opción de borrar todo
- ✅ **86 tests unitarios e integración** con cobertura completa

## 🚀 Inicio Rápido

### Prerequisitos

- **Node.js** 20.18+ (funciona con 20.18.0, recomendado 20.19+)
- **npm** 10+

### Instalación

```bash
# Clonar el repositorio
git clone <url-del-repo>
cd gotta-match-em-all

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173) en tu navegador.

### Build para Producción

```bash
npm run build
npm run preview  # Ver build localmente
```

## 🎯 Cómo Jugar

1. **Configurar juego**: Click en "⚙️ Configurar Juego" para elegir el número de pares (6-50)
2. **Editar nombres**: Click en el ícono ✏️ junto a "Jugador 1" y "Jugador 2" para personalizar
3. **Voltear cartas**: Click en dos cartas por turno para encontrar parejas
4. **Hacer match**: Si las dos cartas son iguales, sumas puntos y sigues jugando
5. **Cambio de turno**: Si fallas, el turno pasa al otro jugador (indicado con borde verde)
6. **Ganar**: ¡El jugador con más puntos al final gana!

### Sistema de Puntuación

- **Match encontrado**: +10 puntos base
- **Racha de 2 matches**: +5 puntos extra
- **Racha de 3 matches**: +10 puntos extra
- **Racha de 4+ matches**: +15 puntos extra
- **Fallo (no match)**: El turno pasa al otro jugador

### 📜 Historial de Partidas

El historial ahora incluye visualización completa de cada partida:

- **Vista Expandible**: Click para ver detalles de cada juego
- **Sprites Visuales**: Muestra todos los Pokémon usados en la partida
- **Duración**: Timer automático en formato MM:SS
- **Estadísticas**: Pares jugados, ganador, puntuaciones
- **Responsive Grid**: 
  - Móvil: 3 columnas de Pokémon
  - Tablet: 4 columnas
  - Desktop: 6 columnas
- **Borrar Historial**: Botón para limpiar todas las partidas guardadas
- **Compatibilidad**: Partidas antiguas sin Pokémon se muestran con mensaje legacy

## 🛠️ Stack Tecnológico

### Core
- **React 19.2.0** - Biblioteca UI
- **TypeScript 5.7.3** - Tipado estático
- **Vite 7.2.4** - Build tool y dev server

### UI y Estilos
- **Tailwind CSS 4.1.7** - Framework CSS utility-first
- **CSS3** - Animaciones 3D personalizadas

### Estado
- **Zustand 5.0.8** - Gestión de estado global (stores)

### Testing
- **Vitest 4.0.13** - Test runner
- **React Testing Library 17.0.2** - Tests de componentes
- **happy-dom 16.15.0** - DOM environment para tests
- **@vitest/coverage-v8** - Reporte de cobertura

### API
- **PokéAPI** - [https://pokeapi.co](https://pokeapi.co) (sprites Gen 1)

## 📂 Estructura del Proyecto

```
gotta-match-em-all/
├── src/
│   ├── components/          # Componentes React
│   │   ├── Card.tsx         # Carta individual con flip 3D
│   │   ├── Card.css         # Animaciones de carta
│   │   ├── GameBoard.tsx    # Tablero de juego (grid)
│   │   ├── ScorePanel.tsx   # Panel de puntuación y stats
│   │   ├── PlayerNameEditor.tsx  # Editor de nombres
│   │   ├── GameControls.tsx # Botones de control
│   │   ├── ConfigModal.tsx  # Modal de configuración
│   │   ├── VictoryModal.tsx # Modal de victoria
│   │   ├── GameHistory.tsx  # Historial de partidas
│   │   └── components.css   # Estilos compartidos
│   │
│   ├── store/              # Zustand stores
│   │   ├── game-store.ts   # Estado del juego actual
│   │   └── session-store.ts # Sesión y historial
│   │
│   ├── services/           # Servicios externos
│   │   ├── pokemon-api.service.ts  # Cliente PokéAPI
│   │   └── storage/
│   │       └── local-storage-session.service.ts  # Persistencia
│   │
│   ├── hooks/              # Custom hooks
│   │   ├── use-game-flow.ts    # Lógica del flujo del juego
│   │   └── use-pokemon-loader.ts  # Carga de Pokémon
│   │
│   ├── utils/              # Utilidades
│   │   └── array-helpers.ts    # Shuffle, chunk, random
│   │
│   ├── types/              # TypeScript types
│   │   ├── game.ts         # Card, Player, GameState
│   │   ├── pokemon.ts      # Pokemon, PokemonSprite
│   │   └── session.ts      # Session, SessionGame
│   │
│   ├── constants/          # Constantes
│   │   ├── game.ts         # Puntos, delays, límites
│   │   ├── api.ts          # Configuración PokéAPI
│   │   └── colors.ts       # Paleta Pokémon
│   │
│   ├── App.tsx             # Componente principal
│   ├── App.css             # Estilos globales
│   └── main.tsx            # Entry point
│
├── tests/                  # Tests
│   ├── components/         # Tests de componentes (*.test.tsx)
│   ├── store/              # Tests de stores (*.test.ts)
│   ├── services/           # Tests de servicios
│   └── utils/              # Tests de utilidades
│
├── public/                 # Assets estáticos
├── vite.config.ts          # Configuración Vite
├── vitest.config.ts        # Configuración Vitest
├── tsconfig.json           # Configuración TypeScript
├── tailwind.config.js      # Configuración Tailwind
└── package.json            # Dependencias y scripts
```

## 🧪 Testing

### Ejecutar Tests

```bash
# Todos los tests
npm run test

# Watch mode (desarrollo)
npm run test:watch

# Cobertura
npm run test:coverage
```

### Estadísticas de Tests

- **86 tests** en total (100% passing)
- **9 archivos** de test
- **Duración**: ~5.6s
- **Cobertura**: 66%+ statements

#### Desglose por Módulo

| Módulo | Tests | Cobertura |
|--------|-------|-----------|
| `game-store.ts` | 19 | 70.68% |
| `session-store.ts` | 17 | 90.62% |
| `pokemon-api.service.ts` | 9 | 98% |
| `array-helpers.ts` | 11 | 100% |
| `Card.tsx` | 5 | 100% |
| `ScorePanel.tsx` | 8 | 100% |
| `GameBoard.tsx` | 3 | 90.9% |
| `GameHistory.tsx` | 12 | 85%+ |
| `App.tsx` (integración) | 2 | 50.9% |

## ⚙️ Configuración

### Variables de Entorno

No se requieren variables de entorno. La app usa la PokéAPI pública.

### Configuración del Juego

- **Mínimo de pares**: 2 (4 cartas)
- **Máximo de pares**: 10 (20 cartas)
- **Delay de flip**: 1500ms
- **Generación Pokémon**: Gen 1 (IDs 1-151)

### Personalización

#### Cambiar Paleta de Colores

Edita `src/constants/colors.ts`:

```typescript
export const POKEMON_COLORS = {
  primary: '#FF0000',   // Rojo Pokémon
  secondary: '#0000FF', // Azul
  accent: '#FFDE00',    // Amarillo
  // ...
};
```

#### Cambiar Sistema de Puntos

Edita `src/constants/game.ts`:

```typescript
export const BASE_POINTS = 10;
export const STREAK_BONUS = {
  2: 5,
  3: 10,
  4: 15,
};
```

## 🎨 Características Técnicas

### Arquitectura

- **Separation of Concerns**: Componentes, lógica de negocio, y servicios separados
- **State Management**: Zustand con selectors para performance
- **Custom Hooks**: Encapsulación de lógica reutilizable
- **Type Safety**: TypeScript estricto (verbatimModuleSyntax)

### Optimizaciones

- **Memoización**: `React.memo` en componentes puros
- **Zustand Selectors**: Solo re-render en cambios relevantes
- **Code Splitting**: Lazy loading de modales
- **CSS Transforms**: Animaciones con GPU acceleration
- **PokéAPI Caching**: Cache en memoria para sprites

### Accesibilidad

- **Roles ARIA**: Botones y controles semánticos
- **Keyboard Navigation**: Tab y Enter para navegación
- **Screen Reader**: Labels descriptivos
- **Contraste**: Colores con WCAG AA compliance

## 🐛 Bugs Conocidos y Limitaciones

### Limitaciones MVP

- Persistencia solo con **localStorage** (sin backend)
- Sin **sincronización multi-dispositivo**
- Sin **modo single-player** (solo 2 jugadores)
- Sin **modo online** (solo local)
- Sin **efectos de sonido**

### Mejoras Futuras

- [ ] Backend con base de datos (PostgreSQL/MongoDB)
- [ ] Autenticación de usuarios
- [ ] Leaderboard global
- [ ] Modo single-player vs CPU
- [ ] Multijugador online (WebSockets)
- [ ] Efectos de sonido y música
- [ ] Animaciones de confetti en victoria
- [ ] Modo oscuro / temas personalizables
- [ ] Soporte para más generaciones de Pokémon
- [ ] PWA (Progressive Web App)
- [ ] Filtros y búsqueda en historial por Pokémon específico
- [ ] Estadísticas por Pokémon (más encontrados, etc.)
- [ ] Exportar historial a JSON/CSV

## 📜 Licencia

Este es un proyecto educacional. Pokémon y todos los nombres relacionados son marcas registradas de Nintendo/Game Freak/Creatures Inc.

Los sprites de Pokémon son proporcionados por [PokéAPI](https://pokeapi.co) bajo Fair Use educacional.

## 🙏 Agradecimientos

- **PokéAPI** - API gratuita de Pokémon
- **PokeAPI Sprites** - Sprites originales de Game Boy
- **Vite Team** - Increíble herramienta de desarrollo
- **Zustand** - Estado global simple y efectivo

## ✨ Últimas Mejoras (v1.1.0)

### Dashboard de Historial Mejorado

**Fecha**: Noviembre 25, 2025

Se implementó una mejora completa del sistema de historial de partidas:

#### 🎨 Características Nuevas

1. **Visualización de Pokémon**
   - Sprites de todos los Pokémon usados en cada partida
   - Grid responsive adaptable a todos los dispositivos
   - Hover effects con animaciones suaves
   - Nombres capitalizados con tooltips

2. **Tracking de Duración**
   - Timer automático que inicia/termina con cada partida
   - Formato MM:SS para fácil lectura
   - Duración almacenada en GameResult

3. **Interfaz Expandible**
   - Click para expandir/colapsar detalles de cada partida
   - Navegación por teclado (Enter/Space)
   - Animaciones slideDown suaves
   - Indicadores visuales de estado

4. **Gestión de Historial**
   - Botón "🗑️ Borrar Historial" con confirmación
   - Limpia todas las partidas y estadísticas
   - Mantiene configuración de jugadores

5. **Sprites Más Grandes**
   - Incremento de tamaño de 120% a 180% en cartas
   - Max-width aumentado a 200px
   - Mejor visibilidad durante el juego

#### 🔧 Cambios Técnicos

- `GameResult` ahora incluye `pokemons?: Pokemon[]` y `duration?: number`
- `GameState` tiene campos `startTime` y `endTime` para tracking
- Nuevo método `clearHistory()` en session-store
- 12 tests adicionales para GameHistory (86 tests en total)
- Backward compatibility completa con partidas antiguas

#### 📦 Impacto en Bundle

- CSS: +1.2 kB
- JS: +2.3 kB  
- Total: ~3.5 kB (impacto mínimo)
- Build: 214.47 kB (66.92 kB gzip)

#### 📚 Documentación

Ver documentación completa en: `tasks/ENHANCEMENT-POKEMON-HISTORY.md`

---

**Desarrollado con ❤️ y ⚡ usando React + TypeScript + Vite**

¡Diviértete atrapándolos a todos! 🎮✨
