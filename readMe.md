# This is the PROJECT PLANNER #

A GA UNIT 2 PROJECT using Mongoose,MongoDB,Express and EJS

# Idea #
The Idea is that every project consists of tasks, and each task can be broken down into more tasks,

Projects and tasks are picked up by other users, and any one task can only be complete when it's children tasks are also complete


# Models #
The Project is based on 3 Models::
        User:: With a unique USER ID
        Project:: Also with a unique id, and a reference id to it's project leader
        Task:: Also with a unique id, and unique reference to it's task leader as well as task parent

# AAU #
For the MVP of this project, AS A USER I SHOULD BE ABLE TO::

       * Sign up a project
       * Sign up a task
       * complete a task
       * delete a project
       * delete a task
       * update the project leader
       * update the task leader

# Trello #
https://trello.com/b/NSyXvOAb/programs

# Screen Shots #

# Logged In Page #
![Image 1 did not show](https://imgur.com/yXRidhK.png)
# Project Page #
![Image 2 did not show](https://imgur.com/MGPY4jC.png)
# All tasks #
![Image 2 did not show](https://imgur.com/Mm3eNZp.png)



# Heroku Link#
https://fierce-ridge-01460.herokuapp.com/




# Ice Box Goals #
       * Recursive Check Completed Tasks
       * Project Completion prompt post Task recursive check
       * Assist on a project
       * Assist on a task
       * Free Worker QUE
       * Help Needed Radio
       * Task/Project Discussion Board
       * Task Assignment
  