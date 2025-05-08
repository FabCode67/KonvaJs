import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the DrawingCanvas component with no SSR
const DrawingCanvas = dynamic(
  () => import('../components/DrawingCanvas'),
  { ssr: false }
);

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);

  // Only render the canvas component on the client-side
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="container">
      <header>
        <h1>Canvas Drawing App</h1>
        <p>Draw freely on the canvas below</p>
      </header>

      <main>
        {isMounted && <DrawingCanvas />}
      </main>

      <footer>
        <p>Made with Electron, Next.js, and Fabric.js</p>
      </footer>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        header {
          width: 100%;
          max-width: 800px;
          padding: 1.5rem 0;
          text-align: center;
        }

        h1 {
          margin: 0;
          line-height: 1.15;
          font-size: 2.5rem;
          color: #333;
        }

        p {
          margin: 0.5rem 0;
          font-size: 1.25rem;
          color: #666;
        }

        main {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
        }

        footer {
          width: 100%;
          height: 60px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 2rem;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}