module.exports = {
  packagerConfig: {
    icon: "./src/assets/icons/daruma",
    platform: "all",
    arch: "all",
    ignore: ["app", "markdown"],
  },
  rebuildConfig: {},
  makers: [
    {
      name: "@electron-forge/maker-squirrel",
      config: {
        // The ICO file to use as the icon for the generated Setup.exe
        setupIcon: "./src/assets/icons/daruma.ico",
      },
    },
    {
      // Path to a single image that will act as icon for the application
      name: "@electron-forge/maker-deb",
      config: {
        options: {
          icon: "./src/assets/icons/daruma.png",
        },
      },
    },
    {
      // Path to a single image that will act as icon for the application
      name: "@electron-forge/maker-rpm",
      config: {
        options: {
          icon: "./src/assets/icons/daruma.png",
        },
      },
    },
    {
      // Path to the icon to use for the app in the DMG window
      name: "@electron-forge/maker-zip",
      config: {
        platforms: ["darwin"],
      },
    },
    {
      // Path to the icon to use for the app in the DMG window
      name: "@electron-forge/maker-dmg",
      config: {
        icon: "./src/assets/icons/daruma.icns",
      },
    },
  ],
  publishers: [
    {
      name: "@electron-forge/publisher-github",
      config: {
        repository: {
          owner: "Alexon1999",
          name: "daruma-ball",
        },
        authToken:
          "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",
        prerelease: true,
      },
    },
  ],
};
