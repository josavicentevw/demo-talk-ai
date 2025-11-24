# PRD: Pokémon Memory Game

## Introduction/Overview

El objetivo es desarrollar un juego de memoria (Memory) multijugador utilizando Pokémon de la primera generación como temática. El juego permitirá a dos jugadores competir por turnos para encontrar parejas de cartas con Pokémon, llevando un registro de puntuación de la partida actual y un contador de victorias durante toda la sesión de juego.

El proyecto utilizará React con TypeScript, Vite como bundler, y Vitest para testing. Para el MVP, los datos se almacenarán en localStorage, con un plan de migración hacia un backend con autenticación de usuarios.

**Problema que resuelve:** Proporcionar una experiencia de juego casual y competitiva entre dos jugadores, aprovechando la nostalgia de los Pokémon de primera generación con una interfaz moderna y responsive.

## Goals

1. Crear un juego de Memory funcional y completo con mecánicas claras de turnos y puntuación
2. Integrar la PokeAPI para obtener sprites de Pokémon de la primera generación de forma aleatoria
3. Implementar un sistema de puntuación que premie aciertos y rachas con bonus
4. Mantener el estado de la sesión de juego con historial de partidas y contador de victorias
5. Desarrollar una interfaz responsive que funcione tanto en desktop como en mobile
6. Establecer una arquitectura que facilite la futura migración a backend con autenticación
7. Alcanzar una cobertura de tests adecuada con pruebas unitarias e integración

## User Stories

**US-1:** Como jugador, quiero poder configurar el número de parejas del juego para ajustar la dificultad de cada partida.

**US-2:** Como jugador, quiero que los Pokémon se seleccionen aleatoriamente de la primera generación en cada partida para tener variedad en el juego.

**US-3:** Como jugador, quiero turnarme con otro jugador para voltear cartas, de modo que si acierto una pareja pueda seguir jugando, y si fallo, pase el turno a mi oponente.

**US-4:** Como jugador, quiero ver mi puntuación actual y la de mi oponente en tiempo real, incluyendo bonus por rachas, para saber quién va ganando.

**US-5:** Como jugador, quiero ver el contador de victorias de ambos jugadores a lo largo de la sesión para llevar registro de quién ha ganado más partidas.

**US-6:** Como jugador, quiero ver un historial completo de todas las partidas de la sesión con sus puntuaciones finales.

**US-7:** Como jugador, quiero poder iniciar una nueva partida manteniendo el contador de victorias de la sesión actual.

**US-8:** Como jugador, quiero poder finalizar la sesión y resetear todos los contadores cuando termine de jugar.

**US-9:** Como jugador, quiero ver animaciones al voltear las cartas y al encontrar parejas para una experiencia más atractiva.

**US-10:** Como jugador, quiero que el juego se vea bien tanto en mi ordenador como en mi móvil.

## Functional Requirements

### FR-1: Configuración del Juego
- **FR-1.1:** El sistema debe permitir configurar el número de parejas antes de iniciar una partida (opciones sugeridas: 6, 8, 10, 12 parejas).
- **FR-1.2:** El sistema debe seleccionar aleatoriamente N Pokémon distintos de la primera generación (IDs 1-151) según el número de parejas configurado.
- **FR-1.3:** El sistema debe obtener los sprites usando la propiedad `sprites.versions.generation-i.red-blue.front_transparent` de la PokeAPI.
- **FR-1.4:** El sistema debe precargar todos los sprites antes de comenzar la partida para evitar delays durante el juego.

### FR-2: Mecánica de Juego
- **FR-2.1:** El sistema debe permitir que dos jugadores jueguen por turnos.
- **FR-2.2:** En cada turno, el jugador activo puede voltear hasta 2 cartas.
- **FR-2.3:** Si las 2 cartas volteadas son iguales, se consideran emparejadas, permanecen visibles, y el jugador mantiene el turno.
- **FR-2.4:** Si las 2 cartas volteadas son diferentes, se vuelven a ocultar después de un breve delay (1-2 segundos) y el turno pasa al otro jugador.
- **FR-2.5:** El juego termina cuando todas las parejas han sido encontradas.
- **FR-2.6:** No hay límite de tiempo por turno.

