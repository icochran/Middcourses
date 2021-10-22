# Sprint 0 feedback for middcourses



(X) project repository with all team members
(X) package.json updated
(X) `npm test` and `npm run lint` run without errors
(X) travis reports build passing
(X) project deployed to heroku
(X) README.md is updated
(X) one pull request
(X) commit tagged sprint0
(X) backlog populated with epic user stories
(X) lo-fi storyboards created
(X) CRC cards created

## Checklist notes

- I left you a pending pull request that I suggest you merge into main...


## Design notes



You have a good start on the user stories. I like that you are thinking of multiple stakeholders. You are lacking a fair amount of specificity, however, and in doing so, none of the user stories actually tackle the central question of "why do we need a site for course reviews?". I don't see any mention of course planning, or workload balancing. I don't see anything that suggests what might go into these reviews. You talk about color coding, but what data is being encoded? 

Also missing is any acceptance criteria. How will you know when you have done it (I suspect when you start thinking about _that_, the lack of details will be come more apparent).

I also see lurking behind several of the stories is this model that users need to leave reviews before they can see any. This is a model that requires some justification and thought about implementation. How many reviews? Will they be judged for quality? That is a question that I might extend to all reviews -- will there be moderation? I think there is an underlying conceit that the site will be so useful that students will be willing to provide work for it without having access.  

#8 - Implementation details have snuck into this one ("click on a class card"). The motivation and details are also lacking here. What is a "more detailed review summary"? What information would it include? Why do you need it?
#11 - "visual learner" has been fairly well debunked. Almost everyone is going to benefit from color encoding (i.e., _visualization_). It is enough to say that they should be color encoded so differences can be seen at a glance rather than having to read everything. You should motivate why we need the quick glance however -- it isn't an ends to itself. (class cards appear here as well)
#12 - why do you want to look at classes from your favorite professor? curiosity? course planning?
#14 - this is an odd one, because it implicitly implies your model that you need to leave reviews to read any. I would hope that this isn't the only reason to leave reviews. 
#16 - This is another introduction of the "no access without written reviews". I'm also not sure why this isn't automatic, and it implies a very active administrative hand
#17 - why do you want to keep track of when students have left reviews?


Looking at the lo-fi prototype, I can see some features sneaking in without justification from user stories (like requirements fulfilled and the break down of what ratings are).

The CRC cards are an okay start. You will probably want a `Professor` data entity. I am also a little confused about rating versus analytics. From `UserRating`, it appears that rating is a single value. From `Course`, there appear to be several measures. 