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
    - Our server-side consists of a Node server, built upon an Express framework, and MongoDB to persist data.
    - The client and server communicate through the use of Axios (http promise library) and websockets to broadcast updates throughout the app.

  - Why did we design the User Interface in the manner that we did?

  - How do we get the recommendations?
    - Our machine learning framework's 'tag system' supports recommendations from any third-party API that categorizes their event results; all that our backend requires is a dedicated 'conversion chart' between a subset of that API's tags and our tags
    - Currently, we have a conversion chart for a wide scope of the Yelp API

## Future Plans ##


## Getting Started ##

  Sign up at socializenow.herokuapp.com, invite your friends, and start having fun!
