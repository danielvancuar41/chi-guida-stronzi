# 🗂️ ALBERO COMPLETO DEL PROGETTO

```
chi-guida-stronzi/
│
├── 📦 CONFIGURAZIONE
│   ├── package.json                 # Dipendenze e script npm
│   ├── tsconfig.json               # Configurazione TypeScript
│   ├── tailwind.config.ts          # Configurazione Tailwind CSS + animazioni
│   ├── postcss.config.js           # Configurazione PostCSS
│   ├── next.config.js              # Configurazione Next.js
│   ├── .gitignore                  # File da ignorare in Git
│   └── README.md                   # Istruzioni complete
│
├── 📱 APP (Next.js App Router)
│   ├── layout.tsx                  # Layout root con metadata
│   ├── page.tsx                    # ⭐ PAGINA PRINCIPALE - logica completa
│   ├── globals.css                 # Stili globali + animazioni custom
│   │
│   ├── 🧩 COMPONENTS
│   │   ├── VoteMatrix.tsx          # Matrice 6x6 votazione
│   │   ├── MemberAvatar.tsx        # Avatar membro con foto
│   │   ├── ResultReveal.tsx        # ⭐ Animazione reveal "GUIDA COJONE"
│   │   └── History.tsx             # Storico settimane
│   │
│   ├── 📊 LOGICA & DATI
│   │   ├── types.ts                # TypeScript interfaces
│   │   ├── utils.ts                # ⭐ Funzioni calcolo punteggi
│   │   └── storage.ts              # ⭐ Gestione localStorage
│   │
│
└── 🖼️ PUBLIC
    └── avatars/                    # ⚠️ DEVI AGGIUNGERE LE FOTO QUI!
        ├── README.md               # Istruzioni foto
        ├── daddi.jpg               # ⚠️ DA AGGIUNGERE
        ├── richi.jpg               # ⚠️ DA AGGIUNGERE
        ├── tommi.jpg               # ⚠️ DA AGGIUNGERE
        ├── ciccio.jpg              # ⚠️ DA AGGIUNGERE
        ├── matto.jpg               # ⚠️ DA AGGIUNGERE
        └── lino.jpg                # ⚠️ DA AGGIUNGERE
```

## 🎯 FILE CHIAVE

### `app/page.tsx` - CUORE DELL'APP
- Gestisce tutto lo stato (membri, voti, storico)
- Carica/salva da localStorage
- Logica completa votazione
- Render componenti

### `app/utils.ts` - LOGICA PURA
- `calculateTotalScores()` - Somma punti ricevuti
- `determineDriver()` - Trova chi ha MENO punti + gestione pareggio
- `isRowValid()` - Valida somma = 10
- `areAllRowsValid()` - Check tutte le righe

### `app/storage.ts` - PERSISTENZA
- `loadFromStorage()` - Carica da localStorage
- `saveToStorage()` - Salva in localStorage
- `addWeekResult()` - Aggiunge settimana allo storico
- `resetAllData()` - Reset totale
- `DEFAULT_MEMBERS` - Array membri iniziali

### `app/components/ResultReveal.tsx` - ANIMAZIONE
- Fase 1: Loading con flicker nomi
- Fase 2: REVEAL con "GUIDA COJONE"
- Gestione pareggio
- Punteggi finali

### `app/components/VoteMatrix.tsx` - TABELLA VOTI
- Matrice 6x6 interattiva
- Diagonale disabilitata
- Validazione live (rosso/verde)
- Indicatore somma per riga

## 📝 CONTEGGIO TOTALE FILE

✅ 15 file TypeScript/TSX
✅ 1 file CSS
✅ 6 file configurazione
✅ 2 file README

**TOTALE: 24 file**

## ⚡ ORDINE DI LETTURA CONSIGLIATO

1. `README.md` - Istruzioni
2. `app/types.ts` - Capire le strutture dati
3. `app/storage.ts` - Come vengono salvati i dati
4. `app/utils.ts` - Logica calcoli
5. `app/page.tsx` - Vedere tutto insieme
6. `app/components/*` - Componenti UI

## 🚀 QUICK START

```bash
# 1. Installa
npm install

# 2. Aggiungi foto in public/avatars/

# 3. Avvia
npm run dev

# 4. Apri http://localhost:3000
```

Fatto! 🚗💀
