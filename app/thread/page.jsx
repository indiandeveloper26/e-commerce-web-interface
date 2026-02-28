"use client";

import { useState } from "react";

export default function ThreadTest() {
    const [mainResult, setMainResult] = useState("");
    const [workerResult, setWorkerResult] = useState("");
    const [count, setCount] = useState(0);

    // ❌ MAIN THREAD BLOCKING
    const blockMainThread = () => {
        setMainResult("Running heavy task on MAIN THREAD...");
        let sum = 0;
        for (let i = 0; i < 2_000_000_0000; i++) {
            sum += i;
        }
        setMainResult("Main thread finished ❌ UI was blocked");
    };

    // ✅ WEB WORKER (NON BLOCKING)
    const runWithWorker = () => {
        setWorkerResult("Running in WEB WORKER...");
        const worker = new Worker(new URL("./worker.js", import.meta.url));
        worker.postMessage("start");

        worker.onmessage = (e) => {
            setWorkerResult(e.data);
            worker.terminate();
        };
    };

    return (
        <div className="min-h-screen p-10 space-y-6">
            <h1 className="text-3xl font-black">JS Thread Test (Next.js)</h1>

            <div className="flex gap-4">
                <button
                    onClick={blockMainThread}
                    className="px-6 py-3 bg-red-500 text-white rounded-xl"
                >
                    Block Main Thread ❌
                </button>

                <button
                    onClick={runWithWorker}
                    className="px-6 py-3 bg-green-500 text-white rounded-xl"
                >
                    Use Web Worker ✅
                </button>
            </div>

            <div className="space-y-2 mt-4">
                <p className="text-lg font-bold text-red-600">Main Thread Result:</p>
                <p className="text-gray-800">{mainResult || "❗ Not run yet"}</p>

                <p className="text-lg font-bold text-green-600 mt-4">Web Worker Result:</p>
                <p className="text-gray-800">{workerResult || "❗ Not run yet"}</p>
            </div>

            {/* UI Test */}
            <div className="mt-10">
                <button
                    onClick={() => setCount(count + 1)}
                    className="px-6 py-3 bg-black text-white rounded-xl"
                >
                    Click Me (UI Test): {count}
                </button>

                <p className="text-gray-500 mt-2">
                    ❗ Main thread block hone par ye button kaam nahi karega
                </p>
            </div>
        </div>
    );
}
