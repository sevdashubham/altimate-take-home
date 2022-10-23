# Altimate Take Home Test

# Getting started

Clone this repository

Backend[port 8000]:

Run `pip install` , all requirements will be installed automatically.

Run `uvicorn main:app --reload`

Frontend[port 3000]:

Run `yarn` , all required dependencies will be installed automatically.

Run `yarn run dev`

# Features
Implemented following features:

- [x] To provide the credentials to connect to a database
- [x] To list all the tables present in the connected database
- [x] On clicking the table, the user should see the associated schema and detailed metrics like count, distinct and mean
- [x] Implemented using SQLAlchemy & Pydantic
- [x] app is responsive
- [x] use functional programming
- [x] app consumes API using axios
- [x] UI components using tailwind
- [x] FastAPI
- [x] Used gender_submission.csv from Kaggle Titanic dataset

To-do features:
- [ ] Have the ability to check connection on each route and navigate user correctly
- [ ] Median and mode in metrics, I didn't want to use raw sql queries
- [ ] Improve the UI implementation of metrics using react-charts
- [ ] Breadcrumb to improve navigation for the user, currently it is a simple header
- [ ] Validation on each input of form to render missing required fields
