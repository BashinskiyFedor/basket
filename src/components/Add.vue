<template>
    <div class="add">
        <button @click="removeItem">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="icon">
                <path fill="currentColor" d="M5 11a1 1 0 1 0 0 2h14a1 1 0 1 0 0-2H5Z"></path>
              </svg>
        </button>
        <span class="items-count">{{count}} шт.</span>
        <button @click="addItem">
          <span>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="icon">
                <path fill="currentColor" d="M12 4a1 1 0 0 0-1 1v6H5a1 1 0 1 0 0 2h6v6a1 1 0 1 0 2 0v-6h6a1 1 0 1 0 0-2h-6V5a1 1 0 0 0-1-1Z"></path>
              </svg>
          </span>
        </button>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['add', 'remove'])

const addItem = function add() {
    emit("add");
}

const removeItem = function remove() {
    emit("remove");
}

defineProps({
  msg: String,
  count: Number
})

</script>

<style scoped>

button {
    height: 30px;
    width: 30px;
    background-color: rgb(66, 88, 86);
    text-align: center;
    padding: 0;
    border-radius: 8px;
}

.icon {
    width: 12px;
    height: 12px;
    color: white;
}

.add {
    display: flex;
    flex-direction: row;
    align-items: center;
}

.items-count {
    padding-left: 5px;
    padding-right: 5px;
}

</style>
