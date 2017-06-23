# The Universal Social Network Bus (USNB)#
### A USNB notification instance for AppCivist-PB ###

The USNB is a set of service components. You can use one or more of the following service components according to your needs:

* [API Gateway](https://bitbucket.org/USNB-A/api-gateway)
* [Entity Manager](https://bitbucket.org/USNB-A/entity-manager)
* [Facebook Binding Component](https://bitbucket.org/USNB-A/facebook-bindingcomponent)
* [Email Binding Component](https://bitbucket.org/USNB-A/email-bindingcomponent)

This README contains the necessary steps to get the USNB up and running.

### Setup ###

If you want to use all available USNB components, you have to install the following:

* [RabbitMQ](https://www.rabbitmq.com)
* [Nodejs](https://nodejs.org/) and [NPM (Node Package Manager)](https://www.npmjs.org/)
* [pm2](http://pm2.keymetrics.io/docs/usage/quick-start/) 
* [MongoDB](https://www.mongodb.com)

### Deployment ###

You can deploy the USNB components using whatever method you prefer; however, we recommend using the [pm2](http://pm2.keymetrics.io/docs/usage/quick-start/) process manager for node.js. You can find in the folder *deploy* scripts for each one of the available components and a script to run them all called *deploy.sh*. 
You just have to configure these scripts according to your environment. When you deploy all components, you should see them running in pm2:

![Screen Shot 2017-06-15 at 16.08.57.png](https://bitbucket.org/repo/XX5zzkb/images/1938485544-Screen%20Shot%202017-06-15%20at%2016.08.57.png)


There is also [another file](Link URL) containing all the required environment variables of all components if you don't want to use pm2.

### Usage ###

You will interact with the [API Gateway](https://bitbucket.org/USNB-A/api-gateway) service. 

Example usage supposing your API Gateway service location is http://localhost:3025:

Create an event:


```
#!command

curl -X POST http://localhost:3025/events -H "Content-Type: application/json"  -d '{"title": "test", "eventId": "153f8576-7208-41b6-affd-32795f06dca5_NEW_CONTRIBUTION_IDEA"}'

```

Create one email and one Facebook Messenger subscription to that event:


```
#!command

curl -X POST http://localhost:3025/subscriptions -H "Content-Type: application/json" -d '{ "eventId": "153f8576-7208-41b6-affd-32795f06dca5_NEW_CONTRIBUTION_IDEA", "alertEndpoint": "johnatinria@gmail.com", "endpointType" : "email"}'
curl -X POST http://localhost:3025/subscriptions -H "Content-Type: application/json" -d '{ "eventId": "153f8576-7208-41b6-affd-32795f06dca5_NEW_CONTRIBUTION_IDEA", "alertEndpoint": "carmenatinria", "endpointType" : "facebookmessenger"}'
```

Send a signal for that event:

```
#!command

curl -X POST http://localhost:3025/signals -H "Content-Type: application/json" -d '{ "eventId": "153f8576-7208-41b6-affd-32795f06dca5_NEW_CONTRIBUTION_IDEA", "title": "This is the title of the signal", "text": "this is the body of the signal", "instancedata": "An instance of event(12345_new_campaign) has happened"}'

```

You can send the signal only to subscriptions using a certain service in the 'filterBy' option; for example, send the signal only to subscriptions using Facebook Messenger:


```
#!command

curl -X POST http://localhost:3025/signals -H "Content-Type: application/json" -d '{ "eventId": "153f8576-7208-41b6-affd-32795f06dca5_NEW_CONTRIBUTION_IDEA", "title": "This is the title of the signal", "text": "this is the body of the signal", "filterBy": "facebookmessenger", "instancedata": "An instance of event(12345_new_campaign) has happened"}'


```




### Contribution guidelines ###

You can contribute by:

* Writing tests
* Code review
* Writing new binding components

### Who do I talk to? ###

* Rafael Angarita: rafael.angarita AT inria.fr (main developer)
* Nikolaos Georgantas nikolaos.georgantas AT inria.fr (designer)
* Valérie Issarny valerie.issarny AT inria.fr (designer)