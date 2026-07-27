# React Portfolio Rebuild Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the woohojin portfolio site (`index.html` + `css/` + `js/main.js`) as a Vite + React + TypeScript SPA with clean-URL project detail routing, Markdown-driven project content, and GitHub Pages deployment.

**Architecture:** Vite/React/TS single-page app at the repo root. React Router provides `/` (home: intro, project cards, profile) and `/:projectId` (project detail, rendered from Markdown). Project metadata + body content live as Markdown files with a lightweight hand-rolled frontmatter parser, loaded at build time via `import.meta.glob`. Dark mode is a React Context backed by `localStorage`, mirroring the current site's behavior. Deployment is GitHub Actions building `dist/` to the `gh-pages` branch, with the standard SPA-on-GitHub-Pages 404 redirect trick for direct links/refreshes on `/daallcoffee`.

**Tech Stack:** Vite, React 18, TypeScript, react-router-dom, react-markdown, remark-gfm, CSS Modules, GitHub Actions + peaceiris/actions-gh-pages.

## Global Constraints

- Node 22 / npm are already available in this environment (verified: node v22.12.0, npm 11.17.0).
- No automated test suite (no Vitest/Jest/RTL) — per spec Non-goals, verification is `tsc --noEmit`, `npm run build`, and manual browser checks only.
- Visual design tone is blue–navy; exact layout/spacing/animation timing is decided during implementation, not fixed by spec.
- hansel project gets no detail route — home card only, no "read more" link (`hasDetailPage: false`).
- Repo is `woohojin/Portfolio` on GitHub → Vite `base` must be `/Portfolio/` for GitHub Pages project-site hosting.
- Existing vanilla site content (text, links, image assets) must not be lost — port it into the new content model rather than rewriting it from memory.
- Spec doc: `docs/superpowers/specs/2026-07-27-react-portfolio-redesign-design.md`.

---

### Task 1: Archive legacy site and scaffold the Vite/React/TS toolchain

**Files:**
- Move: `index.html` → `legacy/index.html`
- Move: `css/` → `legacy/css/`
- Move: `js/` → `legacy/js/`
- Move: `img/` → `public/img/`
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `vite.config.ts`
- Create: `index.html` (new Vite entry, repo root)
- Create: `src/main.tsx`
- Create: `src/App.tsx`
- Create: `src/vite-env.d.ts`
- Create: `src/styles/tokens.css`
- Create: `.gitignore`

**Interfaces:**
- Produces: a working `npm run dev` / `npm run build` / `npm run typecheck` toolchain that later tasks build on. No app-level exports yet.

- [ ] **Step 1: Archive the legacy vanilla site and move image assets under `public/`**

```bash
mkdir -p legacy
git mv index.html legacy/index.html
git mv css legacy/css
git mv js legacy/js
mkdir -p public
git mv img public/img
```

- [ ] **Step 2: Initialize package.json and install dependencies**

```bash
npm init -y
npm install react react-dom react-router-dom react-markdown remark-gfm
npm install -D vite @vitejs/plugin-react typescript @types/react @types/react-dom
```

- [ ] **Step 3: Edit `package.json` to add type/module and scripts**

Add/replace these fields in the generated `package.json` (keep the `dependencies`/`devDependencies` npm already wrote):

```json
{
  "name": "portfolio",
  "private": true,
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc --noEmit && vite build",
    "preview": "vite preview",
    "typecheck": "tsc --noEmit"
  }
}
```

- [ ] **Step 4: Create `tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "Bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src", "vite.config.ts"]
}
```

- [ ] **Step 5: Create `vite.config.ts`**

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/Portfolio/',
})
```

- [ ] **Step 6: Create `src/vite-env.d.ts`**

```ts
/// <reference types="vite/client" />
```

- [ ] **Step 7: Create the Vite entry `index.html` at the repo root**

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Woo-Portfolio</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 8: Create `src/styles/tokens.css` (blue–navy palette base)**

```css
:root {
  --color-bg: #f5f7fb;
  --color-bg-alt: #ffffff;
  --color-text: #1b2540;
  --color-text-muted: #4a5578;
  --color-accent: #2743a8;
  --color-accent-strong: #16214f;
  --color-border: #d7deef;
}

body.dark {
  --color-bg: #0b1020;
  --color-bg-alt: #131a30;
  --color-text: #e7ebfa;
  --color-text-muted: #a8b2d6;
  --color-accent: #5b7cf0;
  --color-accent-strong: #8fa5f5;
  --color-border: #232c4d;
}

body.light {
  --color-bg: #f5f7fb;
  --color-bg-alt: #ffffff;
  --color-text: #1b2540;
  --color-text-muted: #4a5578;
  --color-accent: #2743a8;
  --color-accent-strong: #16214f;
  --color-border: #d7deef;
}

body {
  margin: 0;
  background: var(--color-bg);
  color: var(--color-text);
  font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
}
```

- [ ] **Step 9: Create placeholder `src/App.tsx`**

```tsx
function App() {
  return <div>Portfolio rebuild in progress</div>
}

export default App
```

- [ ] **Step 10: Create `src/main.tsx`**

```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './styles/tokens.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

- [ ] **Step 11: Create `.gitignore`**

```
node_modules
dist
*.local
```

- [ ] **Step 12: Verify the toolchain**

Run: `npm run dev` — open the printed local URL, confirm "Portfolio rebuild in progress" renders.
Run: `npm run typecheck` — expect no errors.
Run: `npm run build` — expect a `dist/` folder to be produced with no errors.

