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
            url: "http://ctmanager.dev",
            callback_json:"http://localhost:8080/analysis"

        },
        Api: {
            url: "http://localhost:8080",
            createElement: "/elements",
            createDocument: "/documents",
            createAnalysis: "/analysis"
        }
    },
    common: {
        refreshRate : 5000        
    }

};
      