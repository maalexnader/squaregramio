# What is Squaregram.io?
I've recently embarked on a journey as a full-stack JavaScript developer, choosing a straightforward stack: Node.js with Express.js on the backend, and React plus Web components on the frontend. Squaregram.io is my inaugural project that I'm eager to share with you.

## What is the mission of Squaregram.io?
Do you recall the era when every photo posted on Instagram had to be square? If you're nostalgic for those days, then Squaregram.io is designed just for you. Ultimately, our aim is to enable you to upload your entire photo collection to our platform and instantly receive their square versions, which you can then download in a ZIP file.

## How do we tackle this mission?
First and foremost, we prioritize your privacy. This means we won't store any of your photos on our servers. Instead, we allow you to select the cloud service you prefer.

Our initial offering includes support for Azure Blob Storage. We plan to extend support to additional services in the near future. When you upload a photo to Squaregram.io, we crop it to a square and store the resulting image directly in your specified Azure Blob container using a temporary connection string you provide. This connection string enables you to access your photos at any time.

## How to use Squaregram.io
Our service is accessible at https://squaregram-io.azurewebsites.net. To get started, simply create a name for your first project, enter it along with a connection string, and then click "Open project". Once you upload your first photo and the image list refreshes, you'll be able to download its squared version. Yes, it's truly that straightforward and user-friendly! 😃

## Our stack
Here's a list of main technologies we use in Squaregram.io:
- **Jimp**. Jimp is an image processing library for Node.js, offering a range of functions to manipulate JPEG, PNG, BMP, TIFF, and GIF files. It's fully written in JavaScript, requiring no native dependencies, which makes it easy to install and use across different environments. For more detailed information, you can explore the [Jimp GitHub repository](https://github.com/jimp-dev/jimp).
- **Express.js**. Express.js is a lightweight, flexible Node.js web application framework that provides a robust set of features for web and mobile applications. It's known for its ease of use in building single-page, multi-page, and hybrid web applications, as well as its ability to streamline the development process with middleware support and a rich routing API. For more detailed information, you can explore the [Jimp GitHub repository](https://github.com/expressjs/express).
- **React**. React is a declarative, efficient, and flexible JavaScript library for building user interfaces. It enables developers to create large web applications that can change data without reloading the page, emphasizing reusable components. React is maintained by Facebook and a community of individual developers and companies. For more detailed information, you can explore the [Jimp GitHub repository](https://github.com/facebook/react).

## Roadmap
1. Moving crop capabilities to a standalone service involves creating a dedicated system or API specifically for image cropping.
2. Organize the images in the image list, sort them by the 'Date Added'. This ensures that your photos are displayed in chronological order, making it easier to navigate through your recent uploads.
3. Design a UI for desktops
4. Add AWS clooud provider
5. Agg Google docs provider