- [ ] **Step 13: Commit**

```bash
git add -A
git commit -m "chore: archive legacy site, scaffold Vite/React/TS toolchain"
```

---

### Task 2: Router skeleton with placeholder pages

**Files:**
- Create: `src/pages/Home.tsx`
- Create: `src/pages/ProjectDetail.tsx`
- Create: `src/pages/NotFound.tsx`
- Modify: `src/main.tsx`
- Delete: `src/App.tsx` (replaced by routed pages)

**Interfaces:**
- Consumes: nothing new yet.
- Produces: `Home`, `ProjectDetail`, `NotFound` page components (default exports) mounted at `/`, `/:projectId`, `*` respectively — later tasks fill in their bodies without changing these signatures.

- [ ] **Step 1: Create placeholder `src/pages/Home.tsx`**

```tsx
export function Home() {
  return <div>Home page placeholder</div>
}
```

- [ ] **Step 2: Create placeholder `src/pages/ProjectDetail.tsx`**

```tsx
import { useParams } from 'react-router-dom'

export function ProjectDetail() {
  const { projectId } = useParams<{ projectId: string }>()
  return <div>Project detail placeholder for: {projectId}</div>
}
```

- [ ] **Step 3: Create `src/pages/NotFound.tsx`**

```tsx
import { Link } from 'react-router-dom'

export function NotFound() {
  return (
    <div>
      <p>페이지를 찾을 수 없습니다.</p>
      <Link to="/">홈으로 돌아가기</Link>
    </div>
  )
}
```

- [ ] **Step 4: Replace `src/main.tsx` with router wiring, delete `src/App.tsx`**

```bash
rm src/App.tsx
```

```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { ProjectDetail } from './pages/ProjectDetail'
import { NotFound } from './pages/NotFound'
import './styles/tokens.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:projectId" element={<ProjectDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
```

- [ ] **Step 5: Verify routing manually**

Run: `npm run dev`. Visit `/` → see "Home page placeholder". Visit `/anything` → see "Project detail placeholder for: anything". Visit `/nonexistent/nested/path` → still hits `/:projectId` (expected — Task 6 will redirect unknown ids to NotFound based on content lookup, not route shape).

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: add router skeleton with placeholder pages"
```

---

### Task 3: Dark mode context and toggle

**Files:**
- Create: `src/contexts/DarkModeContext.tsx`
- Create: `src/components/DarkModeToggle.tsx`
- Create: `src/components/DarkModeToggle.module.css`
- Modify: `src/main.tsx`

**Interfaces:**
- Produces: `DarkModeProvider` (wraps the app), `useDarkMode()` returning `{ mode: 'dark' | 'light', toggle: () => void }`, and `<DarkModeToggle />` component. Later components (`Header`) consume `<DarkModeToggle />`; nothing else needs `useDarkMode()` directly in this plan.

- [ ] **Step 1: Create `src/contexts/DarkModeContext.tsx`**

```tsx
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

type Mode = 'dark' | 'light'

interface DarkModeContextValue {
  mode: Mode
  toggle: () => void
}

const DarkModeContext = createContext<DarkModeContextValue | undefined>(undefined)

export function DarkModeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<Mode>(() => {
    const stored = localStorage.getItem('mode')
    return stored === 'light' ? 'light' : 'dark'
  })

  useEffect(() => {
    localStorage.setItem('mode', mode)
    document.body.classList.remove('dark', 'light')
    document.body.classList.add(mode)
  }, [mode])

  const toggle = () => setMode(current => (current === 'dark' ? 'light' : 'dark'))

  return <DarkModeContext.Provider value={{ mode, toggle }}>{children}</DarkModeContext.Provider>
}

export function useDarkMode() {
  const ctx = useContext(DarkModeContext)
  if (!ctx) throw new Error('useDarkMode must be used within a DarkModeProvider')
  return ctx
}
```

- [ ] **Step 2: Create `src/components/DarkModeToggle.module.css`**

```css
.toggle {
  background: none;
  border: 1px solid var(--color-border);
  border-radius: 999px;
  width: 2.25rem;
  height: 2.25rem;
  cursor: pointer;
  font-size: 1.1rem;
  color: var(--color-text);
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
```

- [ ] **Step 3: Create `src/components/DarkModeToggle.tsx`**

```tsx
import { useDarkMode } from '../contexts/DarkModeContext'
import styles from './DarkModeToggle.module.css'

export function DarkModeToggle() {
  const { mode, toggle } = useDarkMode()
  return (
    <button className={styles.toggle} onClick={toggle} aria-label="Toggle dark mode">
      {mode === 'dark' ? '🌙' : '☀️'}
    </button>
  )
}
```

- [ ] **Step 4: Wrap the router in `DarkModeProvider` in `src/main.tsx`**

```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { DarkModeProvider } from './contexts/DarkModeContext'
import { Home } from './pages/Home'
import { ProjectDetail } from './pages/ProjectDetail'
import { NotFound } from './pages/NotFound'
import './styles/tokens.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DarkModeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:projectId" element={<ProjectDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </DarkModeProvider>
  </StrictMode>,
)
```

- [ ] **Step 5: Temporarily render `<DarkModeToggle />` in `Home` to verify, then leave it (Task 5 relocates it into `Header`)**

Edit `src/pages/Home.tsx`:

```tsx
import { DarkModeToggle } from '../components/DarkModeToggle'

