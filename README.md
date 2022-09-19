This project contains two challenges - a "Ticket Breakdown" challenge and a "Refactoring" challenge. The two challenges are unrelated, but you should complete both in the same folder and share the link in Coderbyte. Any written answers should be included in markdown files within this folder.


## [Ticket Breakdown](Ticket_Breakdown.md)
Ticket 1

Title - Store facility provided custom ids for agents.
Implementation details - Add a new model to create a table with three columns to hold facility_id (FK), agent_id(FK), and  agent_custom_id and add a composite index on facility_id and agent_id. Generate and run migration for the new schema. This design enables us to provision for agents working in more than one facility.
Acceptance criteria
There's a new table with three columns facility_id, agent_id and agent_custom_id in the database
The table has the right indexes as specified above in the implementation details.


Ticket 2

Title: Facilities can add custom ids for their agents
Implementation details - Add an endpoint that takes a list of one or more objects containing facility_id, agent_id and agent_custom_id , in request body. Add the data to the table created in Ticket 1(ticket linked) above. Add authorization check to the endpoint such that only facility admins can add these records for the agents in their facilities
Acceptance criteria
Facility admins can make a call to this endpoint to add custom ids for their agents
The endpoint returns with a success code and row added on success
Users that are not facility admins get an unauthorized message when they try to access this endpoint.


Ticket 3

Title - Facilities can add custom ids for their agents
Implementation details - Update the interface where facility admins can view their agents. Add a form for the admins to update the profile of their agents with custom ids. The form should have one input field with label `Custom id` and a save button beside it. On save, the data should be sent to the endpoint in Ticket 2.
Acceptance criteria
There's a form with one input field
The input field is enabled and can be typed into.
The save button is disabled if the input is empty.
The save button is enabled if the input contains text.
On clicking save, the custom id is saved and a toast shows `User profile updated with custom id`.


Ticket 4

Title - Facilities can bulk add custom ids for their agents
Implementation details - Add an input field for csv file upload. Use a library to parse the data into a list of objects and send to the endpoint in ticket 2.
Acceptance criteria
There's a form to upload csv file
On upload, there's a loader that indicates request is in flight and a progress bar
On success, a toast notification shows a success message
Data is stored in the database


Ticket 5

Title - Facilities can use custom ids to generate pdf reports
Implementation details - Update endpoint and the query that fetches the agent metadata for each shift in the pdf report. Join the table created in ticket 1 above, get the custom agent id based on the agent id and facility id. Return the custom id as part of the endpoint's response. Check that it is automatically included in the report. If not, update the code that writes data to the pdf to include it.
Acceptance criteria
The custom id is included in generated PDF reports.
 

## [Refactoring](Refactoring.md)
It is generally easier to read smaller functions than larger ones so I decomposed the original function into three.
The first one is the utilty function that generates hash from a value. Abstracting this made the original function more DRY and encourages reusability.
The second function takes the event and returns the candidate from it.
And the third original function utilizes the other two to perform its task. Easily it can be read as
- Set candidate to default `TRIVIAL_PARTITION_KEY`
- Get candidate from event if event exists
- If candidate's length is greater than `MAX_PARTITION_KEY_LENGTH`, generate hash from candidate as new candidate.
Unless you are interested in the details of how the first two functions perform their tasks, you might not need to check them.
Also it's easier to write unit tests.

If you are a JS novice, here's how to get started:
1. [Install Node.js](https://nodejs.org/en/download/) (we use `^16`, the latest LTS)
2. Run `npm i` in this repo to install dependencies
3. Run `npm test` to run the automated tests
4. Run `npm start` to launch `index.js` for any manual testing