### FR-3: Sistema de Puntuación
- **FR-3.1:** Cada pareja encontrada otorga **100 puntos base**.
- **FR-3.2:** El sistema debe implementar un **bonus por racha**: encontrar parejas consecutivas sin fallar otorga puntos adicionales (ej: 2da pareja consecutiva +20, 3ra +30, 4ta +40, etc.).
- **FR-3.3:** El sistema debe implementar un **bonus por velocidad**: menos intentos fallidos otorga multiplicador de puntos al final de la partida.
- **FR-3.4:** El ganador es el jugador con **mayor puntuación total**, no necesariamente quien encontró más parejas.
- **FR-3.5:** El sistema debe mostrar en tiempo real la puntuación de ambos jugadores durante la partida.

### FR-4: Gestión de Sesión
- **FR-4.1:** El sistema debe mantener un **contador de victorias** para cada jugador durante toda la sesión de juego.
- **FR-4.2:** El sistema debe almacenar un **historial de partidas** que incluya: fecha/hora, puntuación de cada jugador, ganador, y número de parejas jugadas.
- **FR-4.3:** El sistema debe proporcionar un botón de **"Nueva Partida"** que resetea el tablero y las puntuaciones pero mantiene el contador de victorias y el historial.
- **FR-4.4:** El sistema debe proporcionar un botón de **"Finalizar Sesión"** que resetea todos los contadores y el historial.
- **FR-4.5:** El sistema debe persistir la sesión actual en **localStorage** para que se mantenga si se recarga la página.
- **FR-4.6:** El sistema debe mostrar visualmente el historial de partidas de la sesión actual.