export function Home() {
  return (
    <div>
      <DarkModeToggle />
      <div>Home page placeholder</div>
    </div>
  )
}
```

- [ ] **Step 6: Verify manually**

Run: `npm run dev`. Click the toggle button — `document.body` class should switch between `dark`/`light` (check via DevTools). Refresh the page — the mode should persist (check `localStorage.getItem('mode')` in DevTools console).

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: add dark mode context and toggle"
```

---

### Task 4: Content model — frontmatter parser, project loader, profile data

**Files:**
- Create: `src/lib/frontmatter.ts`
- Create: `src/content/projects.ts`
- Create: `src/content/profile.ts`
- Create: `src/content/projects/daallcoffee.md`
- Create: `src/content/projects/hansel.md`

**Interfaces:**
- Produces:
  - `parseFrontmatter(raw: string): { data: Record<string, string>; body: string }`
  - `interface Project { id: string; title: string; summary: string; techStack: string[]; github?: string; website?: string; velog?: string; image?: string; hasDetailPage: boolean; body: string }`
  - `getAllProjects(): Project[]`
  - `getProject(id: string): Project | undefined`
  - `profile` object with `name`, `photo`, `bio`, `techStack: {category, items}[]`, `education: {school, detail, period}[]`, `licenses: string[]`
- Consumed by: Task 5 (`Home`, `ProjectCard`), Task 6 (`ProjectDetail`), Task 7 (`ProfileSection`, `ContactIcons`).

- [ ] **Step 1: Create `src/lib/frontmatter.ts`**

```ts
export interface ParsedMarkdown {
  data: Record<string, string>
  body: string
}

export function parseFrontmatter(raw: string): ParsedMarkdown {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/)
  if (!match) {
    return { data: {}, body: raw }
  }
  const [, frontmatterBlock, body] = match
  const data: Record<string, string> = {}
  for (const line of frontmatterBlock.split(/\r?\n/)) {
    const separatorIndex = line.indexOf(':')
    if (separatorIndex === -1) continue
    const key = line.slice(0, separatorIndex).trim()
    const value = line.slice(separatorIndex + 1).trim()
    data[key] = value
  }
  return { data, body: body.trim() }
}
```

- [ ] **Step 2: Create `src/content/projects/daallcoffee.md`**

