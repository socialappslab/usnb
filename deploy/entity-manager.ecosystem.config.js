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
            'post-deploy': 'npm install && npm install https://gitlab.inria.fr/usnb/message-transformer && pm2 reload /path/to/local/deploy/scripts/entity-manager.ecosystem.config.js --env dev',
            env: {
                NODE_ENV: 'production',
                RABBITMQ: 'amqp://admin:admin@127.0.0.721:5672',
                USNB_ENTITY_MANAGER_PORT: 3024,
                USNB_MONGO_URI_ENTITY_MANAGER: 'mongodb://localhost:27017/entitymanager',
            }
        },
        dev: {
            user: '',
            host: 'localhost',
            ref: 'origin/master',
            repo: 'https://gitlab.inria.fr/usnb/entity-manager',
            path: '/path/to/local/development/deployment/directory/entity-manager',
            'post-deploy': 'npm install && npm install https://gitlab.inria.fr/usnb/message-transformer && pm2 reload /path/to/local/deploy/scripts/entity-manager.ecosystem.config.js --env dev',
            env: {
                NODE_ENV: 'development',
                RABBITMQ: 'amqp://admin:admin@127.0.0.721:5672',
                USNB_ENTITY_MANAGER_PORT: 3024,
                USNB_MONGO_URI_ENTITY_MANAGER: 'mongodb://localhost:27017/entitymanager',
            }
        }
    }
};
