This is the PROJECT PLANNER,

A GA UNIT 2 PROJECT using the mongoose,mongo,express and EJS


The Idea is that every project consists of tasks, and each task can be broken down into more tasks,

Projects and tasks are picked up by other users, and any one task can only be complete when it's children tasks are also complete


The Project is based on 3 Models::
        User:: With a unique USER ID
        Project:: Also with a unique id, and a reference id to it's project leader
        Task:: Also with a unique id, lives inside of projects and can be assigned leaders

For the MVP of this project, AS A USER I SHOULD BE ABLE TO::
        Sign up a project
        Sign up a task
        Assist on a project
        Assist on a task
        complete a task
        complete a project
        delete a project
        delete a task


Ice Box Goals::
        Free Worker QUE
        Help Needed Radio
        Task/Project Discussion Board
        Task Assignment