# FRONTEND: E LEARNING PLATFORM

## Description: 
Develop a comprehensive e-learning platform that
serves as a marketplace for selling online courses. Our platform
offers a seamless experience for users to browse and purchase
courses, study the course materials, and track their progress. The
administrator has the ability to manage orders and analyze
student performance
### Site:

#### Authentication feature: 
+ User can signup
+ After signup, users are able to login (with username and password have created at website)
+ Using JWT to login
#### Before login:
- Be able to see overview about website with slogan, banner, CTA, courses by categories at website
- View detail for every course (At here user can see throughly about course with name, rating, last updated, thumbnail, course includes, will learns, and layout sections of the course with lessons, videos, minutes,... )
- User can buy course (if paid) and enrolled course if (free). After enrolled will create an order at website and redirect to 1 subsribed page. After buying course go to checkout page with previous courses at cart and continute to checkout.
- User can add to cart (the course). View Cart. And Checkout base on that cart

#### After login:
- Look at your learning courses
- Start learning section tab (to start learning what courses you have ordered)
- Start Watching (learning course) by click continue button. Redirect to player path to watch videos. 
- At Player video, user can watch video, after watch 1 video over 95%, the lesson will done and add to database. At this page, user can track the progress and after complete 100% of course, user will be able to get certification of this course (PDF file)
### Admin: 

#### Before login
[Author page before login](https://master--wetech-e-learning.netlify.app/author-login)

#### After login
[Author page link here after login](https://master--wetech-e-learning.netlify.app/author/dashboard)
- View overall reports at the website (with total sales for 30 days, all users, all courses, all categories), view new singups, revenue, course sales for (7/30/60 days ago)
- Manage categories, courses, users, orders
- With categories can create, edit, delete
- With courses can create a course, after create course can add sections and lessons for this course (in the video youtube format)
- reports about courses sale (orders)
- Other features intend to do (Like report center - track user progress, course insight, certifications, reviews of users)
## Technologies in use:
HTML, CSS, SCSS, React Typescript, Redux, RTK Query, Ant Design

## Find more continue related to this repository:
[backend repository link here](https://github.com/sangtrandev00/backend-course-prj)

## Author:

https://trannhatsang.com