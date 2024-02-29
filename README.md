### Muscle Metrics
-----
<img width="500" alt="image" src="https://github.com/jerrendang/activity_tracker/assets/16262549/eb6110f3-2e0c-4857-bde3-67a28d68a54f">

App for tracking fitness data; specifically gym repititions and sets. Targeting bodybuilders.

### Features
------
- New entries can be added based on muscle group and exercise.
- Users can create new exercises.
- Users can create new muscle groups to log
- Recent activity is graphed based on the past year, month, or week.
- Performance based upon average reps is graphed.

### Implementation
------
- Muscle Metrics was built with a React frontend while using Redux/Redux-thunk for state management.
- Express is used for the backend.
- Graphs are made using chartjs.
- Cookies/JWT are used to maintain the logged in scope for users.
- CORS
- Tailwind used for quick CSS styling. 

### Database
-----
- Built with postgres and sequelize.
- We have Exercises, Muscle Groups, Users, Exercise Records, and User Activity tables comprising the database.
- Each exercise, muscle group, and records has a user association.
-----

Live site at [Muscle Metrics](https://muscle-metrics.onrender.com/)

Future plans of incorporating:
  - more fitness data beyond reps and sets. (ie. Activity duration)
  - more in depth analysis of data
  - ChatBot to provide suggestions to user based upon current exercise level.

-----

**Home Page**

<img width="500" alt="image" src="https://github.com/jerrendang/activity_tracker/assets/16262549/c0b71f64-028e-42b4-97de-cac494270d37">

-----

**New Entry Page**

<img width="500" alt="image" src="https://github.com/jerrendang/activity_tracker/assets/16262549/2638d1c8-063d-4604-bfa9-b290c242eb22">

-----

**All Activity**

<img width="500" alt="image" src="https://github.com/jerrendang/activity_tracker/assets/16262549/9e5546ce-c0b0-4420-8dfb-8d9a5e1ba8c3">

-----
