# Sprint 1 feedback for middcourses

(X) tagged commit on main for sprint1
(X) set of closed user stories
(X) working deployment on Heroku
(X) travis reports build passing
(-) team members have completed reflection
(X) demo

## Checklist notes

I have reflections from 
Agastya
sam M
Alderik
Joe
Kaela

## Discussion

### User stories

You want to avoid including UI decisions in the user stories. You have several that directly discuss cards and grids. 

For example: "As a student I want to see a grid of all the class cards on the main page so I can see all the classes available to me". This implies both a grid and cards. Those are choices you made, but someone coming to the website cold will not have that in their head. This has two issues. First, it means that you lock yourself into design decisions. Second, it led you to put the feature as the justification (see all classes available to me), which meant you never wrote the justification part. "As a student, I would like to see all of the classes available to me because...?"

So here is the question: is there justification for this? How would it scale with all of the courses in place? Would it make more sense to provide department level filtering first like the course catalog?


I would also like to see some acceptance criteria included with your user stories so you know when they are done. 

### Agility/scrum

I see reasonably consistent work being done. I don't however, see any indication of scoring for the user stories. I also note that your sprint backlog still has a number of things in it...

### Integration

I am seeing some pretty good PR use with multiple comments before PRs are merged.

I do see a lot of branches. Make sure that you delete branches when they are accepted and merged. The goal is short lived feature branches. If you keep working on a branch once it is merged, you are increasing the likelihood of creating merge issues down the road. 

### Implementation

I note that there are still _zero_ tests. We should be practicing TDD here.

- pick a user study from the backlog
- write some tests based on the acceptance criteria
- write code to make the tests pass

For the `Filter` component, it would be much better for it to take in an array of departments (which in turn comes from the database). You really don't want things like this hard coded in. 
 
From a visualization perspective, you really don't want to calculate your colors by scaling the red and green channels. First, it creates some ugly colors. Second it is going to be problematic for anyone who is red/green color blind.  My advice would be to use a fixed color scale with discrete steps and either a single color ramp, or different diverging colors. (example: https://colorbrewer2.org/#type=sequential&scheme=YlGn&n=6 or https://colorbrewer2.org/#type=diverging&scheme=RdBu&n=6). 


You may want to include professor name into the search, and also support hitting enter to fire the search off.

### Functionality
This looks like a reasonable start on the functionality. The look feels a little rough. Some of that may be caused by the gray cards and the rudimentary feel. As I said above, the scalability worries me a bit.

The Filter menu is a little unfortunate. We really don't want menus to push the content around. I wonder if a side panel with the filters laid out would be a better design. 