```markdown
---
id: daallcoffee
title: DaCoffee (다올커피)
summary: 커피 원두, 머신, 카페용품을 파는 이커머스 사이트와 이걸 관리하는 별도 Admin 시스템으로 이루어진 개인 프로젝트
techStack: Java 17, Spring Boot 3.2.4, Spring Security, Spring Data JPA (Hibernate), Redis, MySQL, React (Vite)
github: https://github.com/woohojin/Coffee
website: 배포 준비중 (AWS EC2 → Oracle Cloud + Docker 이전 대기)
image: /img/daallcoffee.png
hasDetailPage: true
---

커피 원두, 머신, 카페용품을 파는 이커머스 사이트와 이걸 관리하는 별도 Admin 시스템으로 이루어진 개인 프로젝트입니다.

- GitHub: https://github.com/woohojin/Coffee

### 핵심 기능

- 회원가입/로그인, JWT 기반 인증 (Access Token + Refresh Token + Redis 블랙리스트)
- 상품(원두/머신/카페용품) 조회, 장바구니, 주문
- 주문 내역은 스냅샷 방식으로 저장해서 상품이 삭제돼도 이력이 남음
- 관리자 전용 상품/회원/주문 관리 시스템 (별도 React 앱으로 분리)

### 스택을 다섯 번 갈아엎으며 배운 것

처음부터 지금 형태로 만든 게 아니라, 중간에 스택을 몇 번 갈아엎으면서 왔습니다. "실무에서는 왜 이 기술을 쓰지?"라는 질문을 매번 스스로 던지고, 이전 방식의 한계를 직접 부딪혀보고 나서야 다음 단계로 넘어갔습니다.

| 시기 | 이전 | 이후 | 왜 바꿨는지 |
|---|---|---|---|
| 1차 | Spring Framework 5.3.24 (XML 설정) | Spring Boot 3.2.4 | Auto Configuration과 내장 WAS(Tomcat) 등 각종 편의 기능을 활용하기 위해 전환 |
| 2차 | JSP + Sitemesh | Thymeleaf | Spring Boot 전환으로 Spring 버전이 올라가면서 Sitemesh가 호환이 안 돼서 Thymeleaf로 대체 |
| 3차 | MyBatis | JPA (Hibernate) | 테이블 구조가 바뀔 때마다 SQL을 일일이 수정해야 하는 부담이 컸고, JPA는 메서드 시그니처 자체가 쿼리로 변환돼서 오타나 잘못된 필드 참조를 실제 쿼리 실행 전에 걸러낼 수 있어서 전환 |
| 4차 | Thymeleaf | React (Vite) | 화면 렌더링 책임이 백엔드 프로젝트 안에 같이 있어서 뷰 수정할 때마다 서버까지 재배포해야 했고, 프론트와 백엔드를 독립적으로 개발·배포할 수 있도록 React로 분리 |
| 5차 | 세션 기반 인증 | JWT (Access+Refresh) + Redis | 세션은 서버가 상태를 들고 있어야 해서 서버를 여러 대로 늘리면 세션 공유 문제가 생기는데, Access Token은 서버 상태 없이 검증 가능해서 확장성을 고려해서 전환 |

## 아키텍처

![DaCoffee 아키텍처](/img/dacoffee_architecture.png)

Controller-Service-Repository로 계층을 나눴고, JWT는 Access Token(짧은 수명)과 Refresh Token(HttpOnly 쿠키에 저장, Redis에서 관리)을 나눠서 씁니다. 관리자 페이지는 일반 사용자 화면과 완전히 분리해서 별도 React 앱으로 배포합니다.

## 데이터베이스 설계

[ERD 보기](https://www.erdcloud.com/d/izXWq5ayXDjphw82k)

## 기술적으로 고민했던 부분들

**주문 내역을 외래키(FK)로 상품을 참조하는 대신, 스냅샷 방식으로 저장한 이유**
상품이 나중에 삭제되거나 가격이 바뀌어도, 과거 주문 기록은 그때 그 가격/이름 그대로 남아있어야 한다고 생각했습니다. 그래서 FK로 상품을 참조하는 대신, 주문 시점의 상품명/가격/단위를 그대로 복사해서 저장하는 방식을 선택했습니다.

**결제 금액 위변조를 막기 위한 서버 검증 구조**
결제 페이지에 진입하는 시점에 클라이언트가 보낸 금액을 그대로 믿지 않고, 서버가 장바구니 데이터를 기준으로 직접 금액을 계산해서 Redis에 임시로 저장해둡니다. 실제 결제가 완료된 시점에 토스에서 돌아온 금액과 이 값을 대조해서, 일치하지 않으면 결제 자체를 거부하도록 설계했습니다. 클라이언트가 중간에 개발자 도구로 요청을 조작하더라도 서버 쪽에서 걸러지도록 만든 구조입니다.

**Admin을 별도 React 앱으로 뗀 이유**
일반 사용자 화면과 관리자 화면을 같은 프로젝트 안에 두면 권한 관리나 배포가 계속 꼬일 것 같아서, 처음부터 별도 프로젝트(`frontend-admin`)로 분리했습니다.

## 트러블슈팅

### 비로그인 상태에서 무한 리다이렉트에 빠지는 문제

로그인 안 한 상태로 아무 페이지나 들어가면 화면이 계속 새로고침되면서 멈추는 버그를 발견했습니다.

원인을 따라가보니, 로그인 여부를 확인하려고 `/api/member/me`를 호출하는데 비로그인 상태라 401이 뜨고, 이걸 axios 인터셉터가 받아서 `/api/auth/refresh`를 호출했다가 실패하면 로그인 페이지로 강제 이동시키는 구조였습니다. 문제는 이 강제 이동이 페이지를 리로드시키고, 그러면 로그인 여부를 확인하는 로직이 다시 처음부터 실행되면서 같은 흐름이 무한히 반복된 거였습니다.

사실 이 버그는 원래부터 코드에 있었는데, 그 전까지는 refresh API가 실패해도 항상 200을 반환하던 다른 버그 때문에 이 리다이렉트 코드가 한 번도 실행된 적이 없었습니다. 그 버그를 먼저 고치고 나서야 이 문제가 실제로 터진 겁니다. 프론트(인터셉터), Security 설정(permitAll), 컨트롤러(비로그인 응답 처리) 세 군데를 같이 손봐서 해결했습니다.

### CSP 정책 때문에 주소 검색 팝업이 막힌 문제

회원가입 화면에서 주소 검색 버튼을 누르면 팝업이 아예 안 뜨는 문제가 있었습니다. Content-Security-Policy 설정에서 팝업이 실제로 로드되는 도메인이 빠져 있었던 게 1차 원인이었고, 이걸 고치고 나니 이번엔 다른 도메인이 막히는 에러가 새로 떴습니다. 확인해보니 카카오가 다음(Daum)을 인수하면서 우편번호 검색 서비스 도메인이 옮겨간 상황이었고, 기존 CSP 설정은 예전 도메인 기준으로만 짜여 있었던 거였습니다. 두 도메인을 전부 허용하도록 정책을 고쳐서 해결했습니다.

### JWT Refresh Token이 중복으로 발급되던 문제

Access Token이 만료되는 시점에 여러 화면에서 동시에 401이 뜨면서, Refresh Token 재발급 요청이 한꺼번에 여러 번 나가는 문제가 있었습니다. 겉으로 보이는 증상은 "재발급이 여러 번 호출된다"였지만, 실제 원인은 Header랑 CartPage가 각자 따로 같은 API를 호출하고 있던 구조 문제였습니다. axios 인터셉터에 재발급 요청이 하나만 나가도록 대기열을 걸고, 근본 원인이었던 중복 호출은 전역 상태로 데이터를 공유하도록 바꿔서 없앴습니다.

### JPA에서 LAZY 로딩된 데이터를 그대로 반환하다 생긴 오류

연관된 엔티티를 포함해서 그대로 JSON으로 응답하려니 직렬화 과정에서 오류가 났습니다. LAZY로 설정된 연관관계는 실제 데이터가 아니라 Hibernate 프록시 객체를 참조하는데, 이걸 그대로 직렬화하려다 실패한 거였습니다. Entity를 그대로 응답에 쓰지 않고, 필요한 값만 담은 DTO로 변환해서 반환하도록 바꿔서 해결했습니다.

## 느낀 점

3년 가까이 이 프로젝트 하나를 붙잡고 있었던 건, 완성을 서두르기보다 왜 이렇게 만들어야 하는지 이해하는 데 시간을 더 썼기 때문입니다. 그 과정에서 스택을 다섯 번 정도 갈아엎으면서, 각 방식의 장단점을 이론이 아니라 직접 겪으면서 알게 됐습니다.
```

