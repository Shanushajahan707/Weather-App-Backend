export  const corsOptions = {
    // origin: 'http://localhost:4200', // Allow all origins
    origin: 'https://weather-touch.vercel.app', // Allow all origins
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true  
};