## TODO App

### Requirement

0. Prepare for project
```
npm install

npm run prepare
```

1. Create a powerful Todo app with Angular

- Todo list with CRUD functions
  - Use [Reactive Form](https://angular.io/guide/reactive-forms)
- Filter by status: All/Completed/Active
- Counter for each status. All: `3 active items / 10 items`; Completed: `7 completed items / 10 items`, Active: `3 active items / 10 items`.
- Style by yourself, _do not_ use external UI lib like Material, NgZorro...

  - Use SCSS
  - Can follow a design in the internet
  - Have to follow the principle in some example UI design theme. (Ex: <https://element.eleme.io/#/en-US/theme/preview>)

- Add timing for each Items. Notify when it nearly the deadline (before deadline 1h)
- Should have great UI

2. Todo Guideline

- Create Shared components: Input, Datepicker, Icon, Button... Can use Standalone feature
- Create Todo module which contains all of "Todo - necessary components, services, pipes, types..."
- Use Reactive form to handle todo form
- Use Angular Service, Rxjs BehaviorSubject for shared data and api. Call api in chain with flattening operator
- Integrate with BE: create your own BE by using [mockapi](https://mockapi.io/docs))
- Use [Configuring application environments](https://angular.io/guide/build#configure-environment-specific-defaults)
- Unsubscribe when component destroyed.
- Consult [Sample-Structure](https://ops.nccsoft.vn/DefaultCollection/ncc-front-end-training/_git/ncc-angular-training?path=%2F&version=GBsample-structure&_a=contents)
- Do **Self Code Review** and **Have to Follow** [Code review Checklist](http://ops.nccsoft.vn/DefaultCollection/ncc-front-end-training/_wiki/wikis/ncc-front-end-training.wiki/2019/Code-review-Checklist)

### [NCC Angular basic checklist](https://github.com/angular-vietnam/100-days-of-angular)
- [100-days-of-angular](https://github.com/angular-vietnam/100-days-of-angular) - Recommended
- [ncc-angular](https://github.com/nccasia/ncc-angular)

### [How to Write Cleaner Code](https://www.freecodecamp.org/news/best-practices-for-a-clean-and-performant-angular-application-288e7b39eb6f/)
- https://angular.io/guide/styleguide#angular-coding-style-guide
- https://www.freecodecamp.org/news/best-practices-for-a-clean-and-performant-angular-application-288e7b39eb6f/
- https://itnext.io/clean-code-checklist-in-angular-%EF%B8%8F-10d4db877f74
- https://ops.nccsoft.vn/DefaultCollection/ncc-front-end-training/_wiki/wikis/ncc-front-end-training.wiki?wikiVersion=GBwikiMaster&pagePath=%2FAbout%2FCoding%20Convention&pageId=1104&_a=edit

### [Working Process](https://ops.nccsoft.vn/DefaultCollection/ncc-front-end-training/_wiki/wikis/ncc-front-end-training.wiki/448/About)

[View details](https://ops.nccsoft.vn/DefaultCollection/ncc-front-end-training/_wiki/wikis/ncc-front-end-training.wiki/448/About)

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.1.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
