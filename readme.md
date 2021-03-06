IN this module, we learn -

What effects are, and how to work with sideEffects.
Managing more complex state with reducers.
Managing app/components - wide state management via context

Main job of React -
- Evaluate and Render the JSX ( UI )
- Manage state and props
- React to User Input 
- Re-render the component upon state and prop changes ( UI )

So, side-effect is everything else that happens in our client-side application.
- Store data in browser storage
- Sending and handling http request to backend server
- Setting and managing timers

Hence, these side tasks must happen outside of normal component evaluation and rendering cycle, especially
since they might Block/delay rendering.

So such side-effects should not be directly present in a component. They must be wrapped in useEffect hooks. 

useEffect make sure that side-effect only runs when dependencies listed in array are changed and not every 
time the component gets re-rendered.


# What to add & Not to add as Dependencies

In the previous lecture, we explored useEffect() dependencies.

You learned, that you should add "everything" you use in the effect function as a dependency - i.e. all state
 variables and functions you use in there.

That is correct, but there are a few exceptions you should be aware of:

You DON'T need to add state updating functions (as we did in the last lecture with setFormIsValid): React 
guarantees that those functions never change, hence you don't need to add them as dependencies (you could 
though)

You also DON'T need to add "built-in" APIs or functions like fetch(), localStorage etc (functions and features 
built-into the browser and hence available globally): These browser APIs / global functions are not related to 
the React component render cycle and they also never change

You also DON'T need to add variables or functions you might've defined OUTSIDE of your components (e.g. if you 
create a new helper function in a separate file): Such functions or variables also are not created inside of a 
component function and hence changing them won't affect your components (components won't be re-evaluated if 
such variables or functions change and vice-versa)

So long story short: You must add all "things" you use in your effect function if those "things" could change 
because your component (or some parent component) re-rendered. That's why variables or state defined in 
component functions, props or functions defined in component functions have to be added as dependencies!

Here's a made-up dummy example to further clarify the above-mentioned scenarios:

import { useEffect, useState } from 'react';
 
let myTimer;
 
const MyComponent = (props) => {
  const [timerIsActive, setTimerIsActive] = useState(false);
 
  const { timerDuration } = props; // using destructuring to pull out specific props values
 
  useEffect(() => {
    if (!timerIsActive) {
      setTimerIsActive(true);
      myTimer = setTimeout(() => {
        setTimerIsActive(false);
      }, timerDuration);
    }
  }, [timerIsActive, timerDuration]);
};
In this example:

timerIsActive is added as a dependency because it's component state that may change when the component changes 
(e.g. because the state was updated)

timerDuration is added as a dependency because it's a prop value of that component - so it may change if a 
parent component changes that value (causing this MyComponent component to re-render as well)

setTimerIsActive is NOT added as a dependency because it's that exception: State updating functions could be 
added but don't have to be added since React guarantees that the functions themselves never change

myTimer is NOT added as a dependency because it's not a component-internal variable (i.e. not some state or a 
prop value) - it's defined outside of the component and changing it (no matter where) wouldn't cause the 
component to be re-evaluated

setTimeout is NOT added as a dependency because it's a built-in API (built-into the browser) - it's 
independent from React and your components, it doesn't change


# useReducer

When you need to handle more complicated state which has multiple ways of changing or got multiple 
dependencies instead of single variables (like we do with useState) then we go for useReducer.

# Context API

When you have to drill props through components which doesn???t even need those props just so that you can
get those props to their children or beyond who in actuality need them. This becomes unmanageable as the
application grows, so to mitigate this unwanted props drilling we have got component-wide, ???behind the
scenes??? State storage, build into React. It is called React-Context. 
We saw how context API can be used to maintain a state, so here we made a distinction between passing
configuration down the component via props and tapping in to the application state via useContext hook.
Hence, not all communication via props (and small props chains) needs to be converted to context API
state, only those which are a part of state and are involved in long props drilling chains.

Note: React Context is not optimized for high frequency changes. So if you want to maintain a state which
is changing too often per second then Context API is not a good option. For this type of changes Redux is
a better option.