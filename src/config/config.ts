export  const corsOptions = {
    // origin: 'http://localhost:4200', // Allow all origins
    origin: 'https://weathertouch-shanushajahan707s-projects.vercel.app', // Allow all origins
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true  
};