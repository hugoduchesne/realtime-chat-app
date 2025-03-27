# Realtime Chat App

A simple full-stack real-time chat application built with **React**, **TypeScript**, **Express**, and **Socket.IO**. Users can pick a nickname and chat in a shared room.

> ⚠️ This first version does not persist messages or usernames. Persistence will be added in a future version.

## Stack

- **React**
- **Express**
- **Socket.IO**

## Project structure

```
/realtime-chat-app
├── /backend      # Express server with Socket.IO, serves frontend
├── /frontend     # React frontend using Socket.IO client
├── /dist         # Built frontend app (generated from /frontend)
├── package.json  # Root-level scripts to build/run everything
```

## Commands from project root

### Install all dependencies

```bash
npm run install:all
```

### Build frontend + backend & launch backend

```bash
npm start
```

### Dev mode (frontend + backend concurrently)

```bash
npm run dev
```
