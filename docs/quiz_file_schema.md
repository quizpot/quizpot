# Quiz File Schema Sketch

The quiz file is a file that contains all the information about a quiz. It is a JSON formatted file with the following structure:

## Version

`file.version` a number specifying the version of the quiz file format. This is used to ensure compatibility between different versions of the quiz file format.

## Title

`file.title` a string specifying the title of the quiz.

## Description

`file.description` a string specifying a description of the quiz.

## Thumbnail

`file.thumbnail` a string specifying the base64 encoded thumbnail image of the quiz.

## Background

`file.background` a string specifying the base64 encoded background image of the quiz.

## Language

`file.language` a string specifying the language of the quiz in [ISO 639 format](https://en.wikipedia.org/wiki/List_of_ISO_639_language_codes).

## Questions

`file.questions` an array of question object.

## Question

`file.questions[x]` an object specifying a question in the quiz. 
`question.questionType` an enum specifying the type of the question.
`question.timeLimit` an integer specifying the time limit in seconds for the question.
`question.points` an enum specifying the point mode for the question.

### Question Types

Defines the type of the question.

#### Multiple Choice

`question.questionType` is `multipleChoice`.

`question.choices` is an array of objects specifying the choices for the question.

Each choice object has the following properties:

- `text` is a string specifying the text of the choice.
- `correct` is a boolean specifying whether the choice is correct.

#### True/False

`question.questionType` is `trueFalse`.

`question.choices` is an array of two objects specifying the choices for the question.

Each choice object has the following properties:

- `text` is a string specifying the text of the choice.
- `correct` is a boolean specifying whether the choice is correct.

#### Poll

`question.questionType` is `poll`.

`question.choices` is an array of objects specifying the choices for the question.

Each choice object has the following properties:

- `text` is a string specifying the text of the choice.

#### Slide

`question.questionType` is `slide`.

`question.text` is a string specifying the text of the slide.

`question.image` is a string specifying the base64 encoded image of the slide.  
