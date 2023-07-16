# FirstPersonMustard
FPS browser game where players shoot mustard paintballs at each other.
Inspired by the Three.js [FPS Example](https://threejs.org/examples/games_fps).

## Architecture 

- Physics

  - [Rapier.js](https://github.com/dimforge/rapier.js)

- Server

  - [Geckos.io](https://github.com/geckosio/geckos.io) or [Netcode.io](https://github.com/bennychen/netcode.io-typescript) (probably Geckos for now)
  - Geckos seems more straightforward to use for me, although Netcode has more security features

- State Synchronization

  - [Snowglobe](https://github.com/hastearcade/snowglobe) ☃️ or [@geckosio/snapshot-interpolation](https://github.com/geckosio/snapshot-interpolation) (SI)
  - Although I was initially set on using the SI framework, it seems that Snowglobe will be better for my use-case because it features Display State Interpolation, which allows the physics to run at a different timestep than the displayed Threejs render. Although Snowglobe currently lacks integrated functions for interpolating between quaternions (rotation), I can copy the functions from SI. ([lerp](https://github.com/geckosio/snapshot-interpolation/blob/master/src/lerp.ts) & [slerp](https://github.com/geckosio/snapshot-interpolation/blob/master/src/slerp.ts))

## Core Functionality:

- React-Three-Rapier
- Typescript
- Vite
- PWA

## Planned Extra Features:

- Gamepad Support

- ~~Three-Mesh-BVH for collision on complex geometries (higher poly maps)~~

  - Decided against this for now b/c of potential conflicts with native Rapier collision detection

- Offline Splitscreen Multiplayer

  - Render Two Separate Canvases
  - Solely Handle Physics Locally (remove server-side checking)

- Offline Peer2Peer Local Multiplayer

  - Allow people to host LAN lobbies
  - Possibly add option to host your own local dedicated server for better performance

## TODO:

- Spheres as instanced mesh
- Send all player inputs for each simulation frame between snapshots to maintain [deterministic lockstep](https://gafferongames.com/post/deterministic_lockstep/) between sims
