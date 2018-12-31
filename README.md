# mobile-flashcards

The Mobile Flashcards project is React Native application that runs on iOS and Andriod platforms.  Upon installing the app a user can
 * View a list of flash card decks
 * Create a new flash card deck
 * Create questions and answers for a flash card deck
 * Delete a flash card deck
 * Take a quiz from a flash card deck
 * View your score from a quiz

 * The application uses Redux and thus has actions, and reducers to manage application state
 * The application also persistes data in the devices local storage database

## Installation

* install all project dependencies with `npm install`
* start the development server with `npm start`
* Open via iOS or Andriod simulator

## Description of the Files

```bash
├── README.md - This file.
├── package.json # npm package manager file. It's unlikely that you'll need to modify this.
├── actions - This is the folder containing the action dispatchers for the decks, and questions of state
		├── decks.js
		├── questions.js
		├── shared.js
	├── components - These are the UI components of the application
		├── AddDeck.js
		├── AddQuestion.js
		├── DeckDetail.js
		├── DeckList.js
		├── QuizQuestion.js
		├── QuizScore.js
		├── SubmitButton.js
		├── TextButton.js
├── middleware
		├── index.js - this applys the thunk middleware
		├── logger.js - logs state to the browser console
	├── reducers -  this folder contains the reducers for the decks, questions slices of state
		├── decks.js 
		├── index.js
		├── questions.js
	├── utils
		├── _DATA.js - has CRUD operations for persisting data to the device local storage db
		├── api.js - the api to access the _DATA.js file
    ├── colors.js - color variables used thoughout Comonent style sheets
		├── helpers.js - generic helper methods

```

