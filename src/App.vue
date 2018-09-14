<template>
  <div id="app">
    <div id="nav">
      <router-link to="/calculator" class="link">Calculator</router-link>
      <router-link to="/comments" class="link">Comments</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style>
body {
  text-align: center;
}
.link {
  text-decoration: none;
  border: 1px solid lightgray;
  border-radius: 2px;
  color: black;
  padding: 10px;
  margin: 0 5px;
}
.link:hover {
  background-color: lightgray;
}
#nav {
  height: 39px;
  margin-bottom: 10px;
}
</style>
