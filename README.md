This project contains two challenges - a "Ticket Breakdown" challenge and a "Refactoring" challenge. The two challenges are unrelated, but you should complete both in the same folder and share the link in Coderbyte. Any written answers should be included in markdown files within this folder.


## [Ticket Breakdown](Ticket_Breakdown.md)

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
