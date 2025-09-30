import { useState, useEffect, useRef } from "react";

export default function Stopwatch() {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const intervalIdRef = useRef(null);
  const startTimeRef = useRef(0);

  useEffect(() => {
    if (isRunning) {
      intervalIdRef.current = setInterval(() => {
        setElapsedTime(Date.now() - startTimeRef.current);
      }, 10);
    }

    return () => {
      clearInterval(intervalIdRef.current);
    };
  }, [isRunning]);

  function start() {
    setIsRunning(true);
    startTimeRef.current = Date.now() - elapsedTime;
  }

  function stop() {
    setIsRunning(false);
  }

  function reset() {
    setElapsedTime(0);
    setIsRunning(false);
  }

  function formatTime() {
    let minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
    let seconds = Math.floor((elapsedTime / 1000) % 60);
    let milliseconds = Math.floor((elapsedTime % 1000) / 10);

    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");
    milliseconds = String(milliseconds).padStart(2, "0");

    return `${minutes}:${seconds}:${milliseconds}`;
  }

  return (
    <body className="min-h-screen w-full bg-stone-200">
      <div className="text-center my-15 mx-auto rounded-xl bg-white w-[450px] py-10 px-2 shadow-2xl">
        <div className="font-bold text-shadow-lg text-[85px]">
          {formatTime()}
        </div>
        <div className="flex justify-center gap-6">
          <button
            onClick={start}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded-xl transition ease-in text-lg font-bold"
          >
            Start
          </button>
          <button
            onClick={stop}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-xl transition ease-in text-lg font-bold"
          >
            Stop
          </button>
          <button
            onClick={reset}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-xl transition ease-in text-lg font-bold"
          >
            Reset
          </button>
        </div>
      </div>
    </body>
  );
}
