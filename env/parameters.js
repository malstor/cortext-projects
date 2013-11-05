dashboardConfig =
{
    services: {
        Storage: {
            name: "Cortext Assets",
            url: "http://assets.cortext.net",
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
            callback_json:"http://api.projects.cortext.net/analysis"
            url: "http://mcp.cortext.net" 
        },
        Api: {
            url: "http://api.projects.cortext.net",
            createElement: "/elements",
            createDocument: "/documents",
            createAnalysis: "/analysis"
        }
    },
    common: {
        refreshRate : 5000        
    }

};
      
