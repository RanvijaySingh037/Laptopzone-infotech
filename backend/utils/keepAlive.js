const keepAlive = () => {
    const url = process.env.BASE_URL;

    if (!url) {
        console.log("Keep-alive disabled: BASE_URL environment variable is missing.");
        return;
    }

    const intervalInMs = 14 * 60 * 1000; // 14 minutes

    setInterval(async () => {
        try {
            const pingUrl = `${url.replace(/\/$/, '')}/api/health`;
            const response = await fetch(pingUrl);
            
            if (response.ok) {
                console.log(`Keep-alive ping successful at ${new Date().toISOString()}`);
            } else {
                console.log(`Keep-alive ping failed with status code: ${response.status}`);
            }
        } catch (error) {
            console.log(`Keep-alive failed: ${error.message}`);
        }
    }, intervalInMs);

    console.log(`Keep-alive service initialized for ${url}. Will ping every 14 minutes.`);
};

export default keepAlive;
