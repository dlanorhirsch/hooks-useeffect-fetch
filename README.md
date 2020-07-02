****# Learning React: Lifecycles, state, hooks and memory leaks. #

<style>
.feedbackMike{
  padding:1em;
  margin:0;
  color:#840;
  float:right;
  width:50%;
  margin-top:0em; /*HackMD default margin-bottom is 1em. */
  font-style:italic;
  font-size:smaller;
  display:noneX; /* remove X to hide. */
}
.feedbackRon{
  padding:1em;
  margin:0;
  color:#b00;
  float:right;
  width:50%;
  margin-top:0em; /*HackMD default margin-bottom is 1em. */
  font-style:italic;
  font-size:smaller;
  display:noneX; /* remove X to hide. */
}
</style>

**Disclaimer:**  I am new to React. I may draw some conclusions below that are incorrect. The post is an effort to document my learning.

This post was initiated in response to learning some React concepts including lifecycle methods, state, hooks, including **useEffect, useState** and **useFetch**, in order to capture open source API data as a learning task.  

<div class="feedbackMike">
I bolded the functions in the doc, let me know what you think. I like bold text so the reader can skim and come back.
</div>
<div class="feedbackRon">I edited your styling and changed the class name, duplicated it with my name and changed the color so I could respond to your note!  I went through the documents and added this BOLD styling throughout. I also went through and re-formatted the longer links.</div>

Initially, I began using **componentDidMount** for fetching the data. Though the function worked and the data was received from the source and displayed in the DOM, the developer tools indicated an error.  Specifically:

        index.js:1 Warning: Can't perform a React state update on an unmounted
        component. This is a no-op, but it indicates a memory leak in your
        application.
        To fix, cancel all subscriptions and asynchronous tasks in the 
        componentWillUnmount method in PracticeData (at userdata.js:61)*
        
While exploring the React docs and numerous blog posts on the subject, I learned about the concept of state, and how the lifecycle methods impact it.
<div class='feedback'>
At first I was going to suggest to use the markdown link format: '[title] (url)' so the links are shorter but when they are relatively short, it's nice to see the entire URL as you have done. But for unruly links, you can use the title of the video or blog post as the title test.
</div> 

Ref: https://reactjs.org/docs/state-and-lifecycle.html At the same time the documentation was referencing hooks. Ref: https://reactjs.org/docs/hooks-intro.html.  A new and better way of handling state, but more about that later. I focused on resolving the error returned when using **componentDidMount** first.  



I quickly learned that the error mentioned above is common in React. To understand it, knowledge of lifecycle methods and promises is necessary. When **componentDidMount**, an asychronous method used to fetch data is used, a promise is created. The **componentDidMount** method can be used to update your component with new state when the promise resolves.

### Promises: ###
The Promise object represents the eventual completion (or failure) of an asynchronous operation, and its resulting value. It allows you to associate handlers with an asynchronous action's eventual success value or failure reason. This lets asynchronous methods (i.e. event handlers that handle events later) return values like synchronous methods (function that executes completely without relying on an event handler to return). Instead of immediately returning the final value, the asynchronous method returns a promise to supply the value at some point in the future.

<div class='feedbackMike'>
Added parenthetical reminders of exactly what is meant by synchronous and asynchronous functions.
</div>

A pending promise can either be fulfilled with a value, or rejected with a reason (error). When either of these options happens, the associated handlers queued up by a promise's **then** method are called. (If the promise has already been fulfilled or rejected when a corresponding handler is attached, the handler will be called, so there is no (race condition ???) between an asynchronous operation completing and its handlers being attached.)A pending promise can either be fulfilled with a value, or rejected with a reason (error). When either of these options happens, the associated handlers queued up by a promise's **then** method are called. (If the promise has already been fulfilled or rejected when a corresponding handler is attached, the handler will be called, so there is no (race condition ???) between an asynchronous operation completing and its handlers being attached.)

[Question: If a handler is not hard coded, is there an implicit handler for fetch request?]
<div class='feedbackMike'>
Behind the scenes, yes, the internals of a fetch request require the fetch authors to use a handler. Fetch's job is to hide low-level event-driven programming and present the asynchronous data to the user via a Promise. Promises provide a language to handle success and failure in the future. I'm not sure what happens to an un
</div>

A Promise is in one of these states:

* #### Pending: #### 
    Pending represents that initial state, neither fulfilled nor rejected.
* #### Fulfilled: ####
    This means that the operation completed successfully.
* #### Rejected: ####
    This means that the operation failed.

The above referenced error generated by React is a result of an unresolved promise, and requires additional code to resolve it. The unresolved promise creates a "memory leak". In React, though the data has been received, there remains an outstanding fetch call until it is specically canceled.

