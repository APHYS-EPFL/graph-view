GraphView
--

Simple web application to visualize weather data stored in a CSV-like format.

Installation and Development
--

1. Install [Node.js](https://nodejs.org/).
2. Run `npm install`.
3. Run `npm start`.
4. Browse to [http://localhost:8080/](http://localhost:8080/).


Deployment
--

1. Follow steps 1 and 2 above.
2. Switch to the `release` branch, update version in `package.json` and commit.
3. Create a `git tag` for the new version.
4. Run `git push && git push --tags` to push the new version and tag.
5. Run `npm pack`; This will create a file `graph-view-{version}.tgz`
6. Extract `graph-view-{version}.tgz` on the server.


Technologies and Libraries in this project
--

Name and short description of each product.

- Node.js/npm
  - Package manager; Fetch all other dependencies.
- AngularJS
  - Web application framework; Organize code into modules and update views.
- gulp.js
  - Build tool; Concatenate all .js modules into a single bundle.js file.
- ng-annotate
  - Add AngularJS dependency injection annotations.
- Bootstrap
    - Front-end web framework; Page layout and interactive elements.  
- D3.js
  - SVG plotting library; Draw time series of simulation data.
- srihash.org
  - Subresource Integrity; Ensure that resources hosted on third-party servers
    have not been tampered with.


Folder structure
--

- `./`
  - `index.html` and favicons
- `./app`
  - AngularJS modules
- `./css`
  - Custom CSS styles
- `./dist`
  - `gulp.js` build output
- `./img`
  - images
