[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/vxWRKI0Z)
Assignment 3 - Persistence: Two-tier Web Application with Database, Express server, and CSS template
===

Due: February 10th, by 11:59 AM.

Baseline Requirements
---

CSS:  
- CSS styling should primarily be provided by your chosen template/framework. 
Oftentimes a great deal of care has been put into designing CSS templates; 
don't override their stylesheets unless you are extremely confident in your graphic design capabilities. 
The idea is to use CSS templates that give you a professional looking design aesthetic without requiring you to be a graphic designer yourself.

Deliverables
---

Do the following to complete this assignment:

1. Accept the A3 assignment which should automatically create a private repository for you.
2. Implement your project with the above requirements. Consider beginning by converting your A2 
   assignment. First, change the server to use express. Then, modify the server to use MongoDB 
   instead of storing data locally. Last but not least, implement user accounts and login using
   Passport Local Strategy. User accounts and login is a difficult part of this assignment, so
   budget your time accordingly. 
3. Ensure that your project has the proper naming scheme as previous assignments except starting
   with "a3-" so we can find it. 
4. Modify the README to the specifications below.
5. Push your final application to your assignment GitHub repository before the deadline at 11:59pm. 
6. Create an empty, temporary, `public` GitHub repository. Push your final application to this
   repository. 
7. Import from this public repository to deploy on Glitch (unless completing the 
   alternative server technical achievement described below). Fill in the appropriate fields in 
   your package.json file. Delete the public repository after the import has been successful. 
8. Test your project to make sure that when someone goes to your main page on Glitch (or an 
   alternative server), it displays correctly.

Achievements
---

Below are suggested technical and design achievements. You can use these to help boost your grade up to an A and customize the 
assignment to your personal interests, for a maximum twenty additional points and a maximum grade of a 100%. 
These are recommended achievements, but feel free to create/implement your own... just make sure you thoroughly describe what you did in your README, 
why it was challenging, and how many points you think the achievement should be worth. 
ALL ACHIEVEMENTS MUST BE DESCRIBED IN YOUR README IN ORDER TO GET CREDIT FOR THEM.

*Technical*
- (10 points) Implement GitHub authentication using either  [Passport GitHub1](https://www.passportjs.org/packages/passport-github)
  or [Passport GitHub2](https://www.passportjs.org/packages/passport-github2). 
  *You must either use GitHub authentication or provide a username/password to access a dummy account*. 
  Course staff cannot be expected, for example, to have a personal Facebook, Google, or Twitter account to use when grading this assignment. 
  Please contact the course staff if you have any questions about this. THIS IS THE HARDEST ACHIEVEMENT OFFERED IN WEBWARE.
  It is highly recommended that you complete the required Passport Local Strategy first and then attempt this!
- (5 points) Instead of Glitch, host your site on a different service like [Vercel](https://vercel.com/) or [Heroku](https://www.heroku.com).
  Make sure to describe this a bit in your README. What was better about using the service you chose as compared to Glitch? 
  What (if anything) was worse? 
- (5 points) Get 100% (not 98%, not 99%, but 100%) in all four lighthouse tests required for this assignment.
- (up to 5 points) List up to five Express middleware packages you used and a short (one sentence) summary of what each 
  one does. THESE MUST BE SEPARATE PACKAGES THAT YOU INSTALL VIA NPM, NOT THE ONES INCLUDED WITH EXPRESS. So express.json
  and express.static don't count here. For a starting point on middleware, see [this list](https://expressjs.com/en/resources/middleware.html).

Sample Readme (delete the above when you're ready to submit, and modify the below so with your links and descriptions)
---

## Your Web Application Title

your glitch (or alternative server) link e.g. http://a3-squishycode.glitch.me

Include a very brief summary of your project here. Images are encouraged, along with concise, high-level text. Be sure to include:

- The goal of the app was to create a journal tracker based on the user.
- The main challenge was getting the passport local strategy to work with adding new entries to each user.
- I chose the local strategy because I had been working with it for a while trying to get it up and running and decided to stick by it until I figured it out.
- I tried using Tailwind.css, but im not certain I used it correctly as I was running out of time when it came to the submission time.

## Technical Achievements
- **Tech Achievement 1**: I implemented the Passport LocalStrategy, Additionally i added middleware such as body-parser, flash, session, and passport to the project.

