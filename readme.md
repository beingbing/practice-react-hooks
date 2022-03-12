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
