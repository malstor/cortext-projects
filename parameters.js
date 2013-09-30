dashboardConfig =
{
    services: {
        Storage: {
            name: "Cortext Assets",
            url: "http://assets.dev",
        },
        Identity: {
            name: "Cortext Auth",
            urlAuth: "http://oauth.dev/auth",
            urlSubscribe: "http://oauth.dev/user/register",
            account: {
                service: "cortext",
                clientId: "cortext-dashboard",
                secret: "c0rt3xt"
            }
        },
        Jobs: {
            name: "Cortext Manager",
            url: "http://ctmanager.dev" 

        }
    },
    common: {
        refreshRate : 5000        
    }

};
      