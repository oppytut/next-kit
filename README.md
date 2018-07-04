# next-kit
A Next.js (React.js SSR) based project kit.

## Installation
##### Clone project
```bash
git clone https://github.com/oppytut/next-kit.git && cd next-kit
```
##### Install packages
```bash
npm install
```
##### Run
For development mode:
```bash
npm run dev
```
For production mode:
```bash
npm run start
```
For build only:
```bash
npm run build
```
##### Access http://localhost:3000 through the browser

## Configuration
The configuration files are in the configs directory.
##### JWT (JSON Web Token)
JWT secret code can be configured.
```javascript
const jwtConfig = {
  secret: 'g0r3ng4nH4ng4t',
};
```

## Demo
A demo can be accessed on <code>https://nex.mazovi.com/</code>.

## Todo
- [x] Configure Git, NPM, and Eslint (airbnb and react)
- [x] Configure Webpack and loader on Next.js
- [x] Add Ant Design
- [x] Add Redux.js
- [x] Add Syted Components
- [ ] Add Redux-Saga.js
- [ ] Add Immutable.js
- [ ] Add Normalizr
- [ ] Add GraphQL Apollo Client
- [ ] Add TypeScript
- [ ] Testing
- [ ] Publish helpers to NPM
