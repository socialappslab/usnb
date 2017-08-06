module.exports = {
    /**
     * Application configuration section
     * http://pm2.keymetrics.io/docs/usage/application-declaration/
     */
    apps: [

        // First application
        {
            name: 'entity-manager',
            script: 'server.js',
            /*env: {
              COMMON_VARIABLE: 'true'
            },
            env_production : {
              NODE_ENV: 'production'
            }*/
        }
    ],

    /**
     * Deployment section
     * http://pm2.keymetrics.io/docs/usage/deployment/
     */
    deploy: {
        production: {
            user: '',
            host: '',
            ref: 'origin/master',
            repo: 'https://gitlab.inria.fr/usnb/entity-manager',
            path: '/path/to/local/production/deployment/directory/entity-manager',
            'post-deploy': 'npm install && npm install https://gitlab.inria.fr/usnb/message-transformer && pm2 reload /path/to/local/deploy/scripts/subscription-manager.ecosystem.config.js --env dev',
            env: {
                NODE_ENV: 'production',
                RABBITMQ: 'amqp://admin:admin@127.0.0.721:5672',
                USNB_NOTIFICATIONS_PORT: 3023,
                USNB_MONGO_URI_NOTIFICATIONS: 'mongodb://localhost:27017/notificationservice',
            }
        },
        dev: {
            user: '',
            host: 'localhost',
            ref: 'origin/master',
            repo: 'https://gitlab.inria.fr/usnb/entity-manager',
            path: '/path/to/local/development/deployment/directory/entity-manager',
            'post-deploy': 'npm install && npm install https://gitlab.inria.fr/usnb/message-transformer && pm2 reload /path/to/local/deploy/scripts/subscription-manager.ecosystem.config.js --env dev',
            env: {
                NODE_ENV: 'development',
                RABBITMQ: 'amqp://admin:admin@127.0.0.721:5672',
                USNB_NOTIFICATIONS_PORT: 3023,
                USNB_MONGO_URI_NOTIFICATIONS: 'mongodb://localhost:27017/notificationservice',
            }
        }
    }
};
