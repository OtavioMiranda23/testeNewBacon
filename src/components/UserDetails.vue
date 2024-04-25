<template>
<div class="details">
    <div>
      <slot name="imgCard"></slot>
    </div>
    <div class="card-content-text">
      <slot name="idCard"></slot>
      <slot name="nameCard"></slot>
      <slot name="mailCard"></slot>
      <slot name="roleCard"></slot>
      <slot name="nameEdit"></slot>
      <slot name="role"></slot>
      <slot name="url"></slot>
      <slot name="text"></slot>
    </div>
  </div>
</template>