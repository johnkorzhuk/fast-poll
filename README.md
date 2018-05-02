# Fast Poll
Fun little side projects for creating polls on the fly. The goal was to make a PWA utilizing the JAMStack architectural pattern. You can find the blogpost I wrote on the creating the basics of this application and more info on JAMStack here: [part 1](https://medium.com/@UnicornAgency/jamstack-pwa-lets-build-a-polling-app-with-gatsby-js-firebase-and-styled-components-pt-1-78a03a633092), [part 2](https://medium.com/@UnicornAgency/jamstack-pwa-lets-build-a-polling-app-with-gatsby-js-firebase-and-styled-components-pt-2-9044534ea6bc), part 3 (coming soon).

### A big thank you to [Ted Kulakevich](https://dribbble.com/tedkdesigns) for help with the design.


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
