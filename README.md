# Open Days
Copyright (c) 2018 Ming-Liang Millen Wan<br />
This software is licensed under the MIT License<br />
For more information view the LICENSE file in this repository.
<br />
# Project Description:
PSU OpenSource Project "Open Days" is a simple activity shopping cart that provides schedule suggestions.<br />
It allows users to plan travel itineraries by selecting images of activities and restaurants for a particular location.<br />
This project was designed in particular for people consumed with wanderlust but do not have the time or motivation to plan a trip. Similar projects can be viewed in the background.txt file in this repository. However, Open Days was designed to be free, convenient, and appealing to aesthetic travelers.<br /> 
# Interface:
Users can access the project from http://web.cecs.pdx.edu/~mwan/open_days/ <br />
After entering and submitting the number of available days and destination, labeled images will automatically fill the "experiences" and "restaurants" sections below. Currently, only information for Portland, Oregon exists in the repository.<br />
By selecting the particular image, the associated restaurant or activity will be added to a "shopping cart." These items will glow green. Reselecting them will remove them from the cart.<br />
After submitting, the shopping cart will be organized into a suggested schedule. Schedules stored in the upper right hand corner can be viewed for reference or comparison.<br />
Failure to enter an available location will be recorded. Alerts will also be given for selecting more activities than allowed by the number of days traveling. Currently restaurants will not appear on the schedule.<br />
To reset the location, images, and schedules and return to the Open Days home page, click either the "home" or "Open Days" button in the navigation bar.<br />

# Checkout:
Create a server or use an existing one.<br />
In the command line, navigate to the server folder. 
Clone the project using "git clone https://github.com/millenwanpsu/open_days.git". <br />
Allow permissions using "chmod 644" for the "Imgs" folder.<br />
Access your server in the browser and open "open_days".<br />

# Contributors:
Ming-Liang Millen Wan<br />
email: mwan@pdx.edu<br />
