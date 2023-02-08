# For research biologist- 
data entry and analysis app. Keep track of sample found and pin the location of sample found. Api that has plants and animals name, description and, scientific name. 



1. What tech stack will you use for your final project? We recommend that you use React and Node for this project, however if you are extremely interested in becoming a Python developer you are welcome to use Python/Flask for this project. 
>React.js for frontend Python/flask for the backend. How to connect React and Python reference https://dev.to/nagatodev/how-to-connect-flask-to-reactjs-1k8i. SQl for data base.
- Possible UI to use 
> - [Tailwindui](https://tailwindui.com/)
> - [Reactstrap](https://reactstrap.github.io/?path=/story/home-installation--page)
> - [Chakra-ui](https://chakra-ui.com/)
> - [Material-UI](https://mui.com/)
    
2. Is the front-end UI or the back-end going to be the focus of your project? Or are you going to make an evenly focused full-stack application? 

>The goal is an even balance of frontend and backend. It would have a map(interactve) and sample entering page. 

3. Will this be a website? A mobile app? Something else?

>Best way to use it is as a tablet(mostly) or phone app. Researchers would not carry laptop to sample sites.

4. What goal will your project be designed to achieve? 
>The goal is to  create an app that makes logging in samples easier and convenient. 

5. What kind of users will visit your app? In other words, what is the demographic of your users? 
>Researcher,scientist, government or non-profite organization (Nation's natural resources). 

6. What data do you plan on using? How are you planning on collecting your data? You may have not picked your actual API yet, which is fine, just outline what kind of data you would like it to contain. You are welcome to create your own API and populate it with data. If you are using a Python/Flask stack are required to create your own API. 
>I plan on using an api with plants and animals name and description available. 
>**Api-**
>https://explorer.natureserve.org/api-docs/#_species_search 
>set it up like an inventory. https://github.com/quitrk/LearningJS/blob/master/Classes/00.%20Product%20Inventary%20Project.js 

7. In brief, outline your approach to creating your project (knowing that you may not know everything in advance and that these details might change later). Answer questions like the ones below, but feel free to add more information: 
- What does your database schema look like? 

**Tree Species in Metro Atlanta Area**
| Sample ID | Type | Common name  | Scientific name | Location  | Image(optional) | Note | TimeStamp |
| ----------- | ----------- | ----------- | ----------- | ----------- | ----------- | ----------- | ----------- |
| 1 | plant | oak tree | Quercus |around the corner(pinned location) | pic.png | est 20 ft tall | 01:10 pm 01/04/2023 |


- What kinds of issues might you run into with your API? This is especially important if you are creating your own API, web scraping produces notoriously messy data. 
>Creating an interactive map sounds like trouble. When the app is opened for the first time, it asks for locations access. The map has to be easy to use, with options to zoom in/out, pan, and add/remove pins. How to do that seems hard. Take a picture of sample(how to access camera). Error handling and validation for user inputs
- Is there any sensitive information you need to secure? 
>Sensitive information would be user's login information. Encrypted sensitive information with authentication and authorization
- What functionality will your app include? 
    - [ ] Login 
    - [ ] search sample scientific name based on common name
    - [ ] Access location
    - [ ] Access camera
    - [ ] pin location
    - [ ] filter results found, example( samples found on certain date, show only plants, show a specific species)
- What will the user flow look like? 
    - Welcome page with informatin about the app and it's goal. The same page will contain a signup or login option.
    - After loging in, there should be an add project folder option or a folder with an already existing project. 
    - When clicking on existing folder, the user in directed to page with the projects name on top and a table just like the one displayed prior. There Will be a button to added or delete a row.
    - If new project, then add new row 
    - While in the project page, users have the option to delete folder.
    - There is an option to edit profile. 


- What features make your site more than a CRUD app? What are your stretch goals? 
    - [ ] accessing camera to take picture of samples is a stretch goal
    - [ ] when clicking on the im, it would have a component that displays the image better
    - [ ] Graph data and be able to see trend. Data analysis

