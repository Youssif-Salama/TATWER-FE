# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```


# Tatwer Elbawady Estate Management System

## Overview

Tatwer Elbawady's Estate Management System is a comprehensive platform designed to streamline the management of estates, tenants, landlords, employees, contracts, payments, taxes, and to-do tasks. This system offers a modern and scalable solution for real estate management in Saudi Arabia, utilizing **React**, **Tailwind CSS**, **TypeScript**, and **Redux Toolkit** for the front end, while maintaining **Node.js**, **Express**, and **MongoDB** for the backend.

## Features

- **Employee Management**: Efficiently manage employee records with CRUD operations.
- **Estate Management**: Handle estate-related details including ownership, tenants, and locations.
- **Tenant and Landlord Management**: Organize and track tenant and landlord information.
- **Contract Management**: Maintain records of rental agreements, including dates, terms, and involved parties.
- **Payments and Taxes**: Automate the tracking of payments, taxes, and financial transactions related to estates.
- **To-Do Task App**: Manage day-to-day tasks and track to-dos for various users and operations.

## Technologies Used

The project incorporates the following technologies:

- **React**: Front-end library for building user interfaces.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **TypeScript**: Superset of JavaScript that adds static types for enhanced development.
- **Redux Toolkit**: State management tool for handling global state.
- **Node.js**: JavaScript runtime for backend development.
- **Express.js**: Web framework for handling server-side logic and routes.
- **MongoDB**: NoSQL database for storing data.
- **Mongoose**: MongoDB object modeling tool for Node.js.
- **JWT**: JSON Web Tokens for authentication and authorization.
- **Bcrypt.js**: Library for hashing passwords securely.
- **Moment.js**: Date manipulation library for managing time-related data.

## Tech

- **React**: ![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black)
- **Tailwind CSS**: ![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-06B6D4?logo=tailwindcss&logoColor=white)
- **TypeScript**: ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)
- **Redux Toolkit**: ![Redux Toolkit](https://img.shields.io/badge/Redux%20Toolkit-764ABC?logo=redux&logoColor=white)
- **Node.js**: ![Node.js](https://img.shields.io/badge/Node.js-339933?logo=nodedotjs&logoColor=white)
- **Express.js**: ![Express.js](https://img.shields.io/badge/Express.js-000000?logo=express&logoColor=white)
- **MongoDB**: ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white)
- **Mongoose**: ![Mongoose](https://img.shields.io/badge/Mongoose-aF2946?logo=mongodb&logoColor=red)
- **JWT**: ![JWT](https://img.shields.io/badge/JWT-black?logo=jsonwebtokens&logoColor=white)
- **Bcrypt.js**: ![Bcrypt](https://img.shields.io/badge/Bcrypt-3384A6?logo=lock&logoColor=white)
