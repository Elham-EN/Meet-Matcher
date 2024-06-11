// Anyone can access these routes
export const publicRoutes = ["/"];

// We want authenticated users to be able to access the login and register
// page. Users who are authenticated are not able to access these routes
export const authRoutes = ["/login", "/register"];
