module.exports = {
    /**
     * Application configuration section
     * http://pm2.keymetrics.io/docs/usage/application-declaration/
     */
    apps: [

        // First application
        {
            name: 'facebook-bindingcomponent',
            script: 'start.js',
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
            repo: 'https://bitbucket.org/USNB-A/facebook-bindingcomponent',
            path: '/var/www/production/facebook-bindingcomponent',
            'post-deploy': 'npm install && npm install https://bitbucket.org/USNB-A/message-transformer && pm2 reload facebook-bindingcomponent.ecosystem.config.js --env dev',

            env: {
                NODE_ENV: 'production',

                RABBITMQ: 'amqp://admin:admin@127.0.0.721:5672',

                USNB_FACEBOOK_PERSONA_PORT: 3027,
                USNB_FACEBOOK_PERSONA_EXCHANGE: 'facebookmessenger',
                USNB_FACEBOOK_USER: '',
                USNB_FACEBOOK_PASSWORD: ''
            }
        },
        dev: {
            user: '',
            host: 'localhost',
            ref: 'origin/master',
            repo: 'https://bitbucket.org/USNB-A/facebook-bindingcomponent',
            path: '/var/www/development/facebook-bindingcomponent',
            'post-deploy': 'npm install && npm install https://bitbucket.org/USNB-A/message-transformer && pm2 reload facebook-bindingcomponent.ecosystem.config.js --env dev',
            env: {
                NODE_ENV: 'development',

                RABBITMQ: 'amqp://admin:admin@127.0.0.721:5672',

                USNB_FACEBOOK_PERSONA_PORT: 3027,
                USNB_FACEBOOK_PERSONA_EXCHANGE: 'facebookmessenger',
                USNB_FACEBOOK_USER: '',
                USNB_FACEBOOK_PASSWORD: ''
            }
        }
    }
};
