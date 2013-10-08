dashboardConfig =
{
    services: {
        Storage: {
            name: "Cortext Assets",
            url: "http://assets.dev",
        },
        Identity: {
            name: "Cortext Auth",
            urlAuth: "http://auth.cortext.net/auth",
            urlSubscribe: "http://auth.cortext.net/user/register",
            account: {
                service: "cortext",
                clientId: "cortext-dashboard",
                secret: "c0rt3xt"
            }
        },
        Jobs: {
            name: "Cortext Manager",
            url: "http://mcp.cortext.net" 

        }
    },
    common: {
        refreshRate : 5000        
    }

};
      