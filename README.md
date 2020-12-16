# Project-2_Are You The Average Gamer?

Group #5 Project #2
Tuesday December 15th, 2020						                 
Rice University Data Analytics & Visualization Bootcamp







Are You the Average Gamer?






Team Members:
Jennifer Darby
Michael Bien
Sadie Barnett-Boudreau


For this project our team utilized aggregated gamer data from several gamer reporting sites to establish average gaming hours played by gender, age group, and country.  The goal of the project was to create am interavtive experience with the gamer that demonstrated how they ranked with respect to the global gamer community. 
We attempted to use Steam for our data set, to establish a relationship between the number of concurrent online gamers and the COVID-19 shutdown.  While we could correlate increased gaming statistics to COVID by dates impacted, we could not prove causation due to the lack of discreet gaming details. The pricing data was also difficult to use because research demonstrated that some of the top games were free during this time period.  Due to the aforementioned, we were forced to change direction.  
The links for our project are as follows:
•	GitHub Repo: git@github.com:SBBoudreau/Project-2.git
•	Heroku Deployment: “https://turkey-tryptophan-trifecta.herokuapp.com/”
Directions on how to recreate our environment and database are shown below.
1.	Clone the repo to your computer.
2.	Start a session of PostresSQL admin.
3.	Create a database called “Gamers”.
4.	Run the create table script provided in the “postgres_create_table_script.txt” file in the Resources folder.
5.	Run the Jupyter Notebook “import_data.ipynb”, to import the data from the csv files into the tables in the PostgresSQL Gamers database.
6.	Start up the Flask application “Project_2_flask.py”.
7.	Open the site and find out if you’re the average gamer!
The ERD is in both the presentatation “Project 2-Group 5-Are You the Average Gamer.pptx” file and the “QuickDBD-export.pdf”.  They are both located in the Powerpoint folder.  
