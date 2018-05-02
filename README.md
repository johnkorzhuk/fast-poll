# Fast Poll
A fun little side projects for creating polls on the fly. The goal was to make a PWA utilizing the JAMStack architectural pattern. You can find the blogposts I wrote on creating the basics of this application as well as more info on JAMStack here: [part 1](https://medium.com/@UnicornAgency/jamstack-pwa-lets-build-a-polling-app-with-gatsby-js-firebase-and-styled-components-pt-1-78a03a633092), [part 2](https://medium.com/@UnicornAgency/jamstack-pwa-lets-build-a-polling-app-with-gatsby-js-firebase-and-styled-components-pt-2-9044534ea6bc), and part 3 (coming soon).

A lighthouse report for [www.fastpoll.co](https://www.fastpoll.co) can be found [here](https://googlechrome.github.io/lighthouse/viewer/?gist=6a8f62e43cb4aa349aa2033984c7aaa7).

## A few key points I wanted to hit on this project:
- [x]: The application works offline. *With the exception of non-cached dynamic data.
- [x]: Prompts users to save the application to their home screen for devices that support that functionality.
- [x]: Statically generate the shell of the application and dynamically pull in the data.
- [x]: Implement a backend and authentication on a static website.
- [x]: Cache static assets via the [service worker spec](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API) so that time-to-first-paint upon revists is almost instantaneous even on slow and flaky connections.
- [x]: Make use of the [PRPL Pattern](https://www.gatsbyjs.org/docs/prpl-pattern/) (thanks to Gatsby.js) in conjuction with the [App Shell Model](https://developers.google.com/web/fundamentals/architecture/app-shell).
- [x]: Create a blazing fast progressive web application using React.js and several other modern front-end libraries that also performs incredibly well when it comes to SEO.

# Notable tools used:
- [Gatsby.js](https://www.gatsbyjs.org/) - A react.js framework used for statically generating websites.
- [Firebase](https://firebase.google.com/docs/) - A back-end as a service framework. I use firestore and their auth services in this application.
- [Netlify](https://www.netlify.com/) - A global CDN and a continuous deployment solution for static websites.
- [Styled Components](https://www.styled-components.com/) - A react-specific css-in-js solution.
- [Redux](https://redux.js.org/) - Flux inspired client-side state management.
- [Jest](https://facebook.github.io/jest/) - Testing platform.
- [Prettier](https://prettier.io/) - Code formatting. 
- [ESLint](https://eslint.org/) - Javascript linting. I'm using a customized version of [Airbnb's ESLint rules](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb).

# Running the application
Clone the repository and run `npm install`.
- For development, run `npm run dev`. 
- For a production build, run `npm run build`.

You can find the other scripts in the [package.json](./package.json).


### A big thank you to [Ted Kulakevich](https://dribbble.com/tedkdesigns) for help with the design.