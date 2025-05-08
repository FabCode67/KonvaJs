# Electron Canvas Drawing App with Konva.js

## Why We Switched from Fabric.js to Konva.js

Based on the error logs from your previous attempt to build the executable, we encountered an issue with the `canvas` dependency that Fabric.js relies on. This dependency requires native libraries like Cairo and GTK, which are not installed on your system and can be difficult to set up properly.

Konva.js is a pure JavaScript alternative that provides similar canvas manipulation features but doesn't rely on any native dependencies, making it much easier to build and package with Electron.

## Using the Fix-Build Script

I've created a `fix-build.bat` script that will:
1. Uninstall Fabric.js to remove the dependency on native modules
2. Install Konva.js and react-konva as replacements
3. Set up everything for you to run with the new drawing library

Simply run:
```
fix-build.bat
```

## Features Maintained in the Konva Version

The Konva version maintains all the same features as the original Fabric.js version:
- Drawing on canvas with adjustable brush size and color
- Grid lines for better visualization
- Toggle between drawing and selection modes
- Clear canvas functionality
- Save drawing as PNG

## Running the Application

To run the application:
1. Start Next.js in development mode:
   ```
   npm run dev
   ```

2. In a separate terminal, start Electron:
   ```
   npm run electron-dev
   ```

## Building the Executable

With Konva.js, you should now be able to successfully build an executable without any native dependency issues:

```
npm run electron-dist
```

The executable will be generated in the `dist` folder.

## Additional Improvements

Konva.js offers some advantages over Fabric.js:
1. Smaller bundle size with fewer dependencies
2. Better performance in some drawing scenarios
3. Simpler API specifically designed for React with react-konva
4. No need for native dependencies on any platform

If you prefer to use Fabric.js instead (which would require installing Cairo and GTK dependencies), you can revert back to the original component implementation.
