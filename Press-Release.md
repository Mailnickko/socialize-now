# Socialize Now! #

## Summary ##

  Socialize Now! solves a problem affecting every social group: what should _we_ do? Whether with old friends or new acquitances, choosing an activity everybody likes is hard work. Socialize Now! makes it easier by first providing groups with personalized recommendations and facilitating a vote on activities. As a result, Socialize Now! ensures everybody will have a good time.

## Technical Summary ##

  - How we do our Machine Learning Recommendations?
    - Behind the scenes, we use a proprietary and comprehensive system of 'category tags' to describe event ideas (e.g., 'popular')
    - For each user, we keep track of the tags associated to every event idea they've ever upvoted
    - When a voting period begins, we retrieve the 'upvoted tags' of every user in the group and use a neural network to obtain a set of tags which fits the group's preferences; this set of tags is then converted to a concrete suggestion from a third-party API (such as Yelp)

  - How does data flow around our entire system?
    - Our client-side data flow is handled through a combination of React for displaying our views and Redux for maintaining the state of said views.
    - Our server-side consists of a Node server, built on Express framework. We utilize the Yelp API to gather a personalized set of suggestions once user preference data is process through our neural network, and is then persisted through MongoDB.
    - The client and server communicate through the use of Axios (http promise library) and websockets to broadcast updates throughout the app.

  - Why did we design the User Interface in the manner that we did?
    - While Socialize Now! aims to remove the mundane, awkward process of suggesting group activities, we've modeled our product to keep the social aspect of the task intact.
    - Our vibrant, fresh UI creates a fun, interactive environment for users to invite friends to events, chat it up throughout the entire polling process, and even pin memorable dialogue or important notes to a bulletin board.
    - Our design choices allow us to take care of the suggestion process behind the scenes, leaving users to focus on creating memories and sharing some laughs with friends. After all, at Socialize Now!, we emphasize the "Now".

  - How do we get the recommendations?
    - Our machine learning framework's 'tag system' supports recommendations from any third-party API that categorizes their event results; all that our backend requires is a dedicated 'conversion chart' between a subset of that API's tags and our tags
    - Currently, we have a conversion chart for a wide scope of the Yelp API

## Future Plans ##
  - As we continue to grow, we're cooking up some big goals and bigger ideas. Our immediate vision has us considering an even more complex neural network and adding a feature that allows users to write in custom events they'd like to sugesst to their event group.
  - Our ultimate goal is to provide users with a service they enjoy using. We're always open to hearing suggestions and comments about how we can get there.

## Getting Started ##

  Sign up at socializenow.herokuapp.com, set up an event, invite your friends, and start having fun!