### FR-5: Interfaz de Usuario
- **FR-5.1:** El sistema debe mostrar las cartas en una cuadrícula responsive.
- **FR-5.2:** El sistema debe mostrar el **sprite del Pokémon** y su **nombre** en cada carta volteada.
- **FR-5.3:** El sistema debe implementar animaciones de volteo de cartas.
- **FR-5.4:** El sistema debe implementar animaciones cuando se encuentra una pareja correcta.
- **FR-5.5:** El sistema debe indicar claramente qué jugador tiene el turno actual.
- **FR-5.6:** El sistema debe ser **responsive** y funcionar correctamente tanto en desktop como en mobile.
- **FR-5.7:** El sistema debe mostrar un panel de puntuación visible con: puntos actuales de cada jugador, número de parejas encontradas por cada uno, y contador de victorias de la sesión.
- **FR-5.8:** El sistema debe mostrar un mensaje de victoria al finalizar cada partida indicando el ganador y las puntuaciones finales.
- **FR-5.9:** El sistema debe permitir a los jugadores **editar sus nombres** al inicio de la sesión o durante el juego.
- **FR-5.10:** El sistema debe utilizar **Tailwind CSS** para todos los estilos con un diseño minimalista.
- **FR-5.11:** El sistema debe seguir la **paleta de colores clásica de la primera generación** de Pokémon (rojo #FF0000, azul #0000FF, amarillo #FFDE00) con un enfoque minimalista y limpio.

### FR-6: Integración con PokeAPI
- **FR-6.1:** El sistema debe realizar llamadas a `https://pokeapi.co/api/v2/pokemon/{id}` para obtener información de cada Pokémon.
- **FR-6.2:** El sistema debe extraer específicamente la URL del sprite de `sprites.versions.generation-i.red-blue.front_transparent`.
- **FR-6.3:** El sistema debe extraer el nombre del Pokémon para mostrarlo junto al sprite.
- **FR-6.4:** El sistema debe manejar errores de red y mostrar mensajes apropiados si la API no está disponible.
- **FR-6.5:** El sistema debe implementar un mecanismo de caché para evitar llamadas repetidas a la API para los mismos Pokémon.

### FR-7: Arquitectura y Código
- **FR-7.1:** El proyecto debe estar configurado con **Vite** como bundler.
- **FR-7.2:** El código debe estar escrito en **TypeScript** con tipado estricto.
- **FR-7.3:** El código debe usar **React** con componentes funcionales y hooks.
- **FR-7.4:** El sistema debe tener una arquitectura modular que separe: lógica de juego, llamadas a API, gestión de estado, y componentes de UI.
- **FR-7.5:** El código debe estar preparado para una futura migración a backend con mínimos cambios (abstracción de la capa de persistencia).

### FR-8: Testing
- **FR-8.1:** El proyecto debe estar configurado con **Vitest** para testing.
- **FR-8.2:** El sistema debe incluir **tests unitarios** para: lógica de puntuación, lógica de turnos, utilidades, y hooks personalizados.
- **FR-8.3:** El sistema debe incluir **tests de integración** para: flujo completo de una partida, interacción con localStorage, y componentes principales.
- **FR-8.4:** El objetivo es alcanzar al menos **70% de cobertura de código**.

## Non-Goals (Out of Scope)

Los siguientes elementos están fuera del alcance del MVP:

1. **Juego multijugador online en tiempo real** - El MVP solo soporta dos jugadores en el mismo dispositivo
2. **Backend con autenticación** - Se usará localStorage para el MVP
3. **Ranking global de jugadores** - Solo se mantendrá historial de sesión local
4. **Modo de un solo jugador vs IA** - Solo modo 2 jugadores
5. **Soporte para otras generaciones de Pokémon** - Solo primera generación (1-151)
6. **Audio y efectos de sonido** - Solo animaciones visuales
7. **Personalización de avatares o perfiles de jugador** - Solo nombres editables, sin avatares
8. **Temas o skins personalizables** - Un solo tema visual
9. **Compartir resultados en redes sociales** - No incluido en el MVP
10. **Modo demo o tutorial** - No incluido en el MVP
9. **Compartir resultados en redes sociales** - No incluido en el MVP
10. **Modo demo o tutorial** - No incluido en el MVP
11. **Modos de dificultad predefinidos** - Solo configuración manual de número de parejas
12. **Internacionalización (i18n)** - Solo en español para el MVP

## Design Considerations

### UI/UX Guidelines
- **Nombre del Juego:** "Gotta Match 'Em All"
- **Estilo de Diseño:** Minimalista y limpio, evitando elementos decorativos excesivos
- **Paleta de colores:** Colores clásicos de la primera generación de Pokémon:
  - Rojo: #FF0000
  - Azul: #0000FF
  - Amarillo: #FFDE00
  - Complementarios: Blanco (#FFFFFF), Negro (#000000), Gris claro (#F5F5F5)
- **Tipografía:** Fuente sans-serif moderna y legible (ej: Inter, Roboto)
- **Espaciado:** Suficiente espacio entre cartas para facilitar el toque/click tanto en mobile como desktop
- **Feedback visual:** Las cartas deben tener estados claros: boca abajo, volteándose, volteada, emparejada
- **Indicador de turno:** Borde o highlight de color (rojo para Jugador 1, azul para Jugador 2) que muestre claramente qué jugador está activo
- **Nombres editables:** Los jugadores pueden personalizar sus nombres en lugar de usar "Jugador 1" y "Jugador 2"

### Componentes Sugeridos
- `GameBoard` - Contenedor principal del tablero de juego
- `Card` - Componente individual de carta con animaciones
- `ScorePanel` - Panel de puntuación y estadísticas
- `GameHistory` - Historial de partidas de la sesión
- `GameControls` - Botones de control (Nueva Partida, Finalizar Sesión)
- `ConfigModal` - Modal para configurar número de parejas
- `VictoryModal` - Modal de victoria con resultados finales

### Animaciones
- Animación de flip 3D al voltear cartas
- Efecto de pulso o brillo al encontrar una pareja
- Transición suave al cambiar de turno
- Animación de celebración al ganar

## Technical Considerations

### Stack Tecnológico
- **Frontend Framework:** React 18+
- **Lenguaje:** TypeScript 5+
- **Build Tool:** Vite 5+
- **Testing:** Vitest + React Testing Library
- **Manejo de Estado:** Zustand
- **HTTP Client:** Fetch API nativa
- **Estilos:** Tailwind CSS
- **Persistencia MVP:** localStorage

### Arquitectura de Carpetas Sugerida
```
src/
├── components/        # Componentes de UI
├── hooks/            # Custom hooks
├── services/         # Servicios (API, localStorage)
├── utils/            # Utilidades y helpers
├── types/            # Definiciones de TypeScript
├── constants/        # Constantes de la aplicación
├── store/            # Gestión de estado global
└── __tests__/        # Tests
```

### Abstracción para Migración a Backend
- **Capa de Servicios:** Crear interfaces abstractas para las operaciones de persistencia
  - `SessionService` - Guardar/recuperar sesión
  - `HistoryService` - Guardar/recuperar historial
  - Implementación MVP: `LocalStorageSessionService`
  - Implementación futura: `APISessionService`
  
### Dependencias Clave
- react, react-dom
- typescript
- vite
- vitest, @testing-library/react, @testing-library/jest-dom
- zustand (state management)
- tailwindcss, postcss, autoprefixer (estilos)

## Success Metrics

1. **Funcionalidad Completa:** El juego permite jugar partidas completas sin bugs críticos
2. **Performance:** Las cartas se voltean y animan sin lag en dispositivos de gama media
3. **Cobertura de Tests:** Al menos 70% de cobertura de código con tests pasando
4. **Responsive:** El juego es jugable en pantallas desde 320px hasta 1920px de ancho
5. **Tasa de Errores de API:** Menos del 1% de llamadas a PokeAPI fallan sin manejo adecuado
6. **Persistencia:** La sesión se recupera correctamente en 100% de los casos tras recargar la página
7. **UX:** Las animaciones son fluidas (60fps) en el 90% de los dispositivos testeados

## Migration Plan: Backend + Authentication

Esta sección describe el plan para migrar el MVP de localStorage a un backend completo con autenticación.

### Fase 1: Backend Setup (Post-MVP)
1. **Stack Backend:** Node.js + Express + TypeScript o NestJS
2. **Base de Datos:** PostgreSQL o MongoDB
3. **Autenticación:** JWT + bcrypt para passwords
4. **Endpoints Iniciales:**
   - `POST /api/auth/register` - Registro de usuario
   - `POST /api/auth/login` - Login (retorna JWT)
   - `GET /api/auth/me` - Obtener usuario actual
   - `POST /api/auth/logout` - Logout

### Fase 2: Migración de Sesiones y Partidas
1. **Modelo de Datos:**
   ```
   User {
     id, email, username, passwordHash, createdAt
   }
   
   GameSession {
     id, userId1, userId2, startedAt, endedAt
   }
   
   Game {
     id, sessionId, winner, player1Score, player2Score, 
     pairCount, playedAt
   }
   ```

2. **Nuevos Endpoints:**
   - `POST /api/sessions` - Crear nueva sesión
   - `GET /api/sessions/:id` - Obtener sesión
   - `POST /api/sessions/:id/games` - Guardar partida
   - `GET /api/sessions/:id/games` - Historial de sesión
   - `GET /api/users/:id/stats` - Estadísticas de usuario

### Fase 3: Ranking Global
1. **Endpoints de Ranking:**
   - `GET /api/leaderboard/global` - Top 100 jugadores por victorias totales
   - `GET /api/leaderboard/monthly` - Top del mes actual
   - `GET /api/users/:id/rank` - Posición de un usuario

2. **Métricas a Trackear:**
   - Total de victorias
   - Puntuación promedio
   - Mejor racha
   - Total de partidas jugadas

### Fase 4: Características Futuras (Opcional)
- Juego multijugador online en tiempo real (WebSockets)
- Sistema de amigos y desafíos
- Logros y badges
- Modos de juego adicionales

### Estrategia de Migración del Frontend
1. **Paso 1:** Crear interfaces abstractas en el MVP (ya incluido en FR-7.5)
2. **Paso 2:** Implementar servicios API que cumplan las mismas interfaces
3. **Paso 3:** Agregar sistema de autenticación en el frontend (login/registro)
4. **Paso 4:** Feature flag para cambiar entre localStorage y API
5. **Paso 5:** Migración gradual de funcionalidades
6. **Paso 6:** Deprecar localStorage una vez estable el backend

---

**Fecha de Creación:** 24 de noviembre de 2025  
**Versión:** 1.0  
**Autor:** GitHub Copilot