> Note: `/img/dacoffee_architecture.png` does not exist yet — the image tag will render broken until that asset is added. That's expected for this task; flag it to the user as a follow-up content asset, don't fabricate the image.

- [ ] **Step 3: Create `src/content/projects/hansel.md`**

```markdown
---
id: hansel
title: Hanselcrumb (실종동물 정보 공유 사이트)
summary: 사용자끼리 개인이 보호하고 있거나 실종된 애완동물 정보를 공유하여 실종된 애완 동물을 찾을 수 있도록 도움을 주는 사이트
techStack: JAVA, SPRING, ORACLE, JSP, CSS, JS
github: https://github.com/woohojin/hanselCrumb
velog: https://velog.io/@woohojin/Spring-프로젝트-AWS에서-배포하기-1
image: /img/hanselcrumb.png
hasDetailPage: false
---
```

- [ ] **Step 4: Create `src/content/projects.ts`**

```ts
import { parseFrontmatter } from '../lib/frontmatter'

export interface Project {
  id: string
  title: string
  summary: string
  techStack: string[]
  github?: string
  website?: string
  velog?: string
  image?: string
  hasDetailPage: boolean
  body: string
}

const modules = import.meta.glob('./projects/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>

function toProject(id: string, raw: string): Project {
  const { data, body } = parseFrontmatter(raw)
  return {
    id,
    title: data.title ?? id,
    summary: data.summary ?? '',
    techStack: data.techStack ? data.techStack.split(',').map(s => s.trim()) : [],
    github: data.github || undefined,
    website: data.website || undefined,
    velog: data.velog || undefined,
    image: data.image || undefined,
    hasDetailPage: data.hasDetailPage === 'true',
    body,
  }
}

let cache: Project[] | undefined

export function getAllProjects(): Project[] {
  if (!cache) {
    cache = Object.entries(modules).map(([path, raw]) => {
      const id = path.split('/').pop()!.replace(/\.md$/, '')
      return toProject(id, raw)
    })
  }
  return cache
}

export function getProject(id: string): Project | undefined {
  return getAllProjects().find(project => project.id === id)
}
```

- [ ] **Step 5: Create `src/content/profile.ts`**

```ts
export interface TechGroup {
  category: string
  items: string[]
}

export interface EducationItem {
  school: string
  detail: string
  period: string
}

export const profile = {
  name: '우호진',
  photo: '/img/woohojin.jpg',
  bio: 'Java/Spring 기반 백엔드 개발자를 목표로 하고 있습니다. 기술을 그냥 가져다 쓰는 게 아니라, 왜 이 방식을 써야 하는지 이해하고 넘어가려고 하는 편입니다. 하나의 프로젝트를 여러 기술 스택으로 갈아엎어보면서, 각 방식의 차이를 직접 몸으로 겪어본 경험이 강점입니다.',
  techStack: [
    {
      category: 'Backend',
      items: ['Java 17', 'Spring Boot 3.2.4', 'Spring Security', 'Spring Data JPA (Hibernate)', 'Redis', 'MySQL', 'Maven'],
    },
    {
      category: 'Frontend',
      items: ['React (Vite)', 'Axios', 'React Router', 'Context API'],
    },
    {
      category: 'Infra / Tools',
      items: ['Oracle Cloud + Docker (배포 준비중)', 'Git', 'IntelliJ IDEA'],
    },
  ] as TechGroup[],
  education: [
    { school: '정석항공과학고등학교', detail: '항공전자과 졸업', period: '2017.03 ~ 2020.02' },
    { school: '동원대학교', detail: '컴퓨터영상디자인과 졸업', period: '2020.03 ~ 2022.02' },
    { school: '[현업 전문가 멘토링]', detail: '자바(JAVA)기반 백엔드 & AI 빅데이터 분석 양성과정', period: '2022.05.25 ~ 2022.11.09' },
  ] as EducationItem[],
  licenses: ['전자계산기기능사', '무선설비기능사'],
  contact: {
    github: 'https://github.com/woohojin',
    email: 'hojin0624@gmail.com',
    velog: 'https://velog.io/@woohojin',
  },
}
```

- [ ] **Step 6: Verify the content model loads correctly**

Temporarily add this import and call inside `Home()` in `src/pages/Home.tsx`, before the `return` (this file still has the Task 3 scratch content — full replacement happens in Task 5, so this is scratch-only, don't commit it as-is):

```tsx
import { getAllProjects } from '../content/projects'
// ...inside Home(), before return:
console.log(getAllProjects())
```

Run: `npm run dev`, open the browser console, confirm two project objects appear with `id: 'daallcoffee'` (`hasDetailPage: true`, non-empty `body`) and `id: 'hansel'` (`hasDetailPage: false`, empty `body`).

Then revert this scratch edit entirely so the working tree is clean before committing (the import must not be left in, or `noUnusedLocals` will fail `tsc`/`npm run build` since nothing else in the file uses it yet):

```bash
git checkout -- src/pages/Home.tsx
```

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: add frontmatter parser, project content, and profile data"
```

---

### Task 5: Header, Intro, ProjectCard, and Home page assembly

**Files:**
- Create: `src/components/Header.tsx`
- Create: `src/components/Header.module.css`
- Create: `src/components/Intro.tsx`
- Create: `src/components/Intro.module.css`
- Create: `src/components/ProjectCard.tsx`
- Create: `src/components/ProjectCard.module.css`
- Modify: `src/pages/Home.tsx`
- Create: `src/pages/Home.module.css`

**Interfaces:**
- Consumes: `useDarkMode`/`DarkModeToggle` (Task 3), `getAllProjects`/`Project` (Task 4).
- Produces: `<Header />`, `<Intro />`, `<ProjectCard project={Project} />` — `Header` is reused by `ProjectDetail` in Task 6.

- [ ] **Step 1: Create `src/components/Header.module.css`**

```css
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid var(--color-border);
}

