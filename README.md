# CHI GUIDA STRONZI? 🚗💀

Web app per decidere chi guida ogni settimana attraverso un sistema di voto sociale.

## 🎯 Caratteristiche

- **6 membri fissi** con foto precaricate
- **Sistema di voti**: ogni membro distribuisce 10 punti agli altri 5
- **Modalità Assemblea**: una persona inserisce tutti i voti
- **Il guidatore è chi riceve MENO punti**
- **Gestione pareggi**: selezione casuale tra i pareggiati
- **Animazione reveal** epica con "GUIDA COJONE"
- **Storico completo** salvato in LocalStorage
- **Dark mode** con tema meme aggressivo

## 📋 Requisiti

- Node.js 18+ installato
- npm o yarn

## 🚀 Installazione e Avvio Locale

### 1. Clona o scarica il progetto

```bash
cd chi-guida-stronzi
```

### 2. Installa le dipendenze

```bash
npm install
```

### 3. IMPORTANTE: Aggiungi le foto dei membri

Crea la cartella `public/avatars/` e aggiungi le seguenti foto:

```
public/
  avatars/
    daddi.jpg
    richi.jpg
    tommi.jpg
    ciccio.jpg
    matto.jpg
    lino.jpg
```

**Nota**: Se le foto non esistono, verrà mostrato un placeholder con emoji 😎

### 4. Avvia il server di sviluppo

```bash
npm run dev
```

### 5. Apri il browser

Vai su [http://localhost:3000](http://localhost:3000)

## 🌐 Deploy su Vercel (tramite GitHub)

### 1. Crea un repository GitHub

```bash
git init
git add .
git commit -m "Initial commit - Chi Guida Stronzi"
git branch -M main
git remote add origin https://github.com/TUO-USERNAME/chi-guida-stronzi.git
git push -u origin main
```

### 2. Pusha le foto

Assicurati che la cartella `public/avatars/` con le foto sia committata:

```bash
git add public/avatars/*
git commit -m "Add member avatars"
git push
```

### 3. Deploy su Vercel

1. Vai su [vercel.com](https://vercel.com)
2. Clicca su "Add New Project"
3. Importa il repository GitHub
4. Vercel rileverà automaticamente Next.js
5. Clicca su "Deploy"

### 4. Configurazione (opzionale)

Vercel configurerà automaticamente tutto. Non serve nessuna variabile d'ambiente.

## 📁 Struttura del Progetto

```
chi-guida-stronzi/
├── app/
│   ├── components/
│   │   ├── History.tsx          # Visualizza storico settimane
│   │   ├── MemberAvatar.tsx     # Avatar membro con foto
│   │   ├── ResultReveal.tsx     # Animazione reveal guidatore
│   │   └── VoteMatrix.tsx       # Matrice di votazione 6x6
│   ├── globals.css              # Stili globali + animazioni
│   ├── layout.tsx               # Layout root
│   ├── page.tsx                 # Pagina principale
│   ├── storage.ts               # Gestione localStorage
│   ├── types.ts                 # TypeScript types
│   └── utils.ts                 # Funzioni calcolo punteggi
├── public/
│   └── avatars/                 # Foto membri (da aggiungere)
│       ├── daddi.jpg
│       ├── richi.jpg
│       ├── tommi.jpg
│       ├── ciccio.jpg
│       ├── matto.jpg
│       └── lino.jpg
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.js
├── next.config.js
└── README.md
```

## 🎮 Come Usare l'App

### Votazione

1. Inserisci il nome della settimana (es. "Settimana 7 - 2025")
2. Compila la matrice 6x6:
   - Ogni riga = una persona che dà punti
   - Ogni colonna = chi riceve punti
   - Diagonale disabilitata (non si vota sé stessi)
3. Assicurati che ogni riga sommi esattamente a 10
4. Quando tutte le 6 righe sono valide (✅ 6/6 VALIDE), clicca **"DECIDI CHI GUIDA"**

### Risultato

- Animazione loading con nomi che scorrono
- **REVEAL FINALE**: foto + "GUIDA COJONE" + nome
- In caso di pareggio: viene mostrato l'avviso prima del reveal
- Punteggi finali di tutti i membri

### Gestione Settimane

- **NUOVA SETTIMANA**: resetta solo la matrice voti, mantiene lo storico
- **RESET TOTALE**: cancella tutto (richiede conferma)

## 🎨 Personalizzazione

### Modificare i membri

Edita `app/storage.ts`:

```typescript
export const DEFAULT_MEMBERS: Member[] = [
  { id: 'nome1', name: 'nome1', avatar: '/avatars/nome1.jpg' },
  // ... aggiungi altri membri
];
```

### Cambiare colori

Edita `tailwind.config.ts` e `app/globals.css`

### Modificare animazioni

Guarda `app/components/ResultReveal.tsx` per timing e effetti

## 🔧 Stack Tecnologico

- **Next.js 14** (App Router)
- **TypeScript** (strict mode)
- **Tailwind CSS** (styling + animazioni)
- **LocalStorage** (persistenza dati)
- **No backend, no database**

## 📝 Note Tecniche

- Tutti i dati sono salvati in LocalStorage del browser
- I dati persistono tra sessioni
- Nessuna chiamata API esterna
- Funziona offline dopo il primo caricamento
- TypeScript strict mode per type safety
- Funzioni pure separate per logica di calcolo

## 🐛 Troubleshooting

### Le foto non si vedono
- Verifica che i file siano in `public/avatars/`
- Controlla i nomi esatti: `daddi.jpg`, `richi.jpg`, etc.
- Riavvia il dev server

### I voti non si salvano
- Controlla la console browser per errori
- Verifica che localStorage non sia disabilitato
- Prova a resettare lo storico

### L'app non si avvia
```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

## 📄 Licenza

Uso personale. Divertiti! 🚗💀
