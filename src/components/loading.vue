<template>
  <div id="loading">
    <svg class="icon" aria-hidden="true">
      <use :xlink:href="icon" />
    </svg>
    <br />{{msg}}
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: {
    msg: String,
    msgColor: String,
    icon: String,
    iconcolor: String,
  },
  components: {}
};
</script>

<style scoped lang="less">
#loading {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  svg {
    color:#fff;
  }
}
</style>
