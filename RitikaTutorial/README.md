# Day 1:
## Components
Components are a piece of UI that has its own logic and appearence. They can be nested. There are several React component libraries including Material UI and Ant Design. An example of a component is listed below.

```
function MyButton() {
  return (
    <button>I'm a button</button>
  );
}

export default function MyApp() {
  return (
    <div>
      <h1>Welcome to my app</h1>
      <MyButton />
    </div>
  );
}
```
It is convention for React components to be capitalized, while HTML tags are lowercase. 

## Markup
Many React projects use JSX for markup. 

## Style
React uses CSS to style.

## Conditionals
Use the same if/else statement as you would for React. 

## Event Handlers
Used to handle clicks and interactions. 

## Hooks
Hooks are an important part of React. They allow funciton components to have access to React features including state. They usually begin with the word "use."


Sources:
https://react.dev/learn#rendering-lists
https://www.w3schools.com/react/react_hooks.asp