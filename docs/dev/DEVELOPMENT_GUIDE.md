# DEVELOPMENT GUIDE

### Prerequisites
Before you can get started developing, you need set up your development environment:

- node


### Installation instructions

- We built an electron app with Electron Forge (is an all-in-one tool for packaging and distributing Electron applications)
  ```
    $ npx create-electron-app daruma-ball
  ```
- Plug the electron app with a React app
  - on React app ([/app](../../app))
    ```
    $ cd app
    $ npm install
    ```

    - We Also use [Supabase](https://supabase.com/) for their Database and Authentication service.
      - create your own supabase project
      - On the production, add your SITE URL in Authentication -> URL Configiration -> Site URL and Redirect URLs
      - add SUPABASE_URL and SUPABASE_KEY in SUPABASE_KEY in the Environment file
        - create two environment files to seperate environments (.env.development.local and .env.production.local) but in realworld deployment use (.env.development and .env.production), see the .env.example
        ```
          $ cat .env.example
        ```

  - on root of electron app
  ```
    $ npm run start
  ```

### Build instructions
how to compile the source code and create the executable or binary files

- Iy you want to get an executable of your application, in development
  ``` $ npm run build ```

### Deployment instructions

-  deploy your react app (some of free hosting services like surge and firebase)
  
-  put the URL in src/index.js

- build the app to see the integration is done correctly
  ```npm run build```

- Release app
  - **on Github**
    - change the version on package.json, commit and push it. each release is attached to a commit.
    - create a release in the github repo
      ```
        $ npm run publish
      ```
  - releases will be available [here](https://github.com/Alexon1999/daruma-ball/releases)
  - select a release and publish it.


---

### Source
- [Electron Forge Getting Started](https://www.electronforge.io/)
- [Configure Electron Forge](https://www.electronforge.io/configuration)
- [Packaging Electron app with Electron Forge](https://www.electronjs.org/docs/latest/tutorial/tutorial-packaging)
- [Code Signing](https://www.electronforge.io/guides/code-signing)
- [Github publisher](https://www.electronforge.io/config/publishers/github)
- [Database and Authentication with Supabase](https://github.com/supabase/examples-archive/tree/76e8b276f7fb58ba65b265a16678e9c72c23a72f/supabase-js-v1/todo-list/react-todo-list)
- [Environment Variable Create-React-APP](https://create-react-app.dev/docs/adding-custom-environment-variables/)