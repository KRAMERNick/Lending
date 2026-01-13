# 🚀 ИНСТРУКЦИЯ ПО МИГРАЦИИ НА TIMEWEB

## ⚠️ ВАЖНО!

**В Figma Make** код должен остаться с импортами `figma:asset`  
**На хостинге Timeweb** нужно заменить импорты на `/images/*.png`

---

## 📋 ШАГ 1: СКАЧАТЬ ИЗОБРАЖЕНИЯ

Скачай все 23 изображения из Figma Make одним из способов:

### **Способ 1: DevTools (100% работает)**
1. Открой сайт в Figma Make
2. Нажми F12
3. Перейди на вкладку "Network" (Сеть)
4. Обнови страницу (F5)
5. Фильтр "Img"
6. Прокрути сайт до конца
7. Сохрани каждое изображение правой кнопкой → "Save image as..."

### **Способ 2: Кнопка Download**
1. В Figma Make найди кнопку "⋮" (три точки)
2. "Download project" или "Export project"
3. Скачай ZIP-архив

---

## 📋 ШАГ 2: ПЕРЕИМЕНОВАТЬ ФАЙЛЫ

Переименуй все изображения согласно списку из `/public/images/README.md`:

```
hero-photo.png
profile-photo.png
video-cover-1.png ... video-cover-6.png
student-photo-1.png ... student-photo-3.png
student-video-cover-1.png ... student-video-cover-6.png
studio-photo-1.png ... studio-photo-3.png
drum-set.png
whatsapp-icon.png
telegram-icon.png
```

---

## 📋 ШАГ 3: ЗАГРУЗИТЬ НА TIMEWEB

Загрузи все 23 файла в папку `/public/images/` на хостинге Timeweb.

---

## 📋 ШАГ 4: ЗАМЕНИТЬ ИМПОРТЫ В КОДЕ

**НА ХОСТИНГЕ** (не в Figma Make!) замени в файлах:

### **1. /components/Hero.tsx**
```typescript
// БЫЛО:
import heroPhoto from 'figma:asset/70cc53eaa605efc47b6e45338b031b360fb81a62.png';

// СТАЛО:
import heroPhoto from '/images/hero-photo.png';
```

### **2. /components/About.tsx**
```typescript
// БЫЛО:
import profilePhoto from 'figma:asset/9a7c84808894f027f24365ed3a4155afc704e9a3.png';
import videoCover1 from 'figma:asset/4364420682c48158cc589a8501d352bf3bbc7013.png';
import videoCover2 from 'figma:asset/20ed7f87d029627523b42771ba245745c1f142ff.png';
import videoCover3 from 'figma:asset/c0768d8f50d011570bfe108f542b8de0b9d670a3.png';
import videoCover4 from 'figma:asset/6a83b3e2f2f52c0a1ff9014cccf8421c35861eac.png';
import videoCover5 from 'figma:asset/a77706c79df8d1c4de9fe08ec1957e3132e768b9.png';
import videoCover6 from 'figma:asset/de8490f3b66ac630cea97101df7fb1083bf3eab0.png';

// СТАЛО:
import profilePhoto from '/images/profile-photo.png';
import videoCover1 from '/images/video-cover-1.png';
import videoCover2 from '/images/video-cover-2.png';
import videoCover3 from '/images/video-cover-3.png';
import videoCover4 from '/images/video-cover-4.png';
import videoCover5 from '/images/video-cover-5.png';
import videoCover6 from '/images/video-cover-6.png';
```

### **3. /components/Gallery.tsx**
```typescript
// БЫЛО:
import studentPhoto1 from 'figma:asset/0f8cad6d745da7ebcd4af02866a7e546a8d0fa34.png';
import studentPhoto2 from 'figma:asset/23ede886d79819a7330c9da22a52d6a724305991.png';
import studentPhoto3 from 'figma:asset/d3e0da2cba3be06479716422bf23beb871551e7f.png';
import studentVideoCover1 from 'figma:asset/df4d93e24a69f9b17ac385792c2619faa8ec3ec5.png';
import studentVideoCover2 from 'figma:asset/b4b0a563cdc2025c3ebfb5ddd341ea61f54a3e37.png';
import studentVideoCover3 from 'figma:asset/e43b963fa0dff232c4f57d648129675a0b3dac0f.png';
import studentVideoCover4 from 'figma:asset/de7a2495f2f8d2f3ad84203c6a301ac495107d6b.png';
import studentVideoCover5 from 'figma:asset/86e9f701e7365599c56df2949980f86f25ddbf35.png';
import studentVideoCover6 from 'figma:asset/a144ceca796bf8cb0a61a132baee725039946920.png';

// СТАЛО:
import studentPhoto1 from '/images/student-photo-1.png';
import studentPhoto2 from '/images/student-photo-2.png';
import studentPhoto3 from '/images/student-photo-3.png';
import studentVideoCover1 from '/images/student-video-cover-1.png';
import studentVideoCover2 from '/images/student-video-cover-2.png';
import studentVideoCover3 from '/images/student-video-cover-3.png';
import studentVideoCover4 from '/images/student-video-cover-4.png';
import studentVideoCover5 from '/images/student-video-cover-5.png';
import studentVideoCover6 from '/images/student-video-cover-6.png';
```

### **4. /components/DrumGame.tsx**
```typescript
// БЫЛО:
import drumSetImage from 'figma:asset/f9c5a1903cc2c16dbc6fd4c231a7d0c613aca842.png';

// СТАЛО:
import drumSetImage from '/images/drum-set.png';
```

### **5. /components/Contact.tsx**
```typescript
// БЫЛО:
import whatsappIcon from 'figma:asset/d45f0f82cf326f2be86a8b8d4a7dc37309a20aa4.png';
import telegramIcon from 'figma:asset/ca003a164c2f7a1a400743a0566e295195d2093a.png';

// СТАЛО:
import whatsappIcon from '/images/whatsapp-icon.png';
import telegramIcon from '/images/telegram-icon.png';
```

### **6. /components/Studio.tsx**
```typescript
// БЫЛО:
import studioImage1 from 'figma:asset/096d705629012b2f1004a0738c0e87bdcca91bcb.png';
import studioImage2 from 'figma:asset/9d4831b1963db42d157a35e9ab0547b8b4c619f6.png';
import studioImage3 from 'figma:asset/d6c8368137dc006dfeaca8a9aa289c946e8e3b32.png';

// СТАЛО:
import studioImage1 from '/images/studio-photo-1.png';
import studioImage2 from '/images/studio-photo-2.png';
import studioImage3 from '/images/studio-photo-3.png';
```

---

## 📋 ШАГ 5: БЫСТРАЯ ЗАМЕНА (ПОИСК-ЗАМЕНА)

Можно использовать поиск-замену в редакторе кода:

1. **Найди:** `figma:asset/`
2. **Замени на:** `/images/`
3. **Затем вручную переименуй** хеши на понятные названия согласно списку выше

---

## ✅ ГОТОВО!

После замены всех импортов сайт заработает на Timeweb с настоящими изображениями!

---

## 💡 ПОДСКАЗКА

Используй VS Code или любой текстовый редактор с функцией "Find & Replace" для быстрой замены.
