# Creating Executables and Installers for Canvas Drawing App

Now that your application is working perfectly, you have two options to distribute it:

## Option 1: Create a Standalone Executable

I've created a script called `create-executable.bat` that will:
1. Use electron-packager to create a standalone executable
2. Package all necessary files together
3. Create a distributable folder

### How to use it:

1. Run the script:
   ```
   create-executable.bat
   ```

2. When complete, you'll find the executable at:
   ```
   dist\Canvas Drawing App-win32-x64\Canvas Drawing App.exe
   ```

3. To distribute the app, share the entire folder:
   ```
   dist\Canvas Drawing App-win32-x64\
   ```

This is the simplest approach and creates a portable application that doesn't require installation.

## Option 2: Create a Windows Installer

I've also created a script called `create-installer.bat` that will:
1. Create the executable (like Option 1)
2. Use electron-winstaller to create a proper Windows installer
3. Generate a setup.exe file that users can run to install the app

### How to use it:

1. Run the script:
   ```
   create-installer.bat
   ```

2. When complete, you'll find the installer at:
   ```
   dist\installer\Canvas_Drawing_App_Setup.exe
   ```

3. Distribute this single .exe file to your users

The installer will:
- Create a proper Windows application
- Add an entry to Add/Remove Programs
- Create desktop and start menu shortcuts
- Handle updates if you release new versions

## Before You Run These Scripts

1. **Optional: Add an Icon**
   - Place an icon file named `icon.ico` in your project folder
   - If you don't have one, the scripts will still work but your app will use the default Electron icon

2. **Requirements**
   - You need Node.js and npm installed
   - You need administrative privileges to install the global packages

## Customizing the Installer

If you want to customize the installer (company name, descriptions, etc.), edit the `create-installer.bat` file before running it.

## Troubleshooting

If you encounter issues:

1. Make sure you have the latest Node.js installed
2. Try running the commands manually one by one
3. Check if you have administrative privileges

The standalone executable option is more reliable and should work in most cases.
