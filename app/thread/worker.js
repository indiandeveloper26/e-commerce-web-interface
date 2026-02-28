self.onmessage = () => {
    let sum = 0;
    for (let i = 0; i < 2_000_000_000; i++) {
        sum += i;
    }

    self.postMessage("Worker finished ✅ UI was NOT blocked");
};
