# Uruchomienie projektu

**1. Instalacja express-draft**

   ```
    npm i -g express-draft
   ```

**2. Instalacja ORM prisma**

   ```
    cd server

    npm i -D prisma
   ```

**3. Instalacja klienta prisma**

   ```
    npm i @prisma/client
   ```

**5. Aby móc uruchomić aplikację trzeba dodać katalog node_modules:**
   ```
    npm install
   ```

**6. Uruchomienie serwera**

   ```
    cd server

    npm run dev
   ```

**7. Uruchomienie aplikacji:**
   ``` 
    npm start
   ```


# Praca z bazą danych 

> [!NOTE]
> W przeglądarce można otworzyć GUI bazy danych gdzie dostępne jest przeglądanie oraz zarządzanie danymi przechowywanymi w bazie

   ```
     cd server

     npx prisma studio
   ```