.logo {
  font-weight: 700;
  font-size: 1.25rem;
  color: var(--color-accent-strong);
  text-decoration: none;
}

.nav {
  display: flex;
  gap: 1.25rem;
}

.nav a {
  color: var(--color-text-muted);
  text-decoration: none;
}

.nav a:hover {
  color: var(--color-accent);
}
```

- [ ] **Step 2: Create `src/components/Header.tsx`**

```tsx
import { Link } from 'react-router-dom'
import { DarkModeToggle } from './DarkModeToggle'
import styles from './Header.module.css'

export function Header() {
  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo}>W</Link>
      <nav className={styles.nav}>
        <Link to="/#projects">Project</Link>
        <Link to="/#profile">Profile</Link>
      </nav>
      <DarkModeToggle />
    </header>
  )
}
```

- [ ] **Step 3: Create `src/components/Intro.module.css`**

```css
.hero {
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  text-align: center;
  background: linear-gradient(180deg, var(--color-bg-alt), var(--color-bg));
}

.name {
  font-size: clamp(2.5rem, 8vw, 5rem);
  letter-spacing: 0.05em;
  color: var(--color-accent-strong);
  margin: 0;
  animation: rise 0.8s ease-out both;
}

.first {
  color: var(--color-accent);
}

.tagline {
  color: var(--color-text-muted);
  font-size: 1.1rem;
  margin: 0;
  animation: rise 0.8s ease-out 0.15s both;
}

.cta {
  padding: 0.75rem 1.75rem;
  border-radius: 999px;
  border: 1px solid var(--color-accent);
  background: transparent;
  color: var(--color-accent-strong);
  cursor: pointer;
  font-size: 1rem;
  animation: rise 0.8s ease-out 0.3s both;
}

.cta:hover {
  background: var(--color-accent);
  color: var(--color-bg-alt);
}

