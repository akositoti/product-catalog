# CvSU Mini Store (Laboratory Exercise 3)

DCIT26: Application Development and Emerging Technologies
A mini product catalog built with reusable React components and props.

## Run it

```bash
npm install
npm run dev
```

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
