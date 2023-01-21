# Daruma Ball

### Our Goal : <span style='color: #ff7474'>Transform your to-do list into a done list</span>
#### [daruma web app](http://app.daruma-ball.surge.sh)

# Screens
![](markdown/demo_splash.png)
![](markdown/demo_home.png)
![](markdown/demo_creation.png)
![](markdown/demo_list.png)

#### Solution Description
- We built an electron app with Electron Forge (is an all-in-one tool for packaging and distributing Electron applications)
  ```
    $ npx create-electron-app daruma-ball
  ```
- Plug the electron app with a React app
  - on react app
  ```
  $ cd app
  $ npm install
  ```

  - on root of electron app
  ```
    # development
    $ npm run start

    # production
    # deploy your react app, and put the URL in src/index.js
    $ npm run build
  ```

### Source
- [Electron Forge Getting Started](https://www.electronforge.io/)
- [Configure Electron Forge](https://www.electronforge.io/configuration)
- [Packaging Electron app with Electron Forge](https://www.electronjs.org/docs/latest/tutorial/tutorial-packaging)