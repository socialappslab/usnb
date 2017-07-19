# Universal Social Network Bus (USNB)#

USNB is a set of service components. You can use one or more of the following service components according to your needs:

* [API Gateway](https://gitlab.inria.fr/usnb/api-gateway)
* [Entity Manager](https://gitlab.inria.fr/usnb/entity-manager)
* [Message Transformer](https://gitlab.inria.fr/usnb/message-transformer)
* [Facebook Binding Component (No Messenger Platform)](https://gitlab.inria.fr/usnb/facebook-bc)
* [Facebook Binding Component (Messenger Platform)](https://gitlab.inria.fr/usnb/facebook-bc-bot-appcivist)
* [Email Binding Component](https://gitlab.inria.fr/usnb/email-bc)

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

## Usage ##

You will interact with the [API Gateway](https://gitlab.inria.fr/usnb/api-gateway) service. 

Suppose API Gateway location is http://localhost:3025 for the following examples.


### Entity Management ###

Register a user:

```
curl -X POST -H "Content-Type: application/json" -d '
{
    "userId": "user@universe.u",
    "name": "Test User"
}' "http://localhost:3025/users"
```

Register social interaction services identities for that user:

```
curl -X POST -H "Content-Type: application/json" -d '
{
    "userId": "user@universe.u",
    "serviceId": "facebookmessengerbot",
    "identity": "184858454541",
    "enabled": true
}' "http://localhost:3025/identities"


curl -X POST -H "Content-Type: application/json" -d '
{
    "userId": "user@universe.u",
    "serviceId": "email",
    "identity": "user@universe.u",
    "enabled": true
}' "http://localhost:3025/identities"
```

In the case of Facebook Messenger, it will be the bot itself who will register
the Facebook Messenger identity following [checkbox plugin](https://developers.facebook.com/docs/messenger-platform/plugin-reference/checkbox-plugin)
or the [account linking](https://developers.facebook.com/docs/messenger-platform/account-linking/v2.10) processes.

Set the preferred social interaction for that user:

```
curl -X POST -H "Content-Type: application/json" -d '
{
    "userId": "user@universe.u",
    "serviceId": "facebookmessengerbot"
}' "http://localhost:3025/preferences"
```

Change it:

```
curl -X PUT -H "Content-Type: application/json" -d '
{
    "serviceId": "email"
}' "http://localhost:3025/preferences/user@universe.u"
```

### Direct Messaging ###

Send a direct message to our user:

```
curl -X POST -H "Content-Type: application/json" -d '{
  "to": {
    "name": "user@universe.u"
  },
  "message": {
    "text": "Are you there?"
  }
}' "http://localhost:3025/messages"

```

### Events, Subscriptions and Indirect Messaging ###

Create an event:

```
curl -X POST -H "Content-Type: application/json"  -d '{
"eventId": "myEvent",
"title": "One great event"
}' "http://localhost:3025/events"
```

Create a subscription for our user:

```
curl -X POST -H "Content-Type: application/json" -d '{ 
"eventId": "myEvent", 
"alertEndpoint": "user@universe.u"
}' "http://localhost:3025/subscriptions"
```

Send an indirect message to users subscribed to 'myEvent':

```
curl -X POST -H "Content-Type: application/json" -d '{
    "eventId": "myEvent", 
    "title": "This is the title of the signal", 
    "text": "this is the body of the signal", 
    "instancedata": "User defined metadata"
    
}' "http://localhost:3025/signals"
```

In this example, 'user@universe.u' will receive the message through the
social interaction service specified in: 'http://localhost:3025/preferences/user@universe.u'

If it's **really necessary**, you can associate a subscription to a particular
social interaction service; for example, you can create one email and one 
Facebook Messenger subscription to our event:


```
curl -X POST -H "Content-Type: application/json" -d '{ 
"eventId": "myEvent", 
"alertEndpoint": "user@universe.u", 
"endpointType" : "email",
}' "http://localhost:3025/subscriptions"

curl -X POST -H "Content-Type: application/json" -d '{ 
"eventId": "myEvent", 
"alertEndpoint": "user@universe.u", 
"endpointType" : "facebookmessengerbot",
}' "http://localhost:3025/subscriptions"
```

In this case, user 'user@universe.u' will receive the same message by both email
and Facebook Messenger.

You can send the message only to users subscribed using a certain service using 
the 'filterBy' option; for example, send the signal only to subscriptions using 
email:


```
curl -X POST -H "Content-Type: application/json" -d '{
    "eventId": "myEvent", 
    "title": "This is the title of the signal", 
    "text": "this is the body of the signal", 
    "instancedata": "User defined metadata",
    "filterBy": "email"
    
}' "http://localhost:3025/signals"
```

The 'filterBy' option has no effect if there are users subscribed to the 
corresponding event without social interaction services explicetily associated
to that subscription.


### Contribution guidelines ###

You can contribute by:

* Writing tests
* Code review
* Writing new binding components

### Who do I talk to? ###

* Rafael Angarita: rafael.angarita AT inria.fr (main developer)
* Nikolaos Georgantas nikolaos.georgantas AT inria.fr (designer)
* Valérie Issarny valerie.issarny AT inria.fr (designer)