In order to work with React correctly, and avoid memory leaks, this article from freecodecamp is very helpful: [How to work with React the right way to avoid some common pitfalls.](https://www.freecodecamp.org/news/how-to-work-with-react-the-right-way-to-avoid-some-common-pitfalls-fc9eb5e34d9e/)

One method for eliminating this error is using the **abortController** method after the class declaration. (Remember, we are not using Hooks at this point). The method is instantiated as a variable which is assigned to the new **abortController** (constructor) method.  A "signal" is associated with the fetch call within the **componentDidMount** method. Once the data is received there remains an outstanding request and the promise appears to be unresolved.  In order to resolve it, aborting the controller within the **componentDidUnmount** method, is required.  This will generate an error, but the promise is resolved.

## Hooks ##
An alternative method for resolving the above error is to use hooks.

Hooks are functions that let you “hook into” React state and lifecycle features from functional components. Hooks replace **componentDidMount**, **componentDidUpdate**, and **componentWillUnmount**. 



Hooks were introduced at the React Conference in late October 2018. In early February 2019, they finally came in React v16.8.0. and allow for the management of state without class declarations and are called within functional components. For additional information see: https://reactjs.org/docs/hooks-intro.html.


## Effect Hook ##

For this section, the React documentation is very helpful: https://reactjs.org/docs/hooks-overview.html. The **useEffect** hook can be used to fetch data, amongst other things. The operation of fetching data is called a "side effect" (or “effects” for short) because they can affect other components and can’t be done during rendering. (See below for "what is a side effect").

**UseEffect**, adds the ability to perform side effects from a function component. It serves the same purpose as **componentDidMount, componentDidUpdate, and componentWillUnmount** in React classes, but unified into a single API. 

### What is a side effect? ###
A "side effect" is anything that affects something outside the scope of the function being executed. This can be, for example, a network request, which has your code communicating with a third party (and thus making the request), causing logs to be recorded, caches to be saved or updated, all sorts of effects that are outside the function.

There are more subtle side effects, too. Changing the value of a closure-scoped variable is a side effect (See "What is a Closure" below). 

Pushing a new item onto an array that was passed in as an argument is a side effect. Functions that execute without side effects are called "pure" functions: they take in arguments, and they return values. Nothing else happens upon executing the function. This makes it easy to test, simple to reason about, and functions that meet this description have all sorts of useful properties when it comes to optimization or refactoring.

This reddit article discusses side effects:    Reddit: [What Does Side Effects Mean In React?](https://www.reddit.com/r/reactjs/comments/8avfej/what_does_side_effects_mean_in_react/)

There are two common kinds of side effets in React components: those that don't require cleanup, and those that do.

When you call **useEffect**, you’re telling React to run your “effect” function after flushing changes to the DOM. Effects are declared inside the component so they have access to its props and state. By default, React runs the effects after every render — including the first render. Effects may also optionally specify how to “clean up” after them by returning a function. 

Like the error created by componentDidMount without resolving the promise, useEffect similarly needs to resolve the promise. Without it, the fetch call will repeat each time the DOM is re-rendered, the result of updating state.

### What is a Closure? ###

A closure is the combination of a function bundled together (enclosed) with references to its surrounding state (the lexical environment). In other words, a closure gives you access to an outer function’s scope from an inner function. In JavaScript, closures are created every time a function is created, at function creation time.Learn more about closures here via mozilla: [Javascript Closures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures)

**NOTE:** Closures can be difficult to understand and addition reading is recommended.

---
**INVESTIGATIONS**

In order to better understand the material discussed above I created three files (text1.js, test2.js, and test3.js). Each one accomplishes the same end result of returning and displaying data from an open source api. However, while reviewing online blogs, documents and articles, I quickly learned that there are numerous ways to write this code. 

This presented the following challenges:
1. Class based components vs hooks
2. Lifecycle methods vs useEffect
3. Standard js syntax vs. ES6 arrow functions
4. Resolving promises (in both class based and funcational components), and associated memory leaks.
5. Code destructuring
6. Error checking (NOT DONE)
7. Async/await

In test1 and test2, an empty array is added to the end of the useEffect call. My understanding is that this stops the rerendering and thus prevents a loop-like problem creating a memory leak. Not sure if that is totally correct. 

In test1, I was able to determine that there was a scoping issue. I was guided by an example that I found, just to find out that it was incorrect and causing an error. I did more research and refactored the code, there is a link to the issue noted in the code for you to review.

Test2, I am still working on...

Test3 in now working!

---
**Additional reading:**  Other modern/advanced React features/topics 
 
 * Official React Context API - (vs. Redux)https://reactjs.org/docs/context.html  
 * Error Boundaries - https://reactjs.org/docs/error-boundaries.html
 * Render props - https://reactjs.org/docs/render-props.html
 * Higher Order Components - https://reactjs.org/docs/higher-order-components.html
 * React Router - https://reacttraining.com/react-router/core/guides/philosophy
 * React Hooks - https://reactjs.org/docs/hooks-intro.html
 * React lazy, memo, and Suspense - https://reactjs.org/blog/2018/10/23/react-v-16-6.html
 * LifeCylce Methods - https://engineering.musefind.com/react-lifecycle-methods-how-and-when-to-use-them-2111a1b692b1
 * Derived State -  https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html


Below is a list of To Do's so you are aware......


---

### TO DOs: ### 

Update Readme in react-examples


Finalize edits to this file.

Spend time fixing hooks-usereffect-fetch and add small amount of text about cases in the HTML of the app.



 