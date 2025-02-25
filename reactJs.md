# Advance reactJs

## 1 Context API

### 1.1 What is context api ? how it work and how to implement ?
 - React's context API allows you to share data across the component tree without having to pass props down manually at every level.
 - context provides a way to pass data through the component tree without having to pass props down manually at every level
 - this can be useful for providing global data or theme information to many components in an application


   # Redux vs Content API

## Overview
Redux and Content API serve different purposes in web applications. While Redux is a state management library for frontend applications, Content APIs provide structured content from a backend source.

## Comparison Table

| Feature          | Redux | Content API |
|-----------------|--------|------------|
| **Purpose** | Manages global state in frontend applications | Provides structured content from a backend (e.g., headless CMS, database) |
| **Type** | State management library | API for fetching and delivering content |
| **Data Storage** | Stores client-side state in a predictable way | Stores and retrieves content from a database or CMS |
| **Usage** | Used to manage UI state (e.g., authentication, UI toggles, user data) | Used to fetch dynamic content (e.g., articles, products, blog posts) |
| **Data Flow** | Uses actions, reducers, and a central store to update UI state | Uses RESTful or GraphQL endpoints to retrieve and send data |
| **Persistence** | State resets on page refresh unless persisted (e.g., localStorage) | Data is persistent and stored in a database |
| **Example Use Case** | Managing authentication state, theme settings, or UI interactions | Fetching blog posts, products, or news articles from a CMS |

## When to Use

- **Use Redux** if you need a predictable state management solution in an application where multiple components share data.
- **Use a Content API** if your app needs to fetch structured content from a backend service (e.g., a headless CMS like Contentful, Strapi, or Sanity).

- All react hooks
- useState,
- useEffect,
- useContext,
- useRef,
- useReducer,
- useCallback,
- useMemo,
- custom hooks