@keyframes rise {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

- [ ] **Step 4: Create `src/components/Intro.tsx`**

```tsx
import styles from './Intro.module.css'

export function Intro() {
  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className={styles.hero}>
      <h1 className={styles.name}>
        <span className={styles.first}>WOO</span>HOJIN
      </h1>
      <p className={styles.tagline}>Backend Developer</p>
      <button className={styles.cta} onClick={scrollToProjects}>
        See my Portfolio
      </button>
    </section>
  )
}
```

- [ ] **Step 5: Create `src/components/ProjectCard.module.css`**

```css
.link {
  text-decoration: none;
  color: inherit;
}

.card {
  border: 1px solid var(--color-border);
  border-radius: 0.75rem;
  padding: 1.25rem;
  background: var(--color-bg-alt);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.image {
  width: 100%;
  border-radius: 0.5rem;
  object-fit: cover;
  aspect-ratio: 16 / 9;
}

.title {
  margin: 0;
  color: var(--color-accent-strong);
}

.summary {
  margin: 0;
  color: var(--color-text-muted);
  font-size: 0.95rem;
}

.techList {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  padding: 0;
  margin: 0;
  font-size: 0.8rem;
}

.techList li {
  border: 1px solid var(--color-border);
  border-radius: 999px;
  padding: 0.15rem 0.6rem;
  color: var(--color-text-muted);
}

.more {
  color: var(--color-accent);
  font-size: 0.9rem;
}
```

- [ ] **Step 6: Create `src/components/ProjectCard.tsx`**

```tsx
import { Link } from 'react-router-dom'
import type { Project } from '../content/projects'
import styles from './ProjectCard.module.css'

export function ProjectCard({ project }: { project: Project }) {
  const card = (
    <div className={styles.card}>
      {project.image && <img className={styles.image} src={project.image} alt="" />}
      <h3 className={styles.title}>{project.title}</h3>
      <p className={styles.summary}>{project.summary}</p>
      <ul className={styles.techList}>
        {project.techStack.map(tech => (
          <li key={tech}>{tech}</li>
        ))}
      </ul>
      {project.hasDetailPage && <span className={styles.more}>자세히 보기 →</span>}
    </div>
  )

  if (!project.hasDetailPage) {
    return card
  }

  return (
    <Link to={`/${project.id}`} className={styles.link}>
      {card}
    </Link>
  )
}
```

- [ ] **Step 7: Create `src/pages/Home.module.css`**

```css
.projects {
  padding: 3rem 1.5rem;
  scroll-margin-top: 2rem;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  max-width: 960px;
  margin: 0 auto;
}

.profile {
  padding: 3rem 1.5rem;
  scroll-margin-top: 2rem;
}
```

- [ ] **Step 8: Replace `src/pages/Home.tsx` with the full assembly (remove the Task 3/4 scratch code)**

```tsx
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Header } from '../components/Header'
import { Intro } from '../components/Intro'
import { ProjectCard } from '../components/ProjectCard'
import { getAllProjects } from '../content/projects'
import styles from './Home.module.css'

export function Home() {
  const location = useLocation()
  const projects = getAllProjects()

  useEffect(() => {
    if (location.hash) {
      document.querySelector(location.hash)?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [location.hash])

  return (
    <div>
      <Header />
      <Intro />
      <section id="projects" className={styles.projects}>
        <h2>Project</h2>
        <div className={styles.grid}>
          {projects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>
      <section id="profile" className={styles.profile}>
        <h2>Profile</h2>
      </section>
    </div>
  )
}
```

(The `#profile` section body is filled in by Task 7 — left as a heading-only placeholder here so this task's deliverable, the project list, is independently checkable.)

- [ ] **Step 9: Verify manually**

Run: `npm run dev`. Confirm: intro renders with name/tagline/button; clicking the button scrolls to the Project section; two project cards render (daallcoffee with image + "자세히 보기", hansel without); clicking the daallcoffee card navigates to `/daallcoffee` (still showing the Task 2 placeholder text — full detail rendering comes in Task 6); dark mode toggle in the header still works.

- [ ] **Step 10: Commit**

```bash
git add -A
git commit -m "feat: build Home page with intro, header, and project cards"
```

---

### Task 6: Project detail page (Markdown rendering)

**Files:**
- Modify: `src/pages/ProjectDetail.tsx`
- Create: `src/pages/ProjectDetail.module.css`

**Interfaces:**
- Consumes: `getProject` (Task 4), `<Header />` (Task 5).
- Produces: fully rendered `/:projectId` route; redirects to `/` (via `NotFound`-equivalent, see below) when the id doesn't resolve to a project with `hasDetailPage: true`.

- [ ] **Step 1: Create `src/pages/ProjectDetail.module.css`**

```css
.content {
  max-width: 720px;
  margin: 0 auto;
  padding: 2rem 1.5rem 4rem;
  line-height: 1.7;
}

.back {
  display: inline-block;
  margin-bottom: 1.5rem;
  color: var(--color-accent);
  text-decoration: none;
}

.content table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
}

.content th,
.content td {
  border: 1px solid var(--color-border);
  padding: 0.5rem;
  text-align: left;
}

.content img {
  max-width: 100%;
  border-radius: 0.5rem;
}
```

- [ ] **Step 2: Replace `src/pages/ProjectDetail.tsx`**

```tsx
import { useParams, Link, Navigate } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { getProject } from '../content/projects'
import { Header } from '../components/Header'
import styles from './ProjectDetail.module.css'

export function ProjectDetail() {
  const { projectId } = useParams<{ projectId: string }>()
  const project = projectId ? getProject(projectId) : undefined

  if (!project || !project.hasDetailPage) {
    return <Navigate to="/" replace />
  }

  return (
    <div>
      <Header />
      <main className={styles.content}>
        <Link to="/#projects" className={styles.back}>
          ← 목록으로
        </Link>
        <h1>{project.title}</h1>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{project.body}</ReactMarkdown>
      </main>
    </div>
  )
}
```

- [ ] **Step 3: Verify manually**

Run: `npm run dev`. Visit `/daallcoffee` directly — confirm the full write-up renders: headings, the 5-migration table with borders, the troubleshooting sections, and that the bare GitHub/ERD URLs in the text render as clickable links (remark-gfm autolinks). Visit `/hansel` — should redirect to `/` (since `hasDetailPage: false`). Visit `/does-not-exist` — should redirect to `/`. Click "← 목록으로" — returns to Home at the projects section.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: render project detail pages from Markdown content"
```

---

### Task 7: Profile section and contact icons

**Files:**
- Create: `src/components/ProfileSection.tsx`
- Create: `src/components/ProfileSection.module.css`
- Create: `src/components/ContactIcons.tsx`
- Create: `src/components/ContactIcons.module.css`
- Modify: `src/pages/Home.tsx`

**Interfaces:**
- Consumes: `profile` (Task 4).
- Produces: `<ProfileSection />`, `<ContactIcons />`, both used only in `Home`.

- [ ] **Step 1: Create `src/components/ContactIcons.module.css`**

```css
.list {
  list-style: none;
  display: flex;
  gap: 1rem;
  padding: 0;
  margin: 1rem 0;
}

.list a,
.list button {
  border: none;
  background: none;
  font: inherit;
  color: var(--color-accent);
  cursor: pointer;
  text-decoration: none;
}

.list a:hover,
.list button:hover {
  color: var(--color-accent-strong);
}
```

- [ ] **Step 2: Create `src/components/ContactIcons.tsx`**

```tsx
import { profile } from '../content/profile'
import styles from './ContactIcons.module.css'

export function ContactIcons() {
  const copyEmail = async () => {
    await navigator.clipboard.writeText(profile.contact.email)
    alert('클립보드에 텍스트가 복사되었습니다.')
  }

  return (
    <ul className={styles.list}>
      <li>
        <a href={profile.contact.github} target="_blank" rel="noreferrer">
          GitHub
        </a>
      </li>
      <li>
        <button onClick={copyEmail}>Email</button>
      </li>
      <li>
        <a href={profile.contact.velog} target="_blank" rel="noreferrer">
          Velog
        </a>
      </li>
    </ul>
  )
}
```

- [ ] **Step 3: Create `src/components/ProfileSection.module.css`**

```css
.wrap {
  max-width: 720px;
  margin: 0 auto;
}

.photo {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
}

.bio {
  color: var(--color-text-muted);
  line-height: 1.7;
}

.block {
  margin-top: 1.5rem;
}

.block h3 {
  color: var(--color-accent-strong);
  margin-bottom: 0.5rem;
}

.block ul {
  padding-left: 1.25rem;
  margin: 0;
  color: var(--color-text-muted);
}
```

- [ ] **Step 4: Create `src/components/ProfileSection.tsx`**

```tsx
import { profile } from '../content/profile'
import { ContactIcons } from './ContactIcons'
import styles from './ProfileSection.module.css'

export function ProfileSection() {
  return (
    <div className={styles.wrap}>
      <img className={styles.photo} src={profile.photo} alt={profile.name} />
      <ContactIcons />
      <p className={styles.bio}>{profile.bio}</p>

      <div className={styles.block}>
        <h3>Tech Stack</h3>
        {profile.techStack.map(group => (
          <p key={group.category}>
            <strong>{group.category}</strong>: {group.items.join(', ')}
          </p>
        ))}
      </div>

      <div className={styles.block}>
        <h3>Education</h3>
        <ul>
          {profile.education.map(item => (
            <li key={item.school}>
              {item.school} — {item.detail} ({item.period})
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.block}>
        <h3>License</h3>
        <ul>
          {profile.licenses.map(license => (
            <li key={license}>{license}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
```

- [ ] **Step 5: Wire `ProfileSection` into `src/pages/Home.tsx`**

```tsx
import { ProfileSection } from '../components/ProfileSection'
// ...
      <section id="profile" className={styles.profile}>
        <h2>Profile</h2>
        <ProfileSection />
      </section>
```

- [ ] **Step 6: Verify manually**

Run: `npm run dev`. Scroll (or click Header's "Profile" link) to the Profile section — confirm photo, bio paragraph, GitHub/Email/Velog links (Email copies to clipboard and shows the alert), tech stack by category, education list, and license list all render with the correct text from `profile.ts`.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: add profile section and contact icons to Home"
```

---

### Task 8: GitHub Pages deployment

**Files:**
- Create: `public/404.html`
- Modify: `index.html`
- Create: `.github/workflows/deploy.yml`

**Interfaces:**
- Produces: a `gh-pages`-branch deployment pipeline triggered on push to `main`. No app-code interfaces — this task is infra-only.

- [ ] **Step 1: Create `public/404.html` (SPA redirect trick for GitHub Pages)**

```html
<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <script>
      // Single Page Apps for GitHub Pages
      // https://github.com/rafgraph/spa-github-pages
      var segmentCount = 1;
      var l = window.location;
      l.replace(
        l.protocol + '//' + l.hostname + (l.port ? ':' + l.port : '') +
        l.pathname.split('/').slice(0, 1 + segmentCount).join('/') + '/?/' +
        l.pathname.slice(1).split('/').slice(segmentCount).join('/').replace(/&/g, '~and~') +
        (l.search ? '&' + l.search.slice(1).replace(/&/g, '~and~') : '') +
        l.hash
      );
    </script>
  </head>
  <body></body>
</html>
```

- [ ] **Step 2: Add the redirect-decoding script to `index.html`'s `<head>`, before the module script**

```html
<script>
  (function (l) {
    if (l.search[1] === '/') {
      var decoded = l.search
        .slice(1)
        .split('&')
        .map(function (s) {
          return s.replace(/~and~/g, '&')
        })
        .join('?')
      window.history.replaceState(null, '', l.pathname.slice(0, -1) + decoded + l.hash)
    }
  })(window.location)
</script>
```

- [ ] **Step 3: Create `.github/workflows/deploy.yml`**

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: write

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
      - run: npm ci
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

- [ ] **Step 4: Verify locally before relying on CI**

Run: `npm run build && npm run preview`. Visit the preview URL's root, navigate to a project card, refresh on that project's URL — confirm it still loads (this exercises the same redirect mechanism GitHub Pages will use, though `vite preview` doesn't serve `404.html` for arbitrary paths the same way GitHub Pages does — treat this as a smoke check of the `index.html` script, not full parity).

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "chore: add GitHub Pages deployment workflow and SPA redirect"
```

- [ ] **Step 6: Manual one-time step for the repo owner (not automatable from here)**

After this commit is pushed and the Actions workflow has run once (creating the `gh-pages` branch): go to the GitHub repo's **Settings → Pages**, set **Source** to "Deploy from a branch", branch `gh-pages`, folder `/ (root)`. This is a live GitHub settings change outside the repo — do it yourself, it isn't part of any task here.

---

### Task 9: Remove the archived legacy site

**Files:**
- Delete: `legacy/`

**Interfaces:**
- None — pure cleanup, no code depends on `legacy/`.

- [ ] **Step 1: Confirm the new site has full parity first**

Before deleting anything, manually re-check against the original `legacy/index.html` content: profile photo, bio, both project cards, education, license, GitHub/Email/Velog links all present and correct in the new site (this should already be true after Tasks 5–7, but double-check side-by-side once here).

- [ ] **Step 2: Remove the legacy folder**

```bash
git rm -r legacy
```

- [ ] **Step 3: Verify the build still succeeds**

Run: `npm run build` — should succeed with no references to `legacy/` anywhere (there shouldn't be any; it was never imported by the Vite app).

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "chore: remove archived legacy vanilla site"
```

---

## Follow-ups not covered by this plan

- `dacoffee_architecture.png` referenced in `daallcoffee.md` doesn't exist yet — add it to `public/img/` whenever the diagram is ready; the broken image reference is harmless until then.
- GitHub repo Settings → Pages source selection (Task 8, Step 6) must be done manually by the repo owner.
- Exact visual polish (spacing, animation timing, responsive breakpoints) beyond the blue–navy tone constraint is left to implementation-time judgment, per the spec's "Open items deferred to implementation."
