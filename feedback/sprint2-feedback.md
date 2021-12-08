# Sprint 2 feedback for middcourses

(X) tagged commit on main for sprint2
(X) set of closed user stories
(-) working deployment on Heroku
( ) travis reports build passing
(-) team members have completed reflection
(X) demo

## Checklist notes

- demo was not done on heroku. Looks like perhaps you have the current version up?
- travis does report success, but travis is currently not running. The build is currently broken

I am missing a reflection from Alderik


## Discussion

### User stories

The user stories are looking okay. They are a little hit or miss on including acceptance criteria. Also, Sam is right on #26 -- you shouldn't have subjective requirements.


### Agility/scrum

I see a steady pattern of commits. I don't see any evidence of scoring or keeping track of velocity. You seem to have made reasonable use of the project board, though you still have a collection of things left in the Working column (including one that is marked as being done).

### Integration

I see a lot of feature branches over the life of the sprint. Unfortunately, many of them are still active. 

### Implementation

We are starting to see some tests. It is a pity that some of them are failing on the main branch... 

Watch out for mixing and matching snake_case and camelCase in the same project. 


I'm seeing some commented out "dead code" in the main branch, which you should try to avoid.

I see that you have started work on the database, but it looks like you have a ways to go yet.


### Functionality

The functionality seems to be coming along. I agree with the story you haven't implemented yet that you need another color for unrated classes. 

There is something about the site that looks a little clunky. I think it might be the gray backgrounds of the cards and the chunk borders. However, there are some more significant styling issues that I suggest are a little bit of a priority

- As the name of the class grows, it pushes down into the ratings. I suggest a smaller font and some technique to limit the length of the name (this is one of the problems with going with a card based UI)
- The spacing of the labels on the bars puts them closer to the bar above than to the bar they are associated with. The same goes for the reviews.
- The detail view isn't so much of a "card flip" as a weird insertion. The details are so much bigger in size, they completely disrupt the flow of the interface. I would suggest either adding a scroller (set the overflow to scroll) so you can keep the card the same size, or putting the details somewhere else.

Are you going to indicate how many reviews a class has had?
