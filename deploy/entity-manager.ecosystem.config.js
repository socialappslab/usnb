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
            repo: 'https://bitbucket.org/USNB-A/entity-manager',
            path: '/var/www/production/entity-manager',
            'post-deploy': 'npm install && npm install https://bitbucket.org/USNB-A/message-transformer && pm2 reload entity-manager.ecosystem.config.js --env dev',
            env: {
                NODE_ENV: 'production',

                RABBITMQ: 'amqp://admin:admin@127.0.0.721:5672',

                USNB_NOTIFICATIONS_PORT: 3025,
                USNB_MONGO_URI_NOTIFICATIONS: 'mongodb://localhost:27017/notificationservice',
            }
        },
        dev: {
            user: '',
            host: 'localhost',
            ref: 'origin/master',
            repo: 'https://bitbucket.org/USNB-A/entity-manager',
            path: '/var/www/development/entity-manager',
            'post-deploy': 'npm install && npm install https://bitbucket.org/USNB-A/message-transformer && pm2 reload entity-manager.ecosystem.config.js --env dev',
            env: {
                NODE_ENV: 'development',

                RABBITMQ: 'amqp://admin:admin@127.0.0.721:5672',

                USNB_NOTIFICATIONS_PORT: 3025,
                USNB_MONGO_URI_NOTIFICATIONS: 'mongodb://localhost:27017/notificationservice',
            }
        }
    }
};
