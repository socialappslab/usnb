module.exports = {
    /**
     * Application configuration section
     * http://pm2.keymetrics.io/docs/usage/application-declaration/
     */
    apps: [

        // First application
        {
            name: 'email-bindingcomponent',
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
            repo: 'https://bitbucket.org/USNB-A/email-bindingcomponent',
            path: '/var/www/development/email-bindingcomponent',
            'post-deploy': 'npm install && npm install https://bitbucket.org/USNB-A/message-transformer && pm2 reload /Users/rangarit/workspace/deployment/email-bindingcomponent.ecosystem.config.js --env dev',
            env: {
                NODE_ENV: 'production',

                RABBITMQ: 'amqp://admin:admin@127.0.0.721:5672',

                USNB_EMAIL_PERSONA_PORT: 3026,
                USNB_EMAIL_HOST: 'smtp.gmail.com',
                USNB_EMAIL_PORT: 465,
                USNB_EMAIL_USER: '',
                USNB_EMAIL_PASSWORD: '',
                USNB_EMAIL_PERSONA_EXCHANGE: 'email'
            }
        },
        dev: {
            user: 'rangarit',
            host: 'localhost',
            ref: 'origin/master',
            repo: 'https://bitbucket.org/USNB-A/email-bindingcomponent',
            path: '/var/www/development/email-bindingcomponent',
            'post-deploy': 'npm install && npm install https://bitbucket.org/USNB-A/message-transformer && pm2 reload /Users/rangarit/workspace/deployment/email-bindingcomponent.ecosystem.config.js --env dev',
            env: {
                NODE_ENV: 'development',

                RABBITMQ: 'amqp://admin:admin@127.0.0.721:5672',

                USNB_EMAIL_PERSONA_PORT: 3026,
                USNB_EMAIL_HOST: 'smtp.gmail.com',
                USNB_EMAIL_PORT: 465,
                USNB_EMAIL_USER: '',
                USNB_EMAIL_PASSWORD: '',
                USNB_EMAIL_PERSONA_EXCHANGE: 'email'
            }
        }
    }
};
