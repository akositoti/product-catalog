# CvSU Mini Store (Laboratory Exercise 3)

DCIT26: Application Development and Emerging Technologies
A mini product catalog built with reusable React components and props.


## Guide Questions

**1. What is the difference between props and state?**
Props are values a parent passes down to a child; they are read-only from the child's point of view. State is data a component owns and manages itself, and it can change over time, which re-renders the component.

**2. Why can a child component not modify the props it receives?**
React uses one-way data flow: data belongs to the component that owns it. If a child could change its props, the parent's data would be altered behind its back and the app would be hard to trace and debug. The child must ask the parent to change it (through a callback).

**3. How does the onAddToCart callback allow data to flow from child to parent even though props only flow downward?**
The parent passes a function down as a prop. The child does not change the parent's data directly; it calls that function and passes the product title as an argument. The function runs inside the parent, so the parent receives the data and updates its own state.

**4. Why is the key prop required when rendering a list with .map()? What could happen if it is missing or duplicated?**
React uses keys to tell which list item is which when the list re-renders. If a key is missing or duplicated, React may show warnings, re-order or update the wrong items, and mix up the state or DOM of different items.

**5. What does the children prop allow you to do that a normal prop does not?**
It lets the parent put any JSX between the component's opening and closing tags (like a `<span>New</span>` badge), and the component decides where to display it. A normal prop passes a single named value; children lets you nest flexible content.


# Laboratory Exercise 4: useState and useEffect (Live Search and Filter)

Branch: `lab4-livesearch`. Adds a controlled `SearchBar`, a 300 ms debounced search, category filter, price sorting, a result count, an empty state, and a tab title that shows the result count.

## Guide Questions

**1. Why do we use two separate states, searchText and debouncedSearch, instead of only one?**
`searchText` must update on every keystroke so the input shows what the user types. `debouncedSearch` only updates after the user pauses for 300 ms, and it is the value used for filtering. With only one state, the list would be re-filtered on every keystroke, or the input would feel laggy.

**2. What would happen if the debounce effect did not return a cleanup function?**
Every keystroke would start a new timer, and the old timers would never be cancelled. All of them would eventually fire, so `debouncedSearch` would be updated many times (with older values) instead of just once after the final pause. This defeats the purpose of debouncing and can cause flickering results.

**3. What is the purpose of the dependency array? What happens if it is empty ([])? What happens if it is left out completely?**
The dependency array tells React when to re-run the effect: only when one of the listed values has changed since the last render. With `[]`, the effect runs only once, after the first render. If the array is left out completely, the effect runs after every render.

**4. Why should we avoid sorting the original products array directly?**
`sort()` changes the array in place. Mutating the original data (which comes from `products.js`) breaks React's rule of not mutating data, can cause bugs because other parts of the app share the same array, and the original "Default" order would be lost. We copy first with the spread operator, then sort the copy.

**5. Is the filtered product list better stored in its own state, or calculated from existing state during rendering? Explain your choice.**
It is better to calculate it during rendering. The filtered list is fully determined by `products`, `debouncedSearch`, `category`, and `sortOrder`. Storing it in its own state would duplicate information and require extra code to keep it in sync, which can lead to out-of-date results. A derived value is always correct.