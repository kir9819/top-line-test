<template>
  <div id="app">
    <div id="nav">
      <router-link to="/calculator">Calculator</router-link> |
      <router-link to="/comments">Comments</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style>
body {
  text-align: center;
}
</style>
