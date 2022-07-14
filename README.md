# HASHTAG Social Media Project

![img](https://img.shields.io/github/issues/Zaariy/Hashtag)
![img](https://img.shields.io/github/forks/Zaariy/Hashtag)
![img](https://img.shields.io/github/stars/Zaariy/Hashtag)
![img](https://img.shields.io/github/license/Zaariy/Hashtag)
![img](https://img.shields.io/twitter/url?style=social&url=https%3A%2F%2Ftwitter.com%2FMZaariy)

## overview :

**HASHTAG** is a small project it builds like social media website you can post your images and your story like any other social media website, in **HASHTAG** website is still in development it needs a lot of features to add.

## The Technologies we used :

In this small project we usded for :<br>

- **FrontEnd**<br>

  - HTML<br>
  - CSS<br>
  - Javascript <br>
  - Fontawesome <br>
  - Rest Full Api <br>
  - React Js <br>

- **backEnd**

  - Node Js <br>
  - express Js <br>
  - MongoDb <br>
  - Build Rest Full Api <br>

## Some challenges we faced and some features I hope to add to the project :

I had faced many challenges, especially with the backend in MongoDb some queries didn't work with me and it takes to me a lot of time but I fixed them, and I hope to add some features like Chats and Following Friends each other.

## How to install HASHTAG project :

1 - First, make sure you have Node js installed by running the command `node -v `
<br> Make sure you have like this results : <br>

![results image](/imagesReadme/node.PNG)

If you don't have like these results go to [Node js Download ](https://nodejs.org/en/download/) and install it on your machine.

2 - Seconde, make sure you have MongoDb installed if not go to [Monog Db Download ](https://www.mongodb.com/try/download/community) and install it on your machine.

3 - Now go to your terminal and run this command to download project on your local machine. <br>

`git clone https://github.com/Zaariy/Hashtag.git`

<br> Make sure you have like this results in your Folder : <br>

![results image](/imagesReadme/gitClone.PNG)

4 - Now go to backend folder , path folder is : <mark>/Hashtag/backend</mark> <br>
And start installing dependencies by running this command in your Terminal : `npm install --save`

<br> Make sure you have like this results in your Terminal : <br>

![results image](/imagesReadme/depBackend.PNG)

5 - Now go back to the folder <mark>/Hashtag</mark> and install dependencies React js <br>
by running command ` npm i`

6 - Now let's do some settings on file <mark>/backend/Router.js</mark> <br>
go to the line 15 and put your local url MongoDb to connect with Database , Default value is : `mongodb://localhost:27017/hashtag` and don't forget to add <mark>/hashtag</mark> in last of url .

7 - finally it is last step , go to backend Folder and run command : `npm start ` <br>
And then go back to the Folder Hashtag and run command : `npm start` .

<br> Make sure you have like these results in your Terminal : <br>

![results image](/imagesReadme/resBackend.PNG)
![results image](/imagesReadme/resFrontEnd.PNG)

## Let's take a look at Roadmap Components and their Child's

    Profile
        |__ Postes
        |__ Photos
        |__ about
        |__ Friends

    Mainpage
        |__ Navigation
        |__ Postes
            |__ createPhost
            |__ Likes
                |__ comments
        |__ sidePhotos
        |__ sideFriends
        |__ story
        |__ groups

    Settingsprofile
        |__ Navigation

# Documentation :

## How we can pass data from parents to their children's ?

As you see above every parent component pass data to their children by parameter or "**Props**" call <mark>**ueser_public_data**</mark> if data was public and if it was for just a user it call <mark>**user_spcific_data**</mark> , and when we want to recieve this data , we recieve it by parameter call
<mark>**recieve_public_data**</mark> if data was public and if it was for just a user it call <mark>**recieve_spcific_data**</mark> As you can see in this picuter :
<br>

![logo ](/imagesReadme/user_pass_data.PNG)

## How we can pass Childrens from componentns to another components ?

if we want to pass children component to another component we pass it through parameter or "**Props**" call <mark>**Child_pass_data** </mark> As you see in this picter :

![logo ](/imagesReadme/childPass.PNG)
