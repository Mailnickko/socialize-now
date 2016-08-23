# Socialize Now! #

## Summary ##

  Socialize Now! solves a problem affecting every social group. What should _we_ do? Whether with old friends or new acquitances, choosing an activity everybody likes is hard work. Socialize Now! makes it easier by first, providing groups with personalized recommendations. Then, Socialize Now! holds a vote on activities and the activity with the most votes is the one the group will participate in. As a result, Socialize Now! ensures everybody will have a good time.


## Technical Summary ##

  - How we do our Machine Learning Recommendations?
    - Behind the scenes, we use a proprietary and comprehensive system of 'category tags' to describe event ideas (e.g., 'popular')
    - For each user, we keep track of the tags associated to every event idea they've ever upvoted
    - When a voting period begins, we retrieve the 'upvoted tags' of every user in the group and use a neural network to obtain a set of tags which fits the group's preferences; this set of tags is then converted to a concrete suggestion from a third-party API (such as Yelp)

  - How does data flow around our entire system?
  - Why did we design the User Interface in the manner that we did?
  - How do we get the recommendations?
    - Our machine learning framework's 'tag system' supports recommendations from any third-party API that categorizes their event results; all that our backend requires is a dedicated 'conversion chart' between a subset of that API's tags and our tags
    - Currently, we have a conversion chart for a wide scope of the Yelp API

## Future Plans ##


## Getting Started ##

  Sign up at socializenow.herokuapp.com, invite your friends and start having fun!
