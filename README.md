# What is Switchmap?

With switchmap, you can **document what is on your switch ports easily**.

Here an explanation of each component that must be created:

First, you have a **rack**, like a server rack, however, which is made up of switches, where each **switch** has several **ports**.

There are also **groups**, which are responsible for displaying the **colors** of the ports, each group has child **departments**, which will display the color of the parent group.

And finally, each switch has a **style**, which will define how it will be displayed on the home page.

Here's a visual example of how it works:

![Hierarch example](/public/images/mockup/example.svg?raw=true "Switchmap hierarch example")

### And there, switchmap previews:
![Homepage](/public/images/mockup/homepage.png?raw=true "Homepage")
![Create page](/public/images/mockup/create.png?raw=true "Create page")
![Port page](/public/images/mockup/port-page.png?raw=true "Port page")

## Getting Started

To start your project, just follow the 6 commands below

``` 
git clone https://github.com/Luanpablo100/switchmap
cd switchmap
npm install
npx prisma migrate dev --name init
npm run build
npm start
```

Now, just access the localhost:3000 address or the remote address of your server http://hostname:3000

Remember to create
Hack -> Group -> Department -> Style -> Switch -> Port

## How to get updates?
To update your project, just go to the swithcmap folder and run a 
``` 
git pull 
``` 
So, all updates from the main branch will be downloaded.
It is important to note that future updates may **change the structure of the database**, so you will need to run 
```
npx prisma migrate
```
To synchronize the structure with your local database. If this change informs you that you will need to **erase all your database data**, we recommend that you **first backup your data** using SQLITE Studio. Here's a video on how to perform this backup:


To add authentication with Azure AD you need to add local variables:
NEXT_PUBLIC_AZURE_AD_CLIENT_ID='your app client id'
NEXT_PUBLIC_AZURE_AD_TENANT_ID='your app tenant id'