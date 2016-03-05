# Bookspring Readathon

- to install dependencies: `npm install`
- for developement `npm start` and goto [http://localhost:8080](http://localhost:8080)
- for build `npm run build`
- to deploy to [https://danemacaulay.github.io/bookspring-readathon](https://danemacaulay.github.io/bookspring-readathon)

```
git branch -D gh-pages
git checkout -b gh-pages
npm run clean && npm run build
git add dist --force
git commit -m 'build'
git push --force
```