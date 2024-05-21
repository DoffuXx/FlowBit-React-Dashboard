import React, { createContext, ReactNode, useEffect, useState } from "react";
import LoadingBar from "react-top-loading-bar";

interface ProgressContextType {
  progress: number;
  setProgress: (progress: number) => void;
}

export const ProgressContext = createContext<ProgressContextType>({
  progress: 0,
  setProgress: () => {},
});

interface ProgressProviderProps {
  children: ReactNode;
}

export const ProgressProvider: React.FC<ProgressProviderProps> = ({
  children,
}) => {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const handleProgress = () => {
      setProgress(100);
    };
    window.addEventListener("beforeunload", handleProgress);
    return () => {
      window.removeEventListener("beforeunload", handleProgress);
    };
  }, []);
  console.log(progress);
  return (
    <ProgressContext.Provider value={{ progress, setProgress }}>
      <LoadingBar
        color="#f11946"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      {children}
    </ProgressContext.Provider>
  );